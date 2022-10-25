const {check,body} = require('express-validator');
const users = require('../data/users.json')

module.exports = [
    // Nombre
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

    // Apelliido 
    check('last_name').trim()
    .notEmpty().withMessage('Debe ingresar su apellido').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    check('password1')
    .notEmpty()
    .withMessage('Debe escribir su contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    check('password2')
    .notEmpty()
    .withMessage('Debe repetir su contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2').custom((value, {req}) => value !== req.body.password1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

]
