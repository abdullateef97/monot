import mongoose from 'mongoose';
import { logger } from '../../config/winston';
import { v4 as uuid } from 'uuid'
import { MoveFundsInput, MoveFundsOutput } from '../interfaces/transfer.int';
import { constants } from '../lib/constants';
import { convertToKobos } from '../lib/utils';
import { Accounts, ITransfers, Transfers } from "../models";
import { getAccountDetails } from "./accounts.svc";
import { validateTransactionPin } from "./customer.svc";


export const moveFunds = async (input: MoveFundsInput): Promise<MoveFundsOutput> => {
  // get account for source and dest
  // validate that sourcePin is valid if both wallets are not owned by the same person
  // update the balance of both wallets
  // create credit and debit transactions
  try {
    const {
      sourceAccountNumber,
      destAccountNumber,
      sourcePin,
      amount,
      narration,
      customerId,
    } = input
    const sourceAccount = await getAccountDetails(sourceAccountNumber);
    const destAccount = await getAccountDetails(destAccountNumber);

    const amountInKobo = convertToKobos(amount);
    const amountInKoboToDebit = -1 * amountInKobo;

    if (!sourceAccount) {
      throw new Error('Source Account Number is Invalid');
    }

    if (!destAccount) {
      throw new Error('Destination Account Number is Invalid');
    }

    logger.info('Fetched Both Source and Dest Accounts')
    if (sourceAccount.accountOwner !== customerId) {
      throw new Error('Customer is not the owner of wallet')
    }

    if (sourceAccount.accountOwner !== destAccount.accountOwner) {
      logger.info('Source and Dest accounts belong to different customers')
      if (!sourcePin) {
        throw new Error('Please Provide your transaction Pin')
      }
      // validate pin
      const isPinValid = await validateTransactionPin({
        customerId: sourceAccount.accountOwner,
        transactionPin: sourcePin,
      });
      if (!isPinValid) {
        throw new Error('Invalid Transaction Pin');
      }
      logger.info('pin is valid')
    }

    if (sourceAccount.currentBalance < amountInKobo) {
      throw new Error('Source Wallet has insufficient balance');
    }
    logger.info('starting transaction session')
    const session = await mongoose.startSession();
    session.startTransaction();
    let response: MoveFundsOutput;
    try {

      const opts = { session, new: true };

      // subtract from source wallet
      const updatedSourceAccount = await Accounts.findOneAndUpdate({ accountNumber: sourceAccount.accountNumber}, {$inc: { currentBalance: amountInKoboToDebit}}, opts)
      const updatedDestAccount = await Accounts.findOneAndUpdate({ accountNumber: destAccount.accountNumber}, {$inc: { currentBalance: amountInKobo}}, opts)
      logger.info('updated source and dest balances')
      const txnRef = `MONO_${uuid()}`.toUpperCase();
      if (!updatedDestAccount || !updatedSourceAccount) {
        await session.abortTransaction();
        session.endSession()
        throw new Error ('Error Updating Balance')
      }
      // create a debit and credit transaction
      const debitTransactionObject: ITransfers = {
        amount: amountInKobo,
        direction: constants.DIRECTION.DEBIT,
        accountNumber: sourceAccount.accountNumber,
        accountOwner: sourceAccount.accountOwner,
        currency: sourceAccount.currency,
        balanceBefore: sourceAccount.currentBalance,
        balanceAfter: updatedSourceAccount.currentBalance,
        reference: `${txnRef}_debit`,
        narration,
      };


      const creditTransactionObject: ITransfers = {
        amount: amountInKobo,
        direction: constants.DIRECTION.CREDIT,
        accountNumber: destAccount.accountNumber,
        accountOwner: destAccount.accountOwner,
        currency: destAccount.currency,
        balanceBefore: destAccount.currentBalance,
        balanceAfter: updatedDestAccount.currentBalance,
        reference: `${txnRef}_credit`,
        narration,
      };

      const debitTransaction = await Transfers.create([debitTransactionObject], opts);
      const creditTransaction = await Transfers.create([creditTransactionObject], opts);
      //ts-ignore
      response = {
        credit: creditTransaction,
        debit: debitTransaction,
      };
      await session.commitTransaction();
      session.endSession()
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
    return response;
  } catch (error) {
    throw error;
  }
}

export const getTransferHistory = async (accountNumber: string): Promise<ITransfers[]> => {
  try {
    const transfers = await Transfers.find({ accountNumber });
    return transfers;
  } catch (error) {
    throw error;
  }
}