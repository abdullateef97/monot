import { ICustomer } from '../models';

interface CreateCustomerInput {
  username: string
  password: string
  transactionPin: string
  customerId: string
  phoneNumber: string
  firstName: string
  lastName: string
}

interface CreateCustomerOutput {
  customer: ICustomer
  access_token: string
}

interface Customer {
  username: string
  password: string
  transactionPin: string
  customerId: string
  phoneNumber: string
  firstName: string
  lastName: string
  fullName: string
}

interface LoginCustomerInput {
  username: string
  password: string
}

interface ValidateTransactionPinInput {
  customerId: string
  transactionPin: string
}

interface GetCustomerDetailsInput {
  customerId?: string
  username?: string
}

export {
  CreateCustomerInput,
  CreateCustomerOutput,
  Customer,
  LoginCustomerInput,
  ValidateTransactionPinInput,
  GetCustomerDetailsInput,
}