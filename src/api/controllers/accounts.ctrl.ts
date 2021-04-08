import { Request, Response } from 'express'

import { failure, success } from '../lib/response'
import { IQueue } from '../models/Accounts'
import { AccountService } from '../services'

/**
 * @api {get} /messages Get All Messages in Queue
 * @apiName Get Messages in Queue
 * @apiGroup Messages
 *
 * @apiSuccess {Object} response
 * @apiSuccess {String} message
 * @apiSuccess {Object[]} data
 * @apiSuccess {Object} message
 * @apiSuccess {String} message.id
 * @apiSuccess {String} message.message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "data": [
 *        {
 *          "_id": "5f54055f212c2f9cd9373198",
 *          "message": "a test message"
 *        },
 *        {
 *          "_id": "5f54055f212c2f9cd9373199",
 *          "message": "a new test message"
 *        },
 *      ],
 *      "message": "sucessful",
 *    }
 */

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages: Partial<IQueue>[] = await QueueService.getUnconfirmedMessages()
    return success({ res, data: messages, httpCode: 200 })
  } catch (err) {
    return failure({ res, message: err, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {post} /message Add Message to Queue
 * @apiName Add Message
 * @apiGroup Message
 *
 * @apiParam {String} message Message to be added to queue
 *
 * @apiSuccess {Object} response Api default response format
 * @apiSuccess {String} message  Success message
 * @apiSuccess {String} data     Response data
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "data": "5f54055f212c2f9cd9373198",
 *      "message": "sucessful",
 *    }
 *
 */
const addMessage = async (req: Request, res: Response) => {
  const { message } = req.body
  if (!message) {
    return failure({ res, message: 'Can not add empty message', httpCode: 400 })
  }
  try {
    const messageId: number = await QueueService.addMessage(message)
    return success({ res, data: messageId, httpCode: 201 })
  } catch (err) {
    return failure({ res, message: err, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {put} /messages/confirm Confirm Messages Processed By Consumer in Queue
 * @apiName Confirm Messages
 * @apiGroup Messages
 *
 * @apiParam {String[]} processed Processed message ids to be confirmed
 *
 * @apiSuccess {Object} response Api default response format
 * @apiSuccess {String} message  Success message
 * @apiSuccess {String} data     Response data
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "data": [],
 *      "message": "sucessful",
 *    }
 *
 */
const confirmMessages = async (req: Request, res: Response) => {
  const { processed } = req.body
  try {
    await QueueService.confirmMessages(processed)
    return success({ res, data: [], httpCode: 200 })
  } catch (err) {
    return failure({ res, message: err.message, errStack: err, httpCode: err.httpCode || 500 })
  }
}

export { getMessages, addMessage, confirmMessages }
