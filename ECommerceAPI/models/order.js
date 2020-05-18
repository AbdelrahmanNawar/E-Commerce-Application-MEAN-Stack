const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const orderStatus = require('./orderstatus');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        count: {
            type: Number
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: orderStatus.pending
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;