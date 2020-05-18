const express = require("express");

const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

const validateOrder = require("../helpers/validateorder");
const validateObjectId = require("../helpers/validateobjectid");
const format = require("date-format");

const orderStatus = require("../models/orderstatus");

const isAdmin = require("./middlewares/isadmin");

const router = express.Router();

// Get All Orders
router.get("/", isAdmin, async(request, response) => {
    let orders = await Order.find({})
        .populate("user")
        .populate({ path: "products.Product" })
        .sort({ date: 1 });
    return response.send(orders);
});

// Get Order By ID
router.get("/:id", async(request, response) => {
    const { id } = request.params;
    const { error } = validateObjectId(id);
    if (error) {
        return response.status(400).send("Invalid Order Id");
    }
    const order = await Order.findById(id)
        .populate("user")
        .populate("products.Product");
    if (!order) {
        return response.status(400).send("Order Not Found");
    }
    return response.send(order);
});

// Add Order
router.post("/", async(request, response) => {
    const { error } = validateOrder(request.body);
    if (error) {
        return response.status(400).send(error.details);
    }
    let order = new Order({
        ...request.body,
    });
    order.status = "pending";

    const productsToBeUpdated = [];
    for (let i = 0; i < order.products.length; i++) {
        let product = await Product.findById(order.products[i].Product);
        if (order.products[i].count <= product.quantity) {
            product.quantity -= order.products[i].count;
            productsToBeUpdated.push(product);
        } else {
            return response.status(400).send("Not Enough products");
        }
    }
    productsToBeUpdated.forEach(async(product) => {
        product = await Product.findByIdAndUpdate(product._id, product);
    });

    order = await order.save();
    const user = await User.findById(order.user);
    user.orders.push(order._id);
    user.save();
    return response.send(order);
});

// Update Order
router.patch("/:id", async(request, response) => {
    const { id } = request.params;
    const { error } = validateObjectId(id);
    if (error) {
        return response.status(400).send("Invalid Order Id");
    }
    let order = await Order.findById(id);
    order = await Order.findByIdAndUpdate(id, request.body, { new: true });
    if (!order) return response.send(500, "Order update failed");
    return response.send(200, order);
});

// Delete Order
router.delete("/:id", async(request, response) => {
    const { id } = request.params;
    const { error } = validateObjectId(id);
    if (error) {
        return res.status(400).send("Invalid Order");
    }
    const order = await Order.findById(id).populate("product");
    if (!order) {
        return response.status(400).send("Order Not Found");
    }
    if (order.status === orderStatus.pending) {
        return response.status(400).send("Can not Delete Pending Order");
    }

    for (let i = 0; i < order.products.length; i++) {
        let product = await Product.findById(order.products[i].product);
        product.quantity += order.products[i].count;
        product = await Product.findByIdAndUpdate(product._id, product);
    }
    let user = await User.findById(order.user);
    user = await User.find({ order: order });
    await Order.findByIdAndDelete(id);
    return response.send("Deleted");
});

// Get All User Orders
router.get("/user/:id", async(request, response) => {
    const { err } = validateObjectId(request.params.id);
    if (err) return res.status(400).send("Invalid User ID");
    let user = await User.findById(request.params.id);
    let orders = await Order.find({ user: user }).populate({
        path: "products.Product",
    });
    if (!orders) return response.status(400).send("User has no Orders");
    return response.send(orders);
});

module.exports = router;