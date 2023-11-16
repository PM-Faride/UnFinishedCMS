const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const stringSchema = require("../defSchema/string");

//creating the schema for the user containing name, email, password, ablities which shows what he/she can do
const userSchema = new mongoose.Schema({
  name: {
    ...stringSchema,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
  },
  // haminjr ok has dg karbar k login kard yebar mriim az db sathaye dastresi ro migirim mirizim va token misazim
  accessLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccessLevel",
  },
});

const User = mongoose.model("User", userSchema);

//joi validation
function validateUser(user) {
  const schema = Joi.object({
    // name: Joi.string().min(3).max(50),
    //nemikhad chun karbar ba email ya username login mikone 
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate();
}

exports.validate = validateUser;
exports.User = User;
