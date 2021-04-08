export const corsWhitelist: string[] = ['*']

export const { JWT_SECRET, NODE_ENV, PORT } = process.env

export const constants = {
  SUCCESSFUL: 'successful',
  DIRECTION: {
    DEBIT: -1,
    CREDIT: 1,
  },
  CURRENCY: {
    NGN: '566'
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || '5GO8vZfBEYx'
  }
}
