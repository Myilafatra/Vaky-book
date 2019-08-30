const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ParticulierSchema = new Schema({
  
  _id: Number,
  id1: Number,
  id2:Number,
  titre: { type: String},
  image: { type: String},
  nom: {
    type: String,required: true
  },
  livre:String,
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  prêt: {
    type: String
  },
  remise: {
    type: String
  },
  adresse: {
    type: String
  }
});

module.exports = User = mongoose.model("particuliers", ParticulierSchema);