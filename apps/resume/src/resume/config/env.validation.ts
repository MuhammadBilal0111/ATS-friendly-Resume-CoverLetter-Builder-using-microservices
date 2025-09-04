import * as Joi from 'joi';
// Custom Configuration for the databse URL validation
export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  MONGODB_URI: Joi.string()
    .required()
    .uri()
    .description('The URL of the MongoDB database'),
  DB_TYPE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  RABBIT_MQ_URI: Joi.string().uri().required(),
});
