const Particulier = require('../../models/particulier.model');
const Atelier = require('../../models/Atelier.model')

exports.createPart = (req, res) => {
    Particulier.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            Atelier.findById(req.params._id).then(use => {
                const particulier = new Particulier({
                    _id: id,
                    id1: use._id,
                    id2:use.id2,
                    image:use.image,
                    titre:use.titre,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    phone: req.body.phone,
                    prêt: req.body.prêt,
                    remise: req.body.remise,
                    adresse: req.body.adresse
                });
                Atelier.findByIdAndUpdate(use._id, {
                    _id: use.id,
                    id2: use.id2,
                    idUser: use.idUser,
                    titre: use.titre,
                    duree: use.duree,
                    debut: use.debut,
                    place: use.place,
                    description: use.description,
                    date: use.date,
                    prix: use.prix,
                    image: use.image
                }).then(upd => console.log(upd))
                particulier.save()
                    .then(user => {
                        res.json(user)
                    });
            });
        });
}

//Get un par un image
exports.findOneArticle = (req, res) => {
    try {
        let picture = fs.readFileSync('./controllers/atelier/public/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}


exports.afficheParticulier = (req, res) => {
    Atelier.findById(req.params._id)
        .then(atel => {

            const mpindrana= new Particulier({
                id1:atel._id,
                titre:atel.titre,
                image:atel.image,
                nom:req.body.nom,
                prenom:req.body.prenom,
                email:req.body.email,
                phone:req.body.phone,
                adresse:req.body.adresse,
                prêt:req.body.prêt,
                remise:req.body.remise
            })
            Particulier.findOne({id1:atel._id}).then(use=>{
                if(use){
                    res.send("non disponible")
                }
                else{
                    mpindrana.save().then(yyy=>res.send(yyy))
                }
            }) 
        })  
};

exports.findAllArticle = (req, res) => {
    Atelier.find()
        .then(atel => {
            res.send(atel);
        }).catch(err => {
            res.status(500).send(atel => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};
exports.findAllParticulier = (req, res) => {
   Particulier.find()
        .then(atel => {
            res.send(atel);
        }).catch(err => {
            res.status(500).send(atel => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};