import mongoose from 'mongoose'

import { config } from './settings'
import { logger } from './winston'

const connectionString = config.mongodb.uri
mongoose.Promise = global.Promise
const mongo = () =>
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((db) => {
      logger.info('Mongo Connection Established')

      // If the Node process ends, close the Mongoose connection
      process.on('SIGINT', () => {
        logger.error('Mongoose default connection disconnected through app termination')
        process.exit(0)
      })
    })
    .catch((err) => {
      logger.error(`Mongo Connection Error: ${err}`)
      process.exit(1)
    })

export { mongo }
