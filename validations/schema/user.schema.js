import Joi from '@hapi/joi'

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    role: Joi.string().allow('user', 'admin').optional()
 });
  
  export default userSchema;
