import Joi from '@hapi/joi'

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
 });
  
  export default userSchema;
