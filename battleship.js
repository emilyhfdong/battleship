const express = require("express");
const app = express();
const PORT = 8080; // default port 8080


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/", function (req, res) {
  res.sendFile('battleship.html', { root: __dirname });
});

