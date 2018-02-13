const mongoose = require("mongoose");
const User = require("../models/User");
const Offense = require("../models/Offense");
const bcrypt = require("bcrypt");
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to ${dbURL}`))
  .catch(e => console.log(e));

const users = [
  {
    username: "alberto.soler",
    password: "$2a$10$HVYXIIinGqwRg2uSNCAhtOBd9T9ZqKGra01LFc/6fr4phpMcV7aq6",
    email: "albertosolermatas@gmail.com",
    facebookID: ""
  },
  {
    username: "adrian.chacon",
    password: "$2a$10$HVYXIIinGqwRg2uSNCAhtOBd9T9ZqKGra01LFc/6fr4phpMcV7aq6",
    email: "adrianchacon@gmail.com",
    facebookID: ""
  },
  {
    username: "adrian.lacon",
    password: "$2a$10$HVYXIIinGqwRg2uSNCAhtOBd9T9ZqKGra01LFc/6fr4phpMcV7aq6",
    email: "adrianlacon@gmail.com",
    facebookID: ""
  }
];

const offense = [
  {
    description: "ofensa1",
    img: "img-1"
  },
  {
    description: "ofensa2",
    img: "img-2"
  }
];

User.collection.drop();
Offense.collection.drop();

User.create(users, (err, c) => {
  if (err) {
    throw err;
  }
  c.forEach(user => {
    console.log(user.username);
  });
});

Offense.create(offense, (err, o) => {
  if (err) {
    throw err;
  }
  o.forEach(offense => {
    console.log(offense.description);
  });
  mongoose.connection.close();
});
