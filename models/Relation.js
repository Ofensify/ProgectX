const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User');
const Offense = require('../models/Offense');

const relationSchema = new Schema(
  {
    destination_Id: { type: Schema.Types.ObjectId, ref: "User", required: false },
    offense_Id: { type: Schema.Types.ObjectId, ref: "Offense", required: true },
    creator_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    rating: Number
  })

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;
