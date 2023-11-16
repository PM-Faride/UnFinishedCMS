const express = require("express");
const router = express.Router();
const IndividualAccessLevel = require("../models/individualAccessLevel");

router.get("/", (req, res) => {
    IndividualAccessLevel.insertMany({accessLevel:"read"}, {accessLevel:"read-tags"}, {accessLevel:"read"})
});
router.post("/", (req, res) => {});

module.exports = router;
