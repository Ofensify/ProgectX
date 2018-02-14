const mongoose = require("mongoose");
const User = require("../models/User");
const Offense = require("../models/Offense");
const bcrypt = require("bcrypt");
const { dbURL } = require("../config");

mongoose
    .connect(dbURL)
    .then(() => console.log(`Connected to ${dbURL}`))
    .catch(e => console.log(e));

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

Offense.collection.drop();

Offense.create(offense, (err, o) => {
    if (err) {
      throw err;
    }
    o.forEach(offense => {
      console.log(offense.description);
    });
    mongoose.connection.close();
  });
