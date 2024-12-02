const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/path", (req, res) => {
  res.send("Keep on heading down that path...");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});