import Joi from 'joi';

export const transferFundsSchema = Joi.object({
  amount: Joi.number().required(),
  sourceAccountNumber: Joi.string().required(),
  destAccountNumber: Joi.string().required(),
  narration: Joi.string(),
  sourcePin: Joi.string().length(4),
});