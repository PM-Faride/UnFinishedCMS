const Joi = require("joi");
const mongoose = require("mongoose");
const stringSchema = require("../defSchema/string");

const categorySchema = new mongoose.Schema({
  title: {
    ...stringSchema,
    required: true,
  },
  isMainCat: {
    type: Boolean,
    default: true,
  },
  parentCategory: {
    required: function () {
      return !this.isMainCat;
    },
    // age name daste bandiro serfan bedim
    // ...stringSchema,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // baraye nemayesh in qesmat miyaym az db avval kolle matalebe in cat ro gerefte va nameshun ro tuye drop
    // list neshun mide k in list ham bayad halate recursive sakhte she akhe yeki cat ro did k main nis bebine
    // mainesh chiye un main k migire ro bebine main has ya na age nis baz un chiye va... va khob in selsele
    // bayad dar drop ham bashe va khob ba entekhab in miad id ro mizare
    //age nazaret avaz shod bekonesh name o name ro unique kon va ba nam o find bar asase un bero jolo
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory() {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    isMainCat: Joi.boolean(),
    // mainCategory: Joi.string().min(3).max(50),
  });
  return schema.validate();
}

exports.validate = validateCategory;
exports.Category = Category;
