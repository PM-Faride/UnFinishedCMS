const mongoose = require("mongoose");
const stringSchema = require("../defSchema/string");

const IndividualAccessLevel = mongoose.model(
  "IndividualAccessLevel",
  new mongoose.Schema({
    accessLevel: {
      ...stringSchema,
      required,
      unique: true,
    },
  })
);

module.exports = IndividualAccessLevel;
