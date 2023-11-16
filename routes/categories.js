const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

//to add, delete, update, read products categories
router.get("/", (req, res) => {
  // res.send("hello");
});
router.post("/", async (req, res) => {
  // const cat = new Category(req.body);
  // await cat.save();
  // res.send("donee");
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
