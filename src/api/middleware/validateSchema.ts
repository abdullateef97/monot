import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'
import { failure } from '../lib/response';

export const validateSchema = (schema: Joi.ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return failure({ res, message: error.message, errStack: error, httpCode: 400})
    }
    return next();
}