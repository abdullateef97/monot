import '../../setup/envConfig'

import * as express from 'express'

import { QueueController } from './controllers'

const routes = (app: express.Router) => {
  app.get('/messages', QueueController.getMessages)
  app.post('/message', QueueController.addMessage)
  app.put('/messages/confirm/', QueueController.confirmMessages)
  return app
}

export { routes }
