import { Request, Response } from 'express'
import { CreateCustomerInput, GetCustomerDetailsInput, LoginCustomerInput } from '../interfaces/customer.int';

import { failure, success } from '../lib/response'
// import { IQueue } from '../models/Accounts'
import { CustomerService } from '../services'

/**
 * @api {post} /customer/create Create a new customer
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
 *      "data": {
 *        access_token: access_token,
 *        customer: {
 *          username: 'username',
 *          active: true,
 *          customerId: '123456789',
 *          phoneNumber: '+234123456789',
 *          firstName: 'firstName',
 *          lastName: 'lastName',
 *          fullName: 'firstName lastName'
 *        }
 *      },
 *      "message": "sucessful",
 *    }
 */

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const body: CreateCustomerInput = req.body;
    const response = await CustomerService.createCustomer(body);
    return success({ res, data: response, httpCode: 200 })
  } catch (err) {
    return failure({ res, message: err, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {post} /customer/login Login a customer
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
 *      "data": {
 *        access_token: access_token,
 *        customer: {
 *          username: 'username',
 *          active: true,
 *          customerId: '123456789',
 *          phoneNumber: '+234123456789',
 *          firstName: 'firstName',
 *          lastName: 'lastName',
 *          fullName: 'firstName lastName'
 *        }
 *      },
 *      "message": "sucessful",
 *    }
 */

 export const loginCustomer = async (req: Request, res: Response) => {
  try {
    const body: LoginCustomerInput = req.body;
    const response = await CustomerService.loginCustomer(body);
    return success({ res, data: response, httpCode: 200 })
  } catch (err) {
    return failure({ res, message: err, httpCode: err.httpCode || 500 })
  }
}

/**
 * @api {get} /customer/:username Get a customer details by username
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
 *      "data": {
 *          username: 'username',
 *          active: true,
 *          customerId: '123456789',
 *          phoneNumber: '+234123456789',
 *          firstName: 'firstName',
 *          lastName: 'lastName',
 *          fullName: 'firstName lastName'
 *      },
 *      "message": "sucessful",
 *    }
 */
export const getCustomerDetails = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const input: GetCustomerDetailsInput = {
      username,
    }
    const response = await CustomerService.getCustomerDetails(input);
    return success({ res, data: response, httpCode: 200 })
  } catch (err) {
    return failure({ res, message: err, httpCode: err.httpCode || 500 })
  }
}