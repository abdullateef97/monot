import mongoose from 'mongoose';
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      sourceAccountNumber,
      destAccountNumber,
      sourcePin,
      amount,
      narration
    } = input
    const sourceAccount = await getAccountDetails(sourceAccountNumber);
    const destAccount = await getAccountDetails(destAccountNumber);

    if (!sourceAccount) {
      throw new Error('Source Account Number is Invalid');
    }

    if (!destAccount) {
      throw new Error('Destination Account Number is Invalid');
    }

    if (sourceAccount.accountOwner !== destAccount.accountOwner) {
      if (!sourcePin) {
        throw new Error('Please Provide your transaction Pin')
      }
      // validate pin
      const isPinValid = await validateTransactionPin({
        customerId: sourceAccount.accountNumber,
        transactionPin: sourcePin,
      });
      if (!isPinValid) {
        throw new Error('Invalid Transaction Pin');
      }
    }

    const amountInKobo = convertToKobos(amount);
    const amountInKoboToDebit = -1 * amountInKobo;
    const opts = { session, new: true };

    // subtract from source wallet
    const updatedSourceAccount = await Accounts.findOneAndUpdate({ accountNumber: sourceAccount.accountNumber}, {$inc: { currentBalance: amountInKoboToDebit}}, opts)
    const updatedDestAccount = await Accounts.findOneAndUpdate({ accountNumber: destAccount.accountNumber}, {$inc: { currentBalance: amountInKobo}}, opts)
    const txnRef = `MONO_${uuid()}`.toUpperCase();
    if (!updatedDestAccount || !updatedSourceAccount) {
      await session.abortTransaction();
      session.endSession()
      throw new Error ('Error Updating Balance')
    }
    // create a debit and credit transaction
    const debitTransactionObject = {
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

    const creditTransactionObject = {
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

    const debitTransaction = await Transfers.create(debitTransactionObject, opts);
    const creditTransaction = await Transfers.create(creditTransactionObject, opts);

    const response: MoveFundsOutput = {
      credit: creditTransaction,
      debit: debitTransaction,
    };
    await session.commitTransaction();
    session.endSession()
    return response;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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