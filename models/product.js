const mongoose = require("mongoose");
const Joi = require("joi");
const stringSchema = require("../defSchema/string");
const positiveNum = require("../defSchema/positiveNum");

// #region schemas needed for varietySchema
const patternSchema = mongoose.Schema({
  name: { ...stringSchema, required: true },
  image: String, // url address
});
const colorSchema = mongoose.Schema({
  name: { ...stringSchema, required: true },
  colorCode: { type: String, required: true },
});
// #endregion

// #region schemas needed in physicalProductSchema
const productLimit = mongoose.Schema({
  min: {
    type: Number,
    min: 1,
  },
  max: Number,
});

// const input = mongoose.Schema({
//   msg: { type: String, trim: true, minlength: 5 },
//   value: { type: String }, //in manzur meqdari has k karbar mide va mishe marhale bad
//   //man alan tu zehnam nis k chejuri mishe in bashe akhe baraye har karbar farq dare
//   //age in nabashe k mishe be hamun input mostaqim goft k string bashe va dg schema nakhad
// });

const dimisionSchema = mongoose.Schema({
  //think how to make it that doesnt take neg but it can be empty
  height: { ...positiveNum },
  width: { ...positiveNum },
  depth: { ...positiveNum },
});

const transportationSchema = mongoose.Schema({
  weight: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "The weight should be positive.",
    },
  },
  dimisions: dimisionSchema,
  prepareTime: { ...positiveNum },
});

const garanteeSchema = mongoose.Schema({
  active: { type: Boolean, default: false },
  title: { ...stringSchema },
  refundDays: { ...positiveNum },
});
// #endregion

// #region schemas needed in virtualProductSchema
const volumeSchema = mongoose.Schema({
  volume: { ...positiveNum },
  unit: { ...stringSchema },
});
// #endregion

// #region schemas needed in product schema
const propertySchema = new mongoose.Schema({
  name: { ...stringSchema },
  value: String,
});
const featureSchema = new mongoose.Schema({
  group: { ...stringSchema },
  properties: [propertySchema],
});
const mediaSchema = new mongoose.Schema({
  mainImg: String,
  gallery: [String],
  video: String,
});

const priceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "The price should be zero or positive",
    },
  },
  currency: {
    ...stringSchema,
    required: true,
  },
});
const discountSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  discountValue: { ...positiveNum },
  percentage: { ...positiveNum },
  startDate: Date,
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return v > this.startDate;
      },
      message: "The end date of discount should happen after it starts",
    },
  },
});
const physicalVarietySchema = new mongoose.Schema({
  colorVariety: colorSchema,
  sizeVariety: [String], // چون میخوام هم سایز آینه و فرش و ... داشته باشه  هم لباس گفتم رشته باشه ولی خب این باید اصلاح شه
  patternVariety: patternSchema,
  price: priceSchema,
  numberInStock: { ...positiveNum, required: true },
  discount: discountSchema,
  garantee: garanteeSchema,
  media: mediaSchema,
});

const productShortcutSchema = new mongoose.Schema({
  image: String,
  name: { ...stringSchema },
  price: Number, //age discount dash meqdar bade takhfif
});

const rateSchema = new mongoose.Schema({
  title: { ...stringSchema },
  sum: { ...positiveNum },
  counter: { ...positiveNum },
});

const commentSchema = new mongoose.Schema({
  username: {
    ...stringSchema,
    required: true,
  },
  value: {
    type: String,
    minlength: 2,
    trim: true,
    required: true,
  },
});

const qustionAnswerSchema = new mongoose.Schema({
  q: commentSchema,
  a: commentSchema,
});

const physicalProductSchema = new mongoose.Schema({
  productLimit: productLimit,
  // input: input,
  input: {
    type: String,
    trim: true,
    minlength: 5,
  },
  transportation: transportationSchema,
  brand: { ...stringSchema },
  numberInStock: { ...positiveNum, required: true },
  productStatus: { ...stringSchema }, //fek nakonm lazem abshe baseh
  garantee: {
    type: garanteeSchema,
    default: {},
  },
});

const virtualProductSchema = new mongoose.Schema({
  volume: volumeSchema,
  validityDuration: { ...positiveNum },
});
// #endregion

const productSchema = new mongoose.Schema({
  name: {
    ...stringSchema,
    required: true,
  },
  engName: { ...stringSchema },
  isFake: Boolean,
  category: {
    ...stringSchema,
    required: true,
  },
  media: mediaSchema, // when it doesnt have any value it is not shown in mongodb
  productType: {
    type: String,
    enum: ["physical", "virtual"],
    required: true,
  },
  features: [featureSchema],
  price: {
    type: priceSchema,
    required: true,
  },
  discount: discountSchema, // when it doesnt have any value it is not shown in mongodb
  //shak be sakhtar
  relatedProducts: [productShortcutSchema],
  similarProducts: [productShortcutSchema],
  rate: [rateSchema],
  comments: commentSchema, // when it doesnt have any value it is not shown in mongodb
  questionAnswer: qustionAnswerSchema, // when it doesnt have any value it is not shown in mongodb
  active: {
    type: Boolean,
    default: true,
  },
  advantages: [String],
  disadvantages: [String],
  intro: String, //div tag file url //no
  tags: [String],
  manufactureDate: Date, // when it doesnt have any value it is not shown in mongodb
  expirationDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return v > this.manufactureDate;
      },
      message: "The expiration date cannot be before manufacture date",
    },
  }, // when it doesnt have any value it is not shown in mongodb
  physicalProduct: physicalProductSchema,
  virtualProduct: [virtualProductSchema],
  //baraye in do mored bayad dar nemayesh vaqti etelaate mahsul ra mikha dnemyaesh bede bebine age this.producttype phiziki has ...
  physicalVariety: physicalVarietySchema,
  //virtualVariety://age file bashe faqat ye list string mishe k url address un file ha has
});

const Product = mongoose.model("Product", productSchema);

function validateProduct() {
  //همه ویژگیا ورودی گرفته نمیشه ببین چچیا هست اینحا اعتبار سنجی کن چون این سطح اول اعتبرا سنحجی هست
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    engName: Joi.string().min(3).max(50).required(),
  });
}

exports.validate = validateProduct;
exports.Product = Product;
