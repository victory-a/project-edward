const Joi = require('@hapi/joi');

module.exports = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        password: Joi.string().min(2).required(),
        admin: Joi.boolean()
    });
    return schema.validate(data);
}
