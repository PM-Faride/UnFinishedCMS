const express = require("express");
const router = express.Router();
const { Tag } = require("../models/tag");

//to add, remove, edit, read tags from the database

router.get("/", (req, res) => {});
router.post("/", async (req, res) => {
  //   const tag = new Tag(req.body);
  //   await tag.save();
  //   res.send("donne");
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;
