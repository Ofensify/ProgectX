const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const dictionarySchema = new Schema({
      combination: String,
      text0: String,
      text1: String
});
  
  const Dictionary = mongoose.model("Dictionary", dictionarySchema);
  
  module.exports = Dictionary;