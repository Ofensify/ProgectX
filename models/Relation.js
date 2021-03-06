const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User');
const Offense = require('../models/Offense');

const relationSchema = new Schema(
  {
    destination_Id: { type: String },
    offense_Id: { type: Schema.Types.ObjectId, ref: "Offense", required: true },
    creator_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true}
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  })

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;
