const Joi = require("joi");
const mongoose = require("mongoose");
const stringSchema = require("../defSchema/string");

const accessLevelSchema = new mongoose.Schema({
  title: {
    ...stringSchema,
    unique: true,
    required: true,
    // با دستور زیر میشه گفت که فقط حروف باشه نمیدونم لازمه یا نه فعلا کامنت کردم
    // match: /^[A-Za-z]+$/,
  },
  levels: {
    // هم اینجا هم د رjoi گفتم باید رشته باشیه ولی عدد میدم قبول میکنه بعد خودش رشته میکنه
    // برای joi را حذف کردم
    //age bekham mishe mese bala nevesh
    //vali dar joi ro k chun hanuz validate jayi nadaram test nakardam
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
    },
    // we need to be sure the selected value for the access is in the levels that we defined, though I doubt it
    //can happen in our case since the user select from what we show unless we show wrong
    // validate:{
    //   validator:function(v){
    //     v.every((element)=> return accesslevelArray.indexOf(element))
    //   }
    // }
  },
});

const AccessLevel = mongoose.model("AccessLevel", accessLevelSchema);

function validateAccessLevel() {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    levels: Joi.array().items(Joi.string()).required(),
  });
  return schema.validate();
}

exports.validate = validateAccessLevel;
exports.AccessLevel = AccessLevel;
