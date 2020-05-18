const express = require("express");

const Product = require("../models/product");

const validateProduct = require("../helpers/validateproduct");
const validateObjectId = require("../helpers/validateobjectid");

const router = express.Router();

const { authenticateJWT, logIn } = require("./middlewares/authenticatejwt");
const isAdmin = require("./middlewares/isadmin");

//-----------------------------------
//Image

// const upload = require("./Middlewares/img");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/products");
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.toLowerCase().split(".")[1];
        cb(null, "product" + "-" + Date.now() + "." + extension);
    },
});

var upload = multer({ storage: storage });

//-----------------------------------

//  GetAll products
//  GET /Products
router.get("/", authenticateJWT, async(req, res) => {
    const products = await Product.find({ isDeleted: false });
    return res.send(products);
});

// Get by Category
router.get("/category/:category", authenticateJWT, async(req, res) => {
    const { category } = req.params;
    const products = await Product.find({ category: category, isDeleted: false });
    return res.send(products);
});

// Get by Name
router.get("/productName/:productName", authenticateJWT, async(req, res) => {
    const { productName } = req.params;
    const products = await Product.find({
        title: { $regex: productName },
        isDeleted: false,
    });
    return res.send(products);
});

//Get promoted products
router.get("/promoted", async(req, res) => {
    const productsList = await Product.find({
        isPromoted: true,
        isDeleted: false,
    });
    if (!productsList) return res.status(404).send("Not found");
    return res.send(productsList);
});

//  Get Product by ID
//  GET /products/:id
router.get("/:id", authenticateJWT, async(req, res) => {
    const { id } = req.params;
    const { err } = validateObjectId(id);
    if (err) return res.status(400).send("Invalid Product ID");
    const product = await Product.find({ _id: id, isDeleted: false });
    if (!product) return res.status(404).send("Product not Found");
    return res.send(product);
});

//  INSERT product
//  POST /products
router.post(
    "/", [authenticateJWT, isAdmin, upload.single("image")],
    async(req, res) => {
        request = JSON.parse(req.body.prd);
        const { err } = await validateProduct(request);
        if (err) return res.status(400).send(err.details);

        let product = new Product({
            ...request,
        });

        if (req.file) {
            const url = req.protocol + "://" + req.get("host") + "/";
            product.imageUrl = url + req.file.filename;
        } else {
            product.imageUrl = "assets/products/default-product-image.png";
            product.image = "assets/products/default-product-image.png";
        }

        if (product.promotion) product.isPromoted = true;
        else product.isPromoted = false;
        product.isDeleted = false;
        if (!product.details) product.details = "";
        if (!product.quantity) product.quantity = 0;
        if (!product.promotion) product.promotion = 0;
        product = await product.save();
        if (product) return res.status(200).send(product);
        else return res.status(400).send("Cannot add this product!");
    }
);

//  Update product by ID
//  PATCH products/:id
router.patch(
    "/:id", [authenticateJWT, isAdmin, upload.single("image")],
    async(req, res) => {
        request = JSON.parse(req.body.prd);

        const { id } = req.params;
        const { errId } = await validateObjectId(id);
        const { errProduct } = await validateProduct(request);

        if (errId) return res.status(400).send("Invalid Product Id");
        if (errProduct) return res.status(404).send(errProduct.details);

        let product = {...request };

        if (req.file) {
            const url = req.protocol + "://" + req.get("host") + "/";
            product.imageUrl = url + req.file.filename;
        }

        product = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });

        if (!product) return res.status(404).send("Product Update Failed");
        return res.status(200).send(product);
    }
);

//  Delete product by ID
//  DELETE products/:id
router.delete("/:id", [authenticateJWT, isAdmin], async(req, res) => {
    const { id } = req.params;
    const { err } = validateObjectId(id);
    if (err) return res.status(400).send("Invalid Product Id");
    const product = await Product.findByIdAndUpdate(
        id, { isDeleted: true },
        (error) => {
            if (error) return res.status(500).send({ error: error });
            return res.send("Successfully Saved");
        }
    );
    if (!product) return res.status(404).send("Product not Found");
    return res.status(200).send("Product is Deleted");
});

module.exports = router;