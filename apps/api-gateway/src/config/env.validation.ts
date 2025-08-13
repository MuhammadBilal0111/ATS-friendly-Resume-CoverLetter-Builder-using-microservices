import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  // REQUIRED PORTS
  API_GATEWAY_PORT: Joi.number().port().required(),
  AUTH_SERVICE_PORT: Joi.number().port().required(),
  RESUME_SERVICE_PORT: Joi.number().port().required(),
  USERS_SERVICE_PORT: Joi.number().port().required(),
  AI_SERVICE_PORT: Joi.number().port().required(),
});
