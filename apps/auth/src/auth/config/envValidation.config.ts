// src/config/validation.ts
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  AUTH_SERVICE_PORT: Joi.number().port().required(),
  AUTH_SERVICE_HOST: Joi.string().hostname().required(),
  JWT_TOKEN_SECRET: Joi.string().min(32).required(),
  JWT_TOKEN_EXPIRESIN: Joi.number().integer().positive().required(),
  REFRESH_TOKEN_EXPIRESIN: Joi.number().integer().positive().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().uri().required(),
  JWT_TOKEN_ISSUER: Joi.string().uri().required(),
  RABBIT_MQ_URI: Joi.string().uri().required(),
});
