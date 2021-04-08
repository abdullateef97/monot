import '../../setup/envConfig'

import * as express from 'express'

import { CustomerController, AccountsController, TransferController } from './controllers'
import { validateSchema } from './middleware/validateSchema';
import { createCustomerSchema, loginCustomerSchema } from './schema/customer.sch';
import { validateToken } from './middleware/validateToken';
import { createAccountSchema } from './schema/accounts.sch';
import { transferFundsSchema } from './schema/transfer.sch';

const routes = (app: express.Router) => {
  // customer
  app.post('/customer', validateSchema(createCustomerSchema), CustomerController.createCustomer);
  app.post('/customer/login', validateSchema(loginCustomerSchema), CustomerController.loginCustomer);
  app.get('/customer', validateToken, CustomerController.getCustomerDetails);

  // accounts
  app.post('/account', validateSchema(createAccountSchema), validateToken, AccountsController.createAccount);
  app.get('/account', validateToken, AccountsController.getAllCustomerAccounts)
  app.get('/account/details/:accountNumber', validateToken,  AccountsController.getAccountDetails);

  // transfers
  app.post('/transfer', validateSchema(transferFundsSchema), validateToken, TransferController.transferFunds);
  app.get('/transfer/:accountNumber', validateToken, TransferController.getTransferHistory)

  return app
}

export { routes }
