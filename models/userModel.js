const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: 8,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.user = process.env.USERNAME;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.correctPassword = async function (
  canditatepassword,
  userpassword
) {
  return await bcrypt.compare(canditatepassword, userpassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
