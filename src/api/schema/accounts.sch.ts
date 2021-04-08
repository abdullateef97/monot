import Joi from 'joi';
import { join } from 'lodash';

export const createAccountSchema = Joi.object({
  initialDeposit: Joi.number(),
  sourceAccount: Joi.string(),
  phoneNumber: Joi.string().min(10).max(14),
});