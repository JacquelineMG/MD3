const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};


const checkDatabase = id => {
  let check = null;
  for (const data in urlDatabase) {
    if (data === id) {
      check = data;
    }
  }
  return check;
};


