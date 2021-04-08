import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/mono-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

export { mongoose }
