"use strict";
const User = require("../models/user");
const service = require('../services/index')
// Registro
function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
    })
    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el user: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
}
function signIn(req, res) {
    User.find({email: req.body.email}, (err, user)=>{
        // si hubo error
        if(err) return res.status(500).send({message: err})
        // si no encontro el emaill
        if(!user) return res.status(404).send({message: `No existe el usuario: ${user}`})

        // si lo encontro
        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken('user')
        })
    })
}
module.exports = {
  signIn,
  signUp
};
