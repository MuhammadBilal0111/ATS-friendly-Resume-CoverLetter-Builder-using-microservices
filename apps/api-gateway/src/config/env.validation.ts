import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  // Ports
  API_GATEWAY_PORT: Joi.number().port().required(),
  AUTH_SERVICE_PORT: Joi.number().port().required(),
  RESUME_SERVICE_PORT: Joi.number().port().required(),
  USERS_SERVICE_PORT: Joi.number().port().required(),
  COVER_LETTER_SERVICE_PORT: Joi.number().port().required(),

  // Hosts
  AUTH_SERVICE_HOST: Joi.string().hostname().required(),
  RESUME_SERVICE_HOST: Joi.string().hostname().required(),
  USERS_SERVICE_HOST: Joi.string().hostname().required(),
  COVER_LETTER_SERVICE_HOST: Joi.string().hostname().required(),

  // CORS
  CORS_ORIGIN: Joi.string()
    .uri({ scheme: [/https?/] }) // only allow http or https
    .required(),
});
