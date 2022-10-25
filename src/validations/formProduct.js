const { check, body } = require('express-validator')

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio').bail()
    .isLength({ min: 4, max: 50 })
    .withMessage('El nombre tiene que tener entre 4 y 50 caracteres'),

    check('category')
    .notEmpty()
    .withMessage('Debes elegir una categoría'),

    check('price')
    .notEmpty()
    .withMessage('Debes ingresar un precio').bail()
    .isNumeric()
    .withMessage('Sólo números'),

    body('price')
    .custom(value => {

        if(value <= 0) {
            return false
        }
        return true
        
    }).withMessage('Debes ingresar un precio'),

    check('discount')
    .isNumeric()
    .withMessage('Sólo números'),

    check('description')
    .isLength({ max: 5000 })
    .withMessage('El nombre tiene que tener hasta 5000 caracteres')
]