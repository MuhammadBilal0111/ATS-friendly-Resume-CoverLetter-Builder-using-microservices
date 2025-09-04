import * as Joi from 'joi';

export default Joi.object({
  RABBIT_MQ_URI: Joi.string().uri().required(),
});
