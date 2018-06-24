const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080; // default port 8080
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

const shipFunctions = require("./shipFunctions.js");

app.use(nodeSassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));

app.use(express.static('public'));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




