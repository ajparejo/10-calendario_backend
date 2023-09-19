const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validador');
const { loginUsuario, crearUsuario, renovarUsuario } = require('../controllers/auth');
const {validarJWT} = require('../middleware/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        check( 'name', 'el nombre es obligatorio').not().isEmpty(),
        check( 'email', 'el e-mail es obligatorio').isEmail(),
        check( 'password', 'la clave debe ser de mas de 5 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check( 'email', 'el e-mail es obligatorio').isEmail(),
        check( 'password', 'la clave debe ser de mas de 5 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, renovarUsuario);

module.exports = router;