const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    // Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    Object.assign(loggedInUser, req.body);

    await loggedInUser.save();
    res.send("Proifle update successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const passWordUser = req.user;
    const { currentPassword, newPassword } = req.body;

    // Validate the request body
    if (!currentPassword || !newPassword) {
      throw new Error("Both currentPassword and newPassword are required");
    }

    const isMatch = await passWordUser.validatePassword(currentPassword);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    passWordUser.passWord = hashedPassword;
    await passWordUser.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
