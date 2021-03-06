interface IMongo {
  db: string
  host?: string
  port: number | string
  query_limit: number
  username?: string
  password?: string
  uri: string
}

export const config = {
  mongodb: {
    db: process.env.DB_NAME || 'mono_test',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    query_limit: 100,
    uri: process.env.DB_URI
  } as IMongo,
  messageConfirmationTimeout: 1000 * 10,
}
