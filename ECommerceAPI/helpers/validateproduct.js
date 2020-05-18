const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi);

const productSchema = joi.objectId({
    title: joi.string().required(),
    image: joi.string(),
    imageUrl: joi.string(),
    price: joi.number().integer().required(),
    details: joi.string(),
    quantity: joi.number().integer().default(0),
    isPromoted: joi.boolean().default(false),
    promotion: joi.number().integer(),
    catergory: joi.string().required(),
    isDeleted: joi.boolean().default(false)
});

const validateProduct = product => productSchema.validate(product, { abortEarly: false });

module.exports = validateProduct;