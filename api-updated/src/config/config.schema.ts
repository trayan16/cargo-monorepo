import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  MONGO_URL: Joi.string(),
  PORT: Joi.number(),
  STAGE: Joi.string().required(),
});
