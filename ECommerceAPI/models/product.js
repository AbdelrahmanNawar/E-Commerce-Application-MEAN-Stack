const mongoose = require('mongoose');

//Products (id,
// title, image, price, details,
// quantity, ispromoted, promotion)

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        data: Buffer
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    details: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    isPromoted: {
        type: Boolean,
        default: false
    },
    promotion: {
        type: Number
    },
    category: {
        type: String,
        required: true,
        enum: ["women", "men", "children"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;