const mongoose = require("mongoose");
const { dbURL } = require("../config");
const Relation = require("../models/Relation");
mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to ${dbURL}`))
  .catch(e => console.log(e));

  const relations = [
    {
        destination_Id: "5a841dc60029020bff65b293",
        offense_Id: "5a841e428b1af20c54b9ed33",
        creator_Id: "5a841dc60029020bff65b294"
    },
    {
        destination_Id: "5a841dc60029020bff65b293",
        offense_Id: "5a841e428b1af20c54b9ed34",
        creator_Id: "5a841dc60029020bff65b294"
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
    mongoose.connection.close();
  });