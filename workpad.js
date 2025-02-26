const generateRandomString = () => {
  const alphanums = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let id = "";

  while (id.length < 6) {
    const random = Math.floor(Math.random() * (35 - 0 + 1) + 0);
    id += (alphanums[random]);
  }
  return id;
};

const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    userID: "2nc2dz",
  },
  "9sm5xK": {
    longURL: "http://www.google.com",
    userID: "2nc2dz",
  },
};
console.log(urlDatabase);
const newID = generateRandomString();

urlDatabase[newID] = {longURL: "wiojiwj"};

console.log("----------------------------");
console.log(urlDatabase);

