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

console.log(userLookup("test@email.com"));
console.log(userLookup("user2@examle.com"));

