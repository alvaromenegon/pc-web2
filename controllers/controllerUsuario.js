const Usuario = require('../models/models_nosql/usuario');

module.exports = {
    async getLogin(req,res){
        res.render('usuario/login',{layout: 'noMenu.handlebars'});
    },
    async getLogout(req,res){
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req,res){
       Usuario.find({login: req.body.login, senha: req.body.senha}).then(usuarios =>{
            if (usuarios.length > 0){
                req.session.login = req.body.login;
                res.redirect('/home');
            }
            else
                res.redirect('/');
        });

    },
    async getRecuperarSenha(req, res) {
        Usuario.find({login: req.params.login}).then(usuarios => {
            if (usuarios.length > 0){
                res.render('usuario/recuperarSenha', {layout: 'noMenu.handlebars', login:req.params.login, pergunta:usuarios[0].pergunta_secreta});
            }
            else{
                res.redirect('/');
            }
        });
    },
    async postRecuperarSenha(req, res) {
        Usuario.find({login: req.body.login,resposta_pergunta:req.body.resposta}).then (usuarios => {
            if (usuarios.length > 0){
                res.render('usuario/senhaRecuperada', {layout: 'noMenu.handlebars', senha:usuarios[0].senha});
            }
            else{
                res.redirect('/');
            }
        });
    },
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },
    async postCreate(req, res) {
        const { login, senha, pergunta_secreta, resposta_pergunta} = req.body;
        console.log(req);
        var avatar;
        if (req.imageName == undefined){
            avatar = '../images/avatarPadrao.png';
        } 
        else{
            avatar = req.imageName;
        }
        
        const usuario = new Usuario({ login, senha, pergunta_secreta, resposta_pergunta, avatar});
        await usuario.save();
        res.redirect('/usuarioList');
    },
    async getList(req, res) {
        Usuario.find().then((usuarios) => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(usuarios => usuarios.toJSON()) });
        });
    },
    async getEdit(req, res) {
        await Usuario.findOne({ _id: req.params.id }).then((usuarios) => {
            res.render('usuario/usuarioEdit', { usuarios: usuarios.toJSON() });
        });
    },
    async postEdit(req, res) {
        const {login,senha,pergunta_secreta,resposta_pergunta} = req.body;
        const avatar = req.imageName;
        await Usuario.findOneAndUpdate({ _id: req.body.id }, {login,senha,pergunta_secreta,resposta_pergunta,avatar});
        res.redirect('/usuarioList');
    },
    async getDelete(req, res) {
        await Usuario.findOneAndRemove({ _id: req.params.id });
        res.redirect('/usuarioList');
    }
}   