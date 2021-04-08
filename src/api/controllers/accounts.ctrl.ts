import { Request, Response } from 'express'
import { CreateAccountInput } from '../interfaces/accounts.int';

import { failure, success } from '../lib/response'
import { extractCustomerId } from '../lib/utils';
import { AccountService } from '../services'

/**
 * @api {post} /account Create a new account
 * @apiGroup account
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
 *         accountNumber: string
 *         accountOwner: string
 *         currentBalance: number // this is in kobo
 *         active: boolean
 *         currency: string
 *         updatedAt: any
 *         phoneNumber: string
 *      },
 *      "message": "sucessful",
 *    }
 */

export const createAccount = async (req: Request, res: Response) => {
  try {
    const body: CreateAccountInput = req.body;
    const customerId = extractCustomerId(req);
    if (!customerId) {
      return failure({ res, message: 'Please Provide a customer Id', httpCode: 400 })
    }
    body.accountOwner = customerId;
    const response = await AccountService.createAccount(body);
    return success({ res, data: response, httpCode: 201, message: 'Successfully Created Account' });
  } catch (err) {
    return failure({ res, message: err.message, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {get} /account/details/:accountNumber Get Account Details
 * @apiGroup account
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
 *         accountNumber: string
 *         accountOwner: string
 *         currentBalance: number // this is in kobo
 *         active: boolean
 *         currency: string
 *         updatedAt: any
 *         phoneNumber: string
 *      },
 *      "message": "successful",
 *    }
 */
export const getAccountDetails = async (req: Request, res: Response) => {
  const accountNumber = req.params['accountNumber'];
  if (!accountNumber) {
    return failure({ res, message: 'Please Provide an account number', httpCode: 400 })
  }
  try {
    const response= await AccountService.getAccountDetails(accountNumber);
    return success({ res, data: response, httpCode: 200, message: 'Account Details' })
  } catch (err) {
    return failure({ res, message: err.message, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {get} /account Get all a customer's accounts
 * @apiGroup account
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
 *         accountNumber: string
 *         accountOwner: string
 *         currentBalance: number // this is in kobo
 *         active: boolean
 *         currency: string
 *         updatedAt: any
 *         phoneNumber: string
 *      },
 *        {
 *         accountNumber: string
 *         accountOwner: string
 *         currentBalance: number // this is in kobo
 *         active: boolean
 *         currency: string
 *         updatedAt: any
 *         phoneNumber: string
 *      } 
 *      ],
 *      "message": "successful",
 *    }
 */
export const getAllCustomerAccounts = async (req: Request, res: Response) => {
  const customerId = extractCustomerId(req);
  if (!customerId) {
    return failure({ res, message: 'Please Provide a customer Id', httpCode: 400 })
  }
  try {
    const response = await AccountService.getAllCustomerAccounts(customerId);
    return success({ res, data: response, httpCode: 200, message: 'All Accounts' })
  } catch (err) {
    return failure({ res, message: err.message, errStack: err, httpCode: err.httpCode || 500 })
  }
}

