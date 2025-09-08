import * as Joi from 'joi';

export default Joi.object({
  RESEND_API_KEY: Joi.string().required(),
  RESEND_FROM_EMAIL: Joi.string().required(),
  RABBIT_MQ_URI: Joi.string().required(),
});
