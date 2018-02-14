const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('../models/User');

const offenseSchema = new Schema({
  description: String,
  img: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Offense = mongoose.model("Offense", offenseSchema);

module.exports = Offense;