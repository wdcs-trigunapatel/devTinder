const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLenght: 4,
      maxLenght: 50,
    },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(values) {
        if (!validator.isEmail(values)) {
          throw new Error("Email id not perfect: " + values);
        }
      },
    },
    passWord: { type: String, required: true },
    age: { type: String, min: 18 },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(values) {
      //   if (!["male", "female", "others"].includes(values)) {
      //     throw new Error("Gender Data Is Not Valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default: "https://cdn.quokkalabs.com/blog/static/icons/jpg/unknown.jpg",
    },
    about: {
      type: String,
      default: "This is all about user info",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DevTinder@7778", {
    expiresIn: "20d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passWordHash = user.passWord;

  const ispPassWordValid = await bcrypt.compare(
    passwordInputByUser,
    passWordHash
  );
  return ispPassWordValid;
};

module.exports = mongoose.model("USer", userSchema);
