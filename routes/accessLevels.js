const express = require("express");
const router = express.Router();
const { AccessLevel } = require("../models/accessLevel");

router.get("/", async (req, res) => {
  // const result = await AccessLevel.find();
  // res.send(result);
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  // const accessLevel = new AccessLevel(req.body);
  // await accessLevel.save();
  // res.send("done");
});

router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
