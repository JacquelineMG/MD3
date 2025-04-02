// eslint-disable-next-line no-unused-vars
const { Template } = require("ejs");
const express = require("express");
const app = express();
const PORT = 8080;
// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(cookieSession({
  name: "session",
  keys: ["keys0"],
  maxAge: 24 * 60 * 60 * 1000
}));


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
  trialID: {
    id: "trialID",
    email: "email@email.com",
    password: "123"
  },
};

const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    userID: "2nc2dz",
  },
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

const userLookup = (email, database) => {
  const userIds = Object.keys(database);
  let userInfo = null;

  for (const id of userIds) {
    if (database[id].email === email) {
      userInfo = database[id];
    }
  }
  return userInfo;
};

const checkDatabase = (id, database) => {
  let check = null;
  for (const data in database) {
    if (data === id) {
      check = data;
    }
  }
  return check;
};

const getUsersURLS = ID => {
  let userURLS = {};
  for (const ob in urlDatabase) {
    if (urlDatabase[ob].userID === ID) {
      userURLS[ob] = urlDatabase[ob];
    }
  }
  return userURLS;
};

/////////////////////////////////////////////////////////

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
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    const userURLS = getUsersURLS(req.session.userId);
    const templateVars = {
      user: userOb,
      userId: req.session.userId,
      urls: userURLS
    };
    res.render("urls_index", templateVars);
  }
});

app.get("/urls/new", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    const templateVars = {
      user: userOb,
      userId: req.session.userId,
    };
    res.render("urls_new.ejs", templateVars);
  }
});

app.get("/urls/:id", (req, res) => {
  const userURLS = getUsersURLS(req.session.userId);
  const id = req.params.id;

  if (!req.session.userId) {
    res.redirect("/login");
  } else if (checkDatabase(id, userURLS) === null) {
    res.status(404).send("Sorry! Can't find that tiny URL.");
  } else {
    const templateVars = {
      id: req.params.id,
      longURL: urlDatabase[req.params.id].longURL,
      user: userOb,
      userId: req.session.userId,
    };
    res.render("urls_show", templateVars);
  }
});

app.post("/urls", (req, res) => {
  if (!req.session.userId) {
    res.status(400).send("Sorry! You need to login first.");
  } else {
    const newID = generateRandomString();
    urlDatabase[newID] = {
      longURL: req.body.longURL,
      userID: req.session.userId,
    };
    res.redirect(`/urls/${newID}`);
  }
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id].longURL;
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  const userURLS = getUsersURLS(req.session.userId);
  const id = req.params.id;

  if (!req.session.userId) {
    res.status(403).send("Sorry! You can't delete that");
  } else if (checkDatabase(id, userURLS) === null) {
    res.status(403).send("Sorry! You can't delete that");
  } else {
    delete urlDatabase[req.params.id];
    res.redirect("/urls");
  }
});

app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
  const longURL = req.body.newURL;
  const userID = req.session.userId;

  if (!userID) {
    res.status(401).send("Please login first!");
  } else if (userID !== urlDatabase[id].userID) {
    res.status(401).send("Sorry, that's not your URL");
  } else {
    urlDatabase[id] = {
      longURL,
      userID
    };
  }
  res.redirect("/urls");
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const userInfo = userLookup(email, userOb);
  const password = req.body.password;
  let passwordCheck = false;

  if (userInfo === null) {
    res.status(403).send("Sorry! Wrong email or password.");
  } else {
    if (userInfo) {
      passwordCheck = bcrypt.compareSync(password, userInfo.password);
    }
    if (passwordCheck === false) {
      res.status(403).send("Sorry! Wrong email or password.");
    } else if (passwordCheck === true) {
      req.session.userId = userInfo.id;
      res.redirect("/urls");
    } else {
      res.status(400).send("Sorry! Bad request.");
    }
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  if (!req.session.userId) {
    const templateVars = {
      user: userOb,
      userId: req.session.userId,
      urls: urlDatabase
    };
    res.render("login", templateVars);
  } else {
    res.redirect("/urls");
  }
});

app.get("/register", (req, res) => {
  if (!req.session.userId) {
    const templateVars = {
      user: userOb,
      userId: req.session.userId,
      urls: urlDatabase
    };
    res.render("register", templateVars);
  } else {
    res.redirect("/urls");
  }
});

app.post("/register", (req, res) => {
  const randomID = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (userLookup(email, userOb) === null) {
    userOb[randomID] = {
      id: randomID,
      email: req.body.email,
      password: hashedPassword,
    };
    req.session.userId = randomID;
    res.redirect("/urls");
  } else {
    res.status(400).send("Sorry! That email is already registered.");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});