import '../../setup/envConfig'

import * as express from 'express'

import { CustomerController, AccountsController, TransferController } from './controllers'

const routes = (app: express.Router) => {
  // customer
  app.post('/customer', CustomerController.createCustomer);
  app.post('/customer/login', CustomerController.loginCustomer);
  app.get('/customer', CustomerController.getCustomerDetails);

  // accounts
  app.post('/account', AccountsController.createAccount);
  app.get('/account', AccountsController.getAllCustomerAccounts)
  app.get('/account/details/:accountNumber', AccountsController.getAccountDetails);

  // transfers
  app.post('/transfer', TransferController.transferFunds);
  app.get('/transfer/:accountNumber', TransferController.getTransferHistory)

  return app
}

export { routes }
