import { Request, Response } from 'express'
import { MoveFundsInput } from '../interfaces/transfer.int';

import { failure, success } from '../lib/response'
import { extractCustomerId } from '../lib/utils';
// import { IQueue } from '../models/Accounts'
import { TransferService } from '../services'

/**
 * @api {post} /transfer Make a transfer
 * @apiGroup Transfers
 *
 * @apiSuccess {Object} response
 * @apiSuccess {String} message
 * @apiSuccess {Object} data
 * @apiSuccess {Object} message
 * @apiSuccess {String} message.id
 * @apiSuccess {String} message.message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "data": {
 *        credit: {
 *          amount: number // this is in kobo
 *           direction: 1,
 *           accountNumber: string
 *           accountOwner: string
 *           currency: string
 *           balanceBefore: number // in kobo
 *           balanceAfter: number // in kobo
 *           narration: string
 *           reference: string
 *        },
 *         debit: {
 *           credit: {
 *          amount: number // this is in kobo
 *           direction: -1,
 *           accountNumber: string
 *           accountOwner: string
 *           currency: string
 *           balanceBefore: number // in kobo
 *           balanceAfter: number // in kobo
 *           narration: string
 *           reference: string
 *        }
 *         }
 *      },
 *      "message": "sucessful",
 *    }
 */

export const transferFunds = async (req: Request, res: Response) => {
  try {
    const customerId = extractCustomerId(req);
    if (!customerId) {
      return failure({ res, message: 'Please Provide a customer Id', httpCode: 400 })
    }
    const body: MoveFundsInput = req.body;
    body.customerId = customerId;
    const response = await TransferService.moveFunds(body);
    return success({ res, data: response, httpCode: 201, message: 'Transfer Successful' });
  } catch (err) {
    return failure({ res, message: err.message, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {get} /transfer/:accountNumber Get a customer details by username
 * @apiGroup Customer
 *
 * @apiSuccess {Object} response
 * @apiSuccess {String} message
 * @apiSuccess {Object} data
 * @apiSuccess {Object} message
 * @apiSuccess {String} message.id
 * @apiSuccess {String} message.message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "data": [
 *          {
 *              amount: number // this is in kobo
 *           direction: 1,
 *           accountNumber: string
 *           accountOwner: string
 *           currency: string
 *           balanceBefore: number // in kobo
 *           balanceAfter: number // in kobo
 *           narration: string
 *           reference: string
 *          },
            {
 *             amount: number // this is in kobo
 *           direction: -1,
 *           accountNumber: string
 *           accountOwner: string
 *           currency: string
 *           balanceBefore: number // in kobo
 *           balanceAfter: number // in kobo
 *           narration: string
 *           reference: string
 *           }
 *       
 *      ],
 *      "message": "sucessful",
 *    }
 */
export const getTransferHistory = async (req: Request, res: Response) => {
  try {
    const accountNumber = req.params['accountNumber'];
    if (!accountNumber) {
      return failure({ res, message: 'Please Provide an account number', httpCode: 400 })
    }
    const response = await TransferService.getTransferHistory(accountNumber);
    return success({ res, data: response, httpCode: 200, message: 'Transfer History' })
  } catch (err) {
    return failure({ res, message: err.message, httpCode: err.httpCode || 500 })
  }
}