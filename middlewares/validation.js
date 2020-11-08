const Joi = require('joi');


const authValidation =  (data) => {
    const validationSchema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return validationSchema.validate(data);

};

module.exports = { authValidation };