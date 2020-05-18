const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = Joi.object({
    username: Joi.string().required().min(6).max(15),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    role: Joi.string(),
    imageUrl: Joi.string().default(''),
    image: Joi.string(),
    //Relatioship
    orders: Joi.array().items(Joi.objectId()).default([])
});

const validateUser = user => userSchema.validate(user, {
    abortEarly: false
});

module.exports = validateUser;