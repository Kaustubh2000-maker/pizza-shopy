const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userScherma = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    // minlength: [8, "length should be above 8 char"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: { type: String, default: "default.jpg" },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
        // if true this will retun true and process further
        // if falce the below message will be executeds
      },
      message: "Passwords are not same !!!",
    },
  },
  passwordChangedat: { type: Date },
  role: {
    type: String,
    enum: ["user", "guide", "admin", "lead-guide"],
    default: "user",
  },
  passwordResetToken: String,
  passwordResetExpires: String,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  cart: {
    type: Array,
  },
});

userScherma.pre("save", async function (next) {
  // if password is not modified this will retrun the current function
  if (!this.isModified("password")) return next();

  // this will encrypt password, the 12 represents cpu processing
  this.password = await bcrypt.hash(this.password, 12);

  // deleting passwordConfirm , this will not save it
  this.passwordConfirm = undefined;
  next();
});

userScherma.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedat = Date.now() - 1000;
  next();
});

userScherma.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userScherma.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userScherma.methods.changedPassowordAfter = function (JWTTimestamp) {
  if (this.passwordChangedat) {
    const chnagedTimestamp = parseInt(
      this.passwordChangedat.getTime() / 1000,
      10
    );
    // console.log(JWTTimestamp, chnagedTimestamp);

    return JWTTimestamp < chnagedTimestamp;
  }
  return false;
};

userScherma.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = new mongoose.model("User", userScherma);
module.exports = User;
