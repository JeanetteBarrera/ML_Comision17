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

    check('subcategory')
    .notEmpty()
    .withMessage('Debes elegir una subcategoria'),

    check('mark')
    .notEmpty()
    .withMessage('Debes elegir una marca'),

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
        
    }).withMessage('Debes ingresar un precio valido'),

    check('discount')
    .isNumeric()
    .withMessage('Sólo números'),

    body('discount')
    .custom(value => {

        if(value < 0 || value > 70 ){
            return false
        }
        return true
        
    }).withMessage('Debes ingresar un descuento valido entre 0 - 70 '),


    check('description')
    .notEmpty()
    .withMessage('El campo descripción es obligatorio').bail()
    .isLength({ min: 10 ,max: 5000 })
    .withMessage('La descripción tiene que tener como minimo 10 hasta 5000 caracteres')
]