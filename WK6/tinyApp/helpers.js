///// TINYAPP HELPER FUNCTIONS /////
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

const getUsersURLS = (id, database) => {
  let userURLS = {};
  for (const ob in database) {
    if (database[ob].userID === id) {
      userURLS[ob] = database[ob];
    }
  }
  return userURLS;
};

module.exports = { generateRandomString, userLookup, checkDatabase, getUsersURLS };