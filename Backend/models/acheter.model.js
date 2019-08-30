const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AcheterSchema = new Schema({
  
  _id: Number,
  id1: Number,
  id2:Number,
  titre: { type: String},
  image: { type: String},
  nom: { type: String,required: true },
  prenom: { type: String,required: true },
  email: { type: String,required: true},
  phone: {type: String}
});

module.exports = User = mongoose.model("acheters", AcheterSchema);