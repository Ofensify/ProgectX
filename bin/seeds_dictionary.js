const mongoose = require("mongoose");
const { dbURL } = require("../config");
const Dictionary = require("../models/Dictionary");
mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to ${dbURL}`))
  .catch(e => console.log(e));

  const dictionary = {
    combination:"00000",
    phrase:"holi"
  };


  Dictionary.collection.drop();
  Dictionary.create(dictionary, (err, c) => {
    if (err) {
      throw err;
    }
    c.forEach(dictionary => {
      console.log(dictionary.combination);
    });
  });