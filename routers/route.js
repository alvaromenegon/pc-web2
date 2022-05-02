const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerAnimal = require('../controllers/controllerAnimal');
const route = express.Router();
const multer = require('multer');

module.exports = route;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        if (req.body.login!=undefined){
            req.imageName = req.body.login + req.body.senha + '.png';
            cb(null, req.imageName)
        }
        else {
            req.imageName = req.body.nome + req.body.tipo + '.png';
            cb(null, req.imageName)
        }
    },
})
const upload = multer({ storage })

//Home
route.get("/home", function (req, res) { res.render('home') });
route.get("/logout", controllerUsuario.getLogout);

//Controller Usuario
//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
route.post("/recuperarSenha", controllerUsuario.postRecuperarSenha);
//Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate",upload.single('avatar'), controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioEdit/:id", controllerUsuario.getEdit);
route.post("/usuarioEdit", upload.single('avatar'), controllerUsuario.postEdit);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

//Controller Animal
route.get("/cadastroAnimal", controllerAnimal.getCreate);
route.post("/cadastroAnimal", upload.single('fotoAnimal'),controllerAnimal.postCreate);
route.get("/animalList", controllerAnimal.getListAnimal);
route.get("/animalEdit/:id", controllerAnimal.getEdit);
route.post("/animalEdit",upload.single('fotoAnimal'), controllerAnimal.postEdit);
route.get("/animalDelete/:id", controllerAnimal.getDelete);  