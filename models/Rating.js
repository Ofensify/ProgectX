const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TYPES = require('./rating-types');
const User = require('../models/User');
const Offense = require('../models/Offense');

const ratingSchema = new Schema({
  offense_Id: { type: Schema.Types.ObjectId, ref: "Offense", required: true },
  user_Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: String, enum: TYPES, required: true },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;