const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

//to handle any request to the endpoints of /api/products and api/products/:id
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
router.get("/:id", (req, res) => {});
router.post("/", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.send("yepp");
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
