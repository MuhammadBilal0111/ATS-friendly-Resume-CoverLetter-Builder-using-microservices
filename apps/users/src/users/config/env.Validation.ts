import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  USERS_SERVICE_HOST: Joi.string().hostname().required(),
  USERS_SERVICE_PORT: Joi.number().port().required(),
  DB_URL: Joi.string().uri().required(),
  DB_SYNC: Joi.boolean().default(false),
  AUTO_LOAD: Joi.boolean().default(false),
  RABBIT_MQ_URI: Joi.string().uri().required(),
});
