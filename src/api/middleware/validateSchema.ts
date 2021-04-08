import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi'
import { failure } from '../lib/response';

export const validateSchema = (schema: Joi.ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return failure({ res, message: error.message, errStack: error, httpCode: httpStatus.BAD_REQUEST})
    }
    return next();
}