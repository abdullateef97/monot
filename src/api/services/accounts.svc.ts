import { map, pick } from 'lodash/fp'

import { config } from '../../config/settings'
import { Accounts, IAccounts, Customers } from '../models'
import { accounts, CreateAccountInput, CreateAccountOutput } from '../interfaces/accounts.int'
import { getCustomerDetails } from './customer.svc';
import { GetCustomerDetailsInput } from '../interfaces/customer.int';
import { generateAccountNumber } from '../lib/utils';
import { constants } from '../lib/constants';

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
    const createdAccount = await new Accounts(accountInput).save();
    if (input.initialDeposit) {
      // move initial deposit to this account
    }
    return createdAccount.toJSON();
  } catch (error) {
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


