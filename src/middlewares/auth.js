// const adminAuth = (req, res, next) => {
//   console.log("Auth is checked");
//   const token = "xyz";
//   const isAuthorized = token === "xyz";
//   if (!isAuthorized) {
//     res.status(401).send("unathorized request");
//   } else {
//     next();
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodeMesage = await jwt.verify(token, "DevTinder@7778");

    const { _id } = decodeMesage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { userAuth };
