const mongodb = require("mongoose");

const { Schema, model } = mongodb;
const UserSchema = new Schema({
  user: { type: String, require: true, min: 4, unique: true },
  password: { type: String, require: true },
});
const UserModel = model("User", UserSchema);
module.exports = UserModel;
