const Joi = require('@hapi/joi');

const schema = Joi.object({
  author: Joi.string(),
});
