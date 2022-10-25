const {check,body} = require('express-validator')
const users = require('../data/users.json')
const bcrypt = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('password').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('email')
    .custom((value,{req}) =>{
        let user = users.find(user => user.email === value && bcrypt.compareSync(req.body.password, user.password))
        if (user) {
            return true
        }else{
            return false
        }
    })
    .withMessage('El email o la contraseña no coincide')
]

