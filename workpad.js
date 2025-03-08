const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    userID: "2nc2dz",
  },
  "9sm5xK": {
    longURL: "http://www.google.com",
    userID: "2nc2dz",
  },
  d8s45f: {
    longURL: "https://example.com/",
    userID: "trialID",
  },
  "9s5xK": {
    longURL: "http://www.google.com",
    userID: "2nc2dz",
  },
  "9smm5xK": {
    longURL: "http://www.google.com",
    userID: "2nc2dz",
  },
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

getUsersURLS("2nc2dz");

