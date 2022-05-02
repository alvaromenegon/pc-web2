const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Animal = Schema({
    nome: { type: String, required: true },
    nomeDoProprietario: { type: String, required: true },
    endereco: { type: String, required: true },
    tipo: { type: String, required: true },
    raca: { type: String, required: true },
    fotoAnimal: {type:String, required: true}
});

module.exports = mongoose.model("Animal", Animal)