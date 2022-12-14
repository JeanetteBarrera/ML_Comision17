const {check,body} = require('express-validator');
//const users = require('../data/users.json')
const db = require('../database/models')

module.exports = [
    // Nombre
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres')
    .matches(/^[a-zA-Z\sñáéíóúü ]*$/)
    .withMessage("El nombre no debe contener datos numericos"),


    // Apelliido 
    check('last_name').trim()
    .notEmpty().withMessage('Debe ingresar su apellido').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres')
    .matches(/^[a-zA-Z\sñáéíóúü ]*$/)
    .withMessage("El nombre no debe contener datos numericos"),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    body('email').custom((value) => {
        return db.Users.findOne({
            where: {
                email: value,
            }
        })
        .then((user) => {
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),


    check('password1')
    .notEmpty()
    .withMessage('Debe escribir su contraseña').bail()
    /*.isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres').bail()*/
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(.{6,12})$/)
    .withMessage('La contraseña debe contener al menos un número, una mayúscula, una minúscula y tener entre 6 y 12 caracteres'),







    check('password2')
    .notEmpty()
    .withMessage('Debe repetir su contraseña')
    /*.isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres')*/
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(.{6,12})$/)
    .withMessage('La contraseña debe contener al menos un número, una mayúscula, una minúscula y tener entre 6 y 12 caracteres'),


    body('password2').custom((value, {req}) => value !== req.body.password1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

]