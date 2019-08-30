const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    _id: { type: Number},
    id2: { type: Number },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    date: { 
        type: String,
        required: true},
    debut: { type: String, required: true },
    duree: { type: String, required: true },
    idUser: Number,
    image: { type: String, required: true },
    prix: { type: Number, required: true },
    place:{ type: String, required: true },
    visib:Boolean
}, {
        timestamps: true
    });

module.exports = Atelier = mongoose.model("Ateliers", ArticleSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);