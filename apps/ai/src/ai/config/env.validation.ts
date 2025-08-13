import * as Joi from 'joi';

export default Joi.object({
  GEMINI_API_KEY: Joi.string().required(),
});
