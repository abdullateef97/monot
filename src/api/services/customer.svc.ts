import { CreateCustomerInput, CreateCustomerOutput, Customer, GetCustomerDetailsInput, LoginCustomerInput, ValidateTransactionPinInput } from '../interfaces/customer.int';
import { bcryptCompareCredential, bcryptHashCredential, encodeToken, sanitizePhoneNumberToIntlFormat, trimPhoneNumber } from '../lib/utils';
import { logger } from '../../config/winston'
import { Customers, ICustomer } from '../models';
import { createAccount } from './accounts.svc';
import { CreateAccountInput } from '../interfaces/accounts.int';


// creates a customer
export const createCustomer = async (input: CreateCustomerInput): Promise<CreateCustomerOutput> => {
  // hashPassword and pin
  // generate customerId
  // create account with default balance of 0
  // save customer
  // generate access_token
  // send response
  try {
    const hashedPassword = await bcryptHashCredential(input.password);
    const hashedPin = await bcryptHashCredential(input.transactionPin);
    const customerPhoneNumber = sanitizePhoneNumberToIntlFormat(input.phoneNumber);
    const customerId = trimPhoneNumber(customerPhoneNumber, '+234');

    const customer: Customer = {
      ...input,
      password: hashedPassword,
      transactionPin: hashedPin,
      phoneNumber: customerPhoneNumber,
      fullName: `${input.firstName} ${input.lastName}`,
      customerId,
    }

    const response = await new Customers(customer).save();

     // create account
     const createAccountInput: CreateAccountInput = {
      accountOwner: response.customerId,
      phoneNumber: response.phoneNumber,
    }
    await createAccount(createAccountInput)
    const encoded = encodeToken(response.customerId);
    return {
      customer: response.toJSON(),
      access_token: encoded.token,
    }
  } catch (error) {
    console.log({error})
    // mongodb error
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue)
      if (key[0] == 'customerId') {
        throw new Error('Phone Number is already in use')
      }
      throw new Error(`${key[0]} is already in use`)
    }
    logger.error('Error Creating Customer')
    logger.error(error)
    throw error;
  }
}

// logs in a customer
export const loginCustomer = async (input: LoginCustomerInput): Promise<CreateCustomerOutput> => {
  // get customer details by username
  // check if customer exists
  // compare password
  // generate access_token
  // send response
  try {
    const { username, password } = input;
    const customer = await Customers.findOne({ username });
    if (!customer) {
      throw new Error('Customer Does Not Exist');
    }
    const isPasswordValid = await bcryptCompareCredential(customer.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid Username or Password');
    }
    const encoded = encodeToken(customer.customerId);
    return {
      customer: customer.toJSON(),
      access_token: encoded.token,
    }
  } catch (error) {
    logger.error('Error Logging in Customer')
    logger.error(error)
    throw error;
  }
}

// validates transaction pin
export const validateTransactionPin = async (input: ValidateTransactionPinInput) : Promise<boolean> => {
  // get customer details by customerId
  // check if customer exists
  // compare password
  // generate access_token
  // send response
  try {
    const { customerId, transactionPin } = input;
    const customer = await Customers.findOne({ customerId });
    if (!customer) {
      throw new Error('Customer Does Not Exist');
    }
    const isPinValid = await bcryptCompareCredential(customer.transactionPin, transactionPin);
    return isPinValid
  } catch (error) {
    logger.error('Error Validating Transaction Pin')
    logger.error(error)
    throw error;
  }
}

// get customer details
export const getCustomerDetails = async (input: GetCustomerDetailsInput): Promise<ICustomer> => {
  // check if username or customerId exists in input
  try {
    const query: GetCustomerDetailsInput = {};
    if (input.customerId) {
      query.customerId = input.customerId;
    }

    if (input.username) {
      query.username = input.username;
    }
    if (Object.keys(query).length < 1) {
      throw new Error('Please Provide Either of username or customerId');
    }
    const customer = await Customers.findOne(query);
    if (!customer) {
      throw new Error('Customer Does Not Exist');
    }
    return customer.toJSON();
  } catch (error) {
    logger.error('Error Getting Customer Details')
    logger.error(error)
    throw error;
  }
}
