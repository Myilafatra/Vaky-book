const Acheter = require('../../models/acheter.model');
const Atelier = require('../../models/Atelier.model')

const fs = require('fs')

exports.createPerso = (req, res) => {
    Acheter.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            Atelier.findById(req.params._id).then(use => {
            const achat = new Acheter({
                _id: id,
                id1: use._id,
                id2:use.id2,
                image:use.image,
                titre:use.titre,
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                phone: req.body.phone
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
            achat.save()
                .then(user => {
                    res.json(user)
                    });
                });
        })
    
};


exports.cacherAtl = (req, res) =>{
    Acheter.findOneAndUpdate({_id:req.params._id}, { 
        visib:false
    
    },{new:true}).then(upd=>res.send(upd)
    )
}

exports.affichAtl = (req, res) =>{
    Acheter.findOneAndUpdate({_id:req.params._id}, {
           
        visib:true
    
    },{new:true}).then(upd=>res.send(upd)
    )
}

//Get un par un image
exports.findOneArticle =(req, res) =>{ 
    try { 
        let picture = fs.readFileSync('./controllers/atelier/public/'+req.params.image)
        console.log('params: ',req.params.image);
        res.write(picture) 
        res.end() 
    } 
    catch (e) { console.log("envoie erroné: ", e); } }

exports.findAllPerso = (req, res) => {
    Acheter.find()
        .then(atel => {
            res.send(atel);
        }).catch(err => {
            res.status(500).send(atel => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
};


