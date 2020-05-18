const jwt = require("jsonwebtoken");
const accessTokenSecret = "nevennawarammar";

exports.authenticateJWT = function(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.logIn = function(userObj) {
    return jwt.sign({
            userEmail: userObj.email,
            userId: userObj._id,
            role: userObj.role,
            userName: userObj.username,
            // userPassword: userObj.password,
            userGender: userObj.gender,
            userImageUrl: userObj.imageUrl
        },
        accessTokenSecret, { expiresIn: "60m" }
    );
};