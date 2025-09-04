import * as Joi from 'joi';

export default Joi.object({
  GEMINI_API_KEY: Joi.string().required(),
  AI_MODEL: Joi.string().required(),
  RABBIT_MQ_URI: Joi.string().required(),
});
