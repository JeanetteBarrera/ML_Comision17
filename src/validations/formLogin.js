const {check,body} = require('express-validator')
//const users = require('../data/users.json')
const bcrypt = require('bcryptjs')
const db = require('../database/models')

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

    body('password')
        .custom((value, {req}) => {
           return db.Users.findOne({
                where: {
                    email: req.body.email
                }
           })
           .then(user => {
               if(!bcrypt.compareSync(value, user.dataValues.password)){
                   return Promise.reject()
               }
           })
           .catch(() => {
               return Promise.reject("Email o contraseña incorrecta")
           })
        })
]

