const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const productOrderSchema = {
    Product: Joi.objectId().required(),
    count: Joi.number().integer().required()
};

const orderSchema = Joi.object({
    user: Joi.objectId().required(),
    products: Joi.array().items(productOrderSchema).default([]).required()
});

const validateOrder = order => orderSchema.validate(order, { abortEarly: false });

module.exports = validateOrder;