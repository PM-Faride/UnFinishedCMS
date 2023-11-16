const express = require("express");
const winston = require("winston");

const app = express();
const port = process.env.PORT || 3000;

require("./startups/routes")(app);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shopify");

app.listen(port, () => {
  winston.info(`Server is listening on port: ${port}`);
});
