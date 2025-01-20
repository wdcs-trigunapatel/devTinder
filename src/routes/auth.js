const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signUp", async (req, res) => {
  try {
    //validation of data
    const { firstName, lastName, emailId, passWord } = req.body;
    validateSignupData(req);

    //Encrypt the password
    const passWordHash = await bcrypt.hash(passWord, 10);

    //creating a new instancs of the User Moddel
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passWordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credantials");
    }

    const ispPassWordValid = await user.validatePassword(passWord);

    if (ispPassWordValid) {
      //Create a JWT token with expiry token
      const token = await user.getJWT();

      //and the token to cookie and send the response back to server
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credantials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

module.exports = authRouter;
