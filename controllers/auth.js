const express = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuarios');
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async(req, res = express.response) => {

    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if(usuario) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con este correo'
            })
        }
        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ponerse en contacto con el administrador'
        })
    }

};

const loginUsuario = async(req, res = express.response) => {

    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }
        
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ponerse en contacto con el administrador'
        })
    }

};

const renovarUsuario = async(req, res = express.response) => {
    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};

module.exports = {
    loginUsuario, crearUsuario, renovarUsuario
};