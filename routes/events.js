const { Router } = require('express');
const { check } = require('express-validator');
const { esFecha } = require('../helpers/isDate');
const { obtenerEventos, crearEvento, actualizarEventos, borrarEventos } = require('../controllers/events');
const { validarCampos } = require('../middleware/validador');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router()

router.use(validarJWT)

router.get('/', obtenerEventos);
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(esFecha),
        check('end','Fecha de finalización es obligatoria').custom(esFecha),
        validarCampos
    ],
    crearEvento
);
router.put('/:id', actualizarEventos);
router.delete('/:id', borrarEventos);

module.exports = router;