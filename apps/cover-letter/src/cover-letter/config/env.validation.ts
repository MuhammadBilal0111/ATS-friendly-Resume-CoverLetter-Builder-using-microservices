import * as Joi from 'joi';

export default Joi.object({
  RABBIT_MQ_URI: Joi.string().uri().required(),
  COVER_LETTER_SERVICE_PORT: Joi.number().port().required(),
  COVER_LETTER_SERVICE_HOST: Joi.string().hostname().required(),
});
