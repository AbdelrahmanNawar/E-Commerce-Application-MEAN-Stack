const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/user");
const OrderModel = require("../models/order");
const ProductModel = require("../models/product");
const orderStatusModel = require("../models/orderstatus");
const validateUser = require("../helpers/validateuser");
const validateObjectId = require("../helpers/validateobjectid");
const bcrypt = require("bcrypt");
//////
const { authenticateJWT, logIn } = require("./middlewares/authenticatejwt");
const isAdmin = require("./middlewares/isadmin");
//////

//-----------------------------------
//Image

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/users");
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.toLowerCase().split(".")[1];
        cb(null, "user" + "-" + Date.now() + "." + extension);
    },
});

var upload = multer({ storage: storage });

//-----------------------------------

//Get All
userRouter.get("/", [authenticateJWT, isAdmin], async(req, res) => {
    let usersFromDb = await UserModel.find({}).populate("orders");
    if (usersFromDb) return res.send(usersFromDb);
    else return res.send("No Data");
});

//Get Specific User by id
userRouter.get("/:id", authenticateJWT, async(req, res) => {
    const { error } = validateObjectId(req.params.id);
    if (error) return res.status(400).send("Invalid Id");
    let usersFromDb = await UserModel.findById(req.params.id).populate("orders");
    if (usersFromDb) return res.status(200).send(usersFromDb);
    else {
        return res.status(404).send("No Data");
    }
});

//Register
//Add New User
userRouter.post("/", async(req, res) => {
    //Validation
    const { error } = await validateUser(req.body);
    if (error)
        return res
            .status(400)
            .send("Cannot perform this operation, check this error " + error);
    let isExisted = await UserModel.find({ email: req.body.email });
    if (isExisted.length > 0) {
        return res.send(405, "Email already exist");
    }
    //Save to db
    else {
        let userObj = new UserModel({
            ...req.body,
        });
        userObj.role = "member";

        if (!req.body.imageUrl) {
            const url = req.protocol + "://" + req.get("host") + "/assets/users/";
            if (userObj.gender == "male")
                userObj.imageUrl = "/assets/users/default_male_user.jpg";
            else if (userObj.gender == "female")
                userObj.imageUrl = "/assets/users/default_female_user.jpg";
            else userObj.imageUrl = "/assets/users/user-image.jpg";
        } else userObj.imageUrl = url + userObj.imageUrl;

        if (!req.body.image) userObj.image = "";
        if (!req.body.orders) userObj.orders = [];
        userObj.password = await bcrypt.hashSync(userObj.password, 10);
        userObj = await userObj.save();
        //Return response
        if (await userObj) {
            const accessToken = await logIn(userObj);
            return res.status(200).send({ accessToken, userObj });
        }
        return res.status(400).send("Failed to add this user");
    }
});

//Login
//Get user by email and pass
userRouter.put("/", async(req, res) => {
    const userInfo = req.body;
    const userObj = await UserModel.findOne({ email: `${userInfo.email}` });
    if (!userObj) return res.status(400).send("Email/Password not matched");
    if (bcrypt.compareSync(userInfo.password, userObj.password)) {
        const accessToken = logIn(userObj);
        const obj = {
            username: userObj.username,
            email: userObj.email,
            gender: userObj.gender,
            role: userObj.role,
            id: userObj._id,
            imageUrl: userObj.url,
        };
        return res.status(200).send({ accessToken, obj });
    } else {
        return res.status(400).send("Email/Password not matched");
    }
});

//Update User By Id
userRouter.patch("/:id", [authenticateJWT], async(req, res) => {
    let userObjToUpdate = {
        username: "",
        email: "",
        password: "",
        gender: "",
    };
    userObjToUpdate.username = req.body.username;
    userObjToUpdate.email = req.body.email;
    userObjToUpdate.password = req.body.password;
    userObjToUpdate.gender = req.body.gender;
    const id = req.params.id;

    const newPassword = req.body.newPassword;
    const isPasswordUpdated = req.body.isPasswordUpdated;
    if (isPasswordUpdated) {
        userObjToUpdate.password = newPassword;
    }
    //Validate Id
    let { errorValidateId } = validateObjectId(id);
    if (errorValidateId) return res.status(400).send(errorValidateId);
    let { error } = validateUser(userObjToUpdate);
    if (error)
        return res
            .status(400)
            .send("Cannot perform this operation, check this error" + error);
    let userFromDb = await UserModel.findById(req.params.id);
    if (!userFromDb) return res.send("not found");
    //Save to db
    if (
        userFromDb.email != userObjToUpdate.email &&
        UserModel.find({ email: userObjToUpdate.email })
    )
        return res.send(400, "Email already exist");
    userObjToUpdate.password = bcrypt.hashSync(userObjToUpdate.password, 10);
    userObjToUpdate = await UserModel.findByIdAndUpdate(id, userObjToUpdate, {
        new: true,
    });
    const userTokenObject = {
        _id: id,
        username: userObjToUpdate.username,
        email: userObjToUpdate.email,
        imageUrl: userObjToUpdate.imageUrl,
        role: userObjToUpdate.role,
        gender: userObjToUpdate.gender,
    };
    const accessToken = logIn(userTokenObject);
    return res.status(200).send({ accessToken, userTokenObject });
});

// Update img of User By Id
userRouter.patch(
    "/img/:id", [upload.single("image")],
    async(req, res) => {
        //Find User
        const userObjToUpdate = req.body;
        const id = req.params.id;
        //Validate Id
        let { errorValidateId } = validateObjectId(id);
        if (errorValidateId) return res.status(400).send(errorValidateId);
        let userFromDb = await UserModel.findById(req.params.id);
        if (!userFromDb) return res.status(404).send("not found");
        //image
        if (req.file) {
            const url = req.protocol + "://" + req.get("host") + '/';
            userObjToUpdate.imageUrl = url + req.file.filename;
        }
        userFromDb = await UserModel.findByIdAndUpdate(id, userObjToUpdate, {
            new: true,
        });
        return res.status(200).send(userFromDb);
    }
);

//Delete User By Id
userRouter.delete("/:id", [authenticateJWT, isAdmin], async(req, res) => {
    const id = req.params.id;
    const { error } = validateObjectId(id);
    if (error) return res.status(400).send("Invalid User Id");
    const usersssssssssssss = await UserModel.findById(id).populate("orders");
    await OrderModel.find({ user: id, status: "pending" },
        async(error, cbOrder) => {
            if (error) return res.send(error);
            if (cbOrder.length > 0)
                for (let j = 0; j < cbOrder.length; j++) {
                    for (let i = 0; i < cbOrder[j].products.length; i++) {
                        let product = await ProductModel.findById(cbOrder[j].products[i]);
                        product.quantity += cbOrder[j].productCount[i];
                        product = await ProductModel.findByIdAndUpdate(
                            product._id,
                            product
                        );
                    }
                }
        }
    );

    let user = await UserModel.findById(id);
    if (user.role != "admin") user = await UserModel.findByIdAndDelete(id);
    return res.status(200).send("User deleted");
});

module.exports = userRouter;