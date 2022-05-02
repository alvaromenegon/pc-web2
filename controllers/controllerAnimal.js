const Animal = require('../models/models_nosql/animal');

module.exports = {

    async getCreate(req, res) {
        res.render('animal/cadastroAnimal');
    },
    async postCreate(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const fotoAnimal = req.imageName;
        const animal = new Animal({ nome, nomeDoProprietario, endereco, tipo, raca, fotoAnimal });
        await animal.save();
        res.redirect('/animalList');
    },
    async getListAnimal(req, res) {
        Animal.find().then((animals) => {
            res.render('animal/animalList', { animals: animals.map(animals => animals.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Animal.findOne({ _id: req.params.id }).then((animals) => {
            res.render('animal/animalEdit', { animals: animals.toJSON() });
        });
    },
    async postEdit(req, res) {
        const { nome, nomeDoProprietario, endereco, tipo, raca } = req.body;
        const fotoAnimal = req.imageName;
        await Animal.findOneAndUpdate({ _id: req.body.id }, { nome, nomeDoProprietario, endereco, tipo, raca,fotoAnimal });
        res.redirect('/animalList');
    },
    async getDelete(req, res) {
        await Animal.findOneAndRemove({ _id: req.params.id });
        res.redirect('/animalList');
    }
}
