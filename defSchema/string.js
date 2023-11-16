const mongoose = require("mongoose");

const stringSchema = {
  type: String,
  minlength: 3,
  maxlength: 50,
};

module.exports = stringSchema;
