import Joi from 'joi';

export const createAccountSchema = Joi.object({
  initialDeposit: Joi.number(),
  sourceAccount: Joi.string(),
  phoneNumber: Joi.string().min(10).max(14),
});