const { Template } = require("ejs");
const express = require("express");
const app = express();
const PORT = 8080;
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

const generateRandomString = () => {
  const alphanums = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let id = "";

  while (id.length < 6) {
    const random = Math.floor(Math.random() * (35 - 0 + 1) + 0);
    id += (alphanums[random]);
  }
  return id;
};

app.get("/", (req, res) => {
  res.send("Howdy!");
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
    urls: urlDatabase
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
  };
  res.render("urls_new.ejs", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const templateVars = {
    id: req.params.id,
    longURL: urlDatabase[req.params.id],
    username: req.cookies["username"],
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const newID = generateRandomString();
  urlDatabase[newID] = req.body.longURL;

  res.redirect(`/urls/${newID}`);
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.newURL;
  res.redirect("/urls");
});

app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});