const mongoose = require("mongoose");
const { dbURL } = require("../config");
const Relation = require("../models/Relation");
mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to ${dbURL}`))
  .catch(e => console.log(e));

  const relations = [
    {
        destination_Id: "5a82c0e43f2d5609260abe6e",
        offense_Id: "5a82c0e43f2d5609260abe70",
        creator_Id: "5a82c0e43f2d5609260abe6d"
    },
    {
        destination_Id: "5a82c0e43f2d5609260abe6d",
        offense_Id: "5a82c0e43f2d5609260abe71",
        creator_Id: "5a82c0e43f2d5609260abe6e"
    }
  ];

  Relation.collection.drop();
  Relation.create(relations, (err, c) => {
    if (err) {
      throw err;
    }
    c.forEach(relations => {
      console.log(relations.destination_Id);
    });
  });