const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080; // default port 8080

const shipFunctions = require("./shipFunctions.js");

app.use(express.static("public"));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




