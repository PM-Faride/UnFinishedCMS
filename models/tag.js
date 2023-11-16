const Joi = require("joi");
const mongoose = require("mongoose");
const stringSchema = require("../defSchema/string");

const tagSchema = new mongoose.Schema({
  title: {
    ...stringSchema,
    required: true,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

function validateTag() {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
  });
  return schema.validate();
}

exports.validate = validateTag;
exports.Tag = Tag;
