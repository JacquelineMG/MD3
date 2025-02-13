const { Template } = require("ejs");
const express = require("express");
const app = express();
const PORT = 8080;
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const userOb = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
  "2nc2dz": {
    id: "2nc2dz",
    email: "test@email.com",
    password: "TopSecret"
  },
};

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

///// HELPER FUNCTIONS /////
const generateRandomString = () => {
  const alphanums = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let id = "";

  while (id.length < 6) {
    const random = Math.floor(Math.random() * (35 - 0 + 1) + 0);
    id += (alphanums[random]);
  }
  return id;
};

const userLookup = (email) => {
  const userIds = Object.keys(userOb);
  let userInfo = null;

  for (const id of userIds) {
    if (userOb[id].email === email) {
      userInfo = userOb[id];
    }
  }
  return userInfo;
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
    user: userOb,
    userId: req.cookies["user_id"],
    urls: urlDatabase
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    user: userOb,
    userId: req.cookies["user_id"],
  };
  res.render("urls_new.ejs", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const templateVars = {
    id: req.params.id,
    longURL: urlDatabase[req.params.id],
    user: userOb,
    userId: req.cookies["user_id"],
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
  const email = req.body.email;
  const userOb = userLookup(email);
  
  if (userOb === null) {
    res.status(403).send("Sorry! Wrong email or password.");
  } else if (userOb !== null && req.body.password !== userOb.password) {
    res.status(403).send("Sorry! Wrong email or password.");
  } else if (userOb !== null && req.body.password === userOb.password) {
    res.cookie("user_id", userOb.id);
    res.redirect("/urls");
  } else {
    res.status(400).send("Sorry! Bad request.");
  }

});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  const templateVars = {
    user: userOb,
    userId: req.cookies["user_id"],
    urls: urlDatabase
  };
  res.render("login", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: userOb,
    userId: req.cookies["user_id"],
    urls: urlDatabase
  };
  res.render("register", templateVars);
});


app.post("/register", (req, res) => {
  const randomID = generateRandomString();
  const email = req.body.email;

  if (userLookup(email) === null) {
    userOb[randomID] = {
      id: randomID,
      email: req.body.email,
      password: req.body.password,
    };

    res.cookie("user_id", randomID);
    res.redirect("/urls");

  } else {
    res.status(400).send("Sorry! That email is already registered.");
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});