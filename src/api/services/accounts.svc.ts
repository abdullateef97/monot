import { config } from '../../config/settings'
import { Accounts, IAccounts } from '../models'
import { accounts, CreateAccountInput, CreateAccountOutput } from '../interfaces/accounts.int'
import { getCustomerDetails } from './customer.svc';
import { GetCustomerDetailsInput } from '../interfaces/customer.int';
import { generateAccountNumber } from '../lib/utils';
import { constants } from '../lib/constants';
import { MoveFundsInput } from '../interfaces/transfer.int';
import { moveFunds } from './transfer.svc';

export const createAccount = async (input: CreateAccountInput): Promise<IAccounts> => {
  // check if phoneNumber is provided, if not. get customer details with customerId
  // generate accountId
  // save customer details
  try {
    if (!input.phoneNumber) {
      const getCustomerDetailsInput: GetCustomerDetailsInput = {
        customerId: input.accountOwner,
      }
      const customer = await getCustomerDetails(getCustomerDetailsInput);
      input.phoneNumber = customer.phoneNumber;
    }
    const accountNumber = generateAccountNumber(input.phoneNumber, constants.CURRENCY.NGN);
    const accountInput: accounts = {
      accountNumber,
      accountOwner: input.accountOwner,
      phoneNumber: input.phoneNumber
    }
    const response = await new Accounts(accountInput).save();
    let createdAccount = response.toJSON()
    if (input.initialDeposit) {
      // move initial deposit to this account
      if (!input.sourceAccount) {
        throw new Error('Please Specify an existing account to fund this new account from');
      }
      const depositObject: MoveFundsInput = {
        sourceAccountNumber: input.sourceAccount,
        destAccountNumber: createdAccount.accountNumber,
        amount: input.initialDeposit,
        narration: `Fund Account ${createdAccount.accountNumber}`,
        customerId: createdAccount.accountOwner,
      }
      await moveFunds(depositObject);
      createdAccount = await getAccountDetails(createdAccount.accountNumber)
    }
    return createdAccount;
  } catch (error) {
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue)
      throw new Error(`${key[0]} is already in use`)
    }
    throw error;
  }
}

export const getAccountDetails = async (accountNumber: string): Promise<IAccounts> => {
  // check if phoneNumber is provided, if not. get customer details with customerId
  // generate accountId
  // save customer details
  try {
    const account = await Accounts.findOne({ accountNumber })
    if (!account) {
      throw new Error('Invalid Account Number')
    }
    return account.toJSON();
  } catch (error) {
    throw error;
  }
}

export const getAllCustomerAccounts = async (accountOwner: string): Promise<IAccounts[]> => {
  // check if phoneNumber is provided, if not. get customer details with customerId
  // generate accountId
  // save customer details
  try {
    const customerAccounts = await Accounts.find({ accountOwner })
    if (!customerAccounts) {
      throw new Error('Invalid Account Number')
    }
    return customerAccounts;
  } catch (error) {
    throw error;
  }
}


