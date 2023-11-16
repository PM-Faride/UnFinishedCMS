const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

//to create, delete,update, read users with different access level
router.get("/", (req, res) => {});
router.get("/:id", (req, res) => {});
router.post("/", async (req, res) => {
  //   const user = new User(req.body);
  //   await user.save();
  //   res.send("ok");
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
