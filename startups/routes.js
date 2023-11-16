const accesslevels = require("../routes/accessLevels");
const auth = require("../routes/auth");
const tags = require("../routes/tags");
const products = require("../routes/products");
const users = require("../routes/users");
const categories = require("../routes/categories");
const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/accesslevels", accesslevels);
  app.use("/api/users", users);
  app.use("/api/products", products);
  app.use("/api/auth", auth);
  app.use("/api/categories", categories);
  app.use("/api/tags", tags);
};
