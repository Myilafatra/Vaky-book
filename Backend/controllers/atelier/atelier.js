const Atelier = require('../../models/Atelier.model');
// const UserCuisiner = require('../../models/User')
const fs = require('fs')

//Create new Article
exports.create = (req, res) => {

        Atelier.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }
            let imageFile = req.files.image;
            let nomImage = id
            res.setHeader('Content-Type', 'text/plain');
        
            imageFile.mv(`${__dirname}/public/${nomImage}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                    console.log(err);
                }
            });
            const atelier = new Atelier({
                _id: id,
                idUser:req.body.idUser,
                titre: req.body.titre,
                prix: req.body.prix,
                date: req.body.date,
                description: req.body.description,
                image:nomImage + '.jpg',
                duree: req.body.duree,
                debut: req.body.debut,
                place: req.body.place,
                visib:true
            });
            atelier.save()
                .then(() => {
                    Atelier.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    console.log(err);
                    
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the profil."
                    });
                });
        })
    
};

exports.cacherAtl = (req, res) =>{
    Atelier.findOneAndUpdate({_id:req.params._id}, { 
        visib:false
    
    },{new:true}).then(upd=>res.send(upd)
    )
}

exports.affichAtl = (req, res) =>{
    Atelier.findOneAndUpdate({_id:req.params._id}, {
           
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

// Find a single article with a articleID
exports.findOne = (req, res) => {
    Atelier.find({idUser:req.params.idUser})
        .then(profilchoix => {
            //console.log(unprofil)
            if (!profilchoix) {
                return res.status(404).send({
                    message: "profil not found with id" + req.params.idUser
                });
            }
            else {
                res.send(profilchoix);
            }


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "profil not found with id " + req.params.idUser
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving profil with id " + req.params.idUser
            });
        });
};

//update

exports.update = (req, res) => {
    // Validate Request()
    console.log('ity ny requete'+req.body.nom)
    if(!req.body.titre || !req.body.description) {
        return res.status(400).send({
            message: "eleve content can not be empty"
        });
    }
    console.log('ity n params'+req.params.profilId)
    let imageFile = req.files.image;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = req.params.profilId
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('tonga eto v nw')
    // Find and update eleve with the request body
    Atelier.findByIdAndUpdate(req.params.profilId, {
        idUser:req.body.idUser,
        titre: req.body.titre,
        auteur: req.body.auteur,
        genre: req.body.genre,
        editeur: req.body.editeur,
        resume: req.body.resume,
        parution: req.body.parution,
        prix: req.body.prix,
        image:nomImage + '.jpg',
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.profilId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.profilId
        });
    });
};