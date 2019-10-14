const Joi = require('@hapi/joi');

module.exports = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
        admin: Joi.boolean()
    });
    return schema.validate(data);
}
