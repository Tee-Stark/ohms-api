import Joi from '@hapi/joi'

const complaintSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional()
});

export default complaintSchema;
