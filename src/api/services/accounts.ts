import { map, pick } from 'lodash/fp'

import { config } from '../../config/settings'
import { Queue } from '../models'
import { IQueue } from '../models/Accounts'

const getOlderUnconfirmedShifts = async (): Promise<IQueue[]> => {
  const tenSecondsAgo = new Date(Date.now() - config.messageConfirmationTimeout)
  const exists: IQueue[] = await Queue.find({
    awaitingConfirmation: true,
    updatedAt: { $lte: tenSecondsAgo },
  })
  return exists
}

const getUnconfirmedMessages = async () => {
  // Assessment note: If they visit more than 10 seconds after creation or update before the confirmation, they'll get the messages back
  const oldMessages = await getOlderUnconfirmedShifts()
  const newMessages = await Queue.find({ awaitingConfirmation: false })
  const messages = [...oldMessages, ...newMessages]
  if (messages) {
    await Queue.updateMany(
      { awaitingConfirmation: false },
      { $set: { awaitingConfirmation: true } },
      { new: true, multi: true }
    )
  }

  return map(pick(['_id', 'message', 'updatedAt']))(messages)
}

const addMessage = async (message: string) => {
  const newMessage = await Queue.create({ message })
  return newMessage.id
}

const confirmMessages = async (messageIds: string[]) => {
  const updateEachMessage = map(async (messageId: string) => {
    return await getConfirmUpdateQuery(messageId)
  })(messageIds)
  await Promise.all(updateEachMessage)
}

const getConfirmUpdateQuery = async (messageId: any) => await Queue.deleteOne({ _id: messageId })

export { getUnconfirmedMessages, addMessage, confirmMessages }
