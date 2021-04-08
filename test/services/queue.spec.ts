import { expect } from 'chai'
import { map, pick } from 'lodash/fp'
import { IQueue } from 'src/api/models/Accounts'

import { Queue } from '../../src/api/models'
import { QueueService } from '../../src/api/services'
import { doBeforeEach } from '../helpers/doBeforeEach'
import { toJSON } from '../helpers/helper'

const addMessages = async () => {
  const message = 'a message to my beloved '
  await QueueService.addMessage(message)
  await QueueService.addMessage(message + '1')
  await QueueService.addMessage(message + '2')
  await QueueService.addMessage(message + '3')
  await QueueService.addMessage(message + '4')
}

describe('Queue Service', () => {
  beforeEach(doBeforeEach)

  it('should fetch messages successfully', async () => {
    await addMessages()
    const queue = await QueueService.getUnconfirmedMessages()
    expect(queue).to.exist
    expect(queue).to.be.an('array')
    expect(queue[0]).to.haveOwnProperty('_id')
    expect(queue[0]).to.haveOwnProperty('message')
    expect(queue[0]).to.haveOwnProperty('updatedAt')
  })

  it('should expect `awaitingConfirmation` to be true when messages have been fetched and unconfirmed', async () => {
    await addMessages()
    await QueueService.getUnconfirmedMessages()
    const messages = map(toJSON)(await Queue.find())
    map((message: Partial<IQueue>) => {
      expect(message.awaitingConfirmation).to.be.true
    })(messages)
  })

  it('should add message successfully', async () => {
    const message = 'a message to my beloved '
    await QueueService.addMessage(message)
    const queueFromDb = toJSON(await Queue.findOne({ message }))
    expect(queueFromDb).to.exist
    expect(queueFromDb).to.be.an('object')
    expect(queueFromDb).to.haveOwnProperty('_id')
    expect(queueFromDb).to.haveOwnProperty('message')
    expect(queueFromDb?.message).to.equal(message)
  })

  it('should should delete messages whwn confirmed successfully', async () => {
    await addMessages()
    const messages = await QueueService.getUnconfirmedMessages()
    const messageIds = map(pick(['_id']))(messages)
    await QueueService.confirmMessages(messageIds as string[])
  })
})
