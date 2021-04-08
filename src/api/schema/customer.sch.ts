import Joi from 'joi';
import { join } from 'lodash';

export const createCustomerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(7).required(),
  transactionPin: Joi.string().length(4).required(),
  phoneNumber: Joi.string().min(10).max(14).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
});

export const loginCustomerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(7).required(),
});