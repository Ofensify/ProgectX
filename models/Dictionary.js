const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const dictionarySchema = new Schema({
      combination: String,
      phrase: String
});
  
  const Dictionary = mongoose.model("Dictionary", dictionarySchema);
  
  module.exports = Dictionary;