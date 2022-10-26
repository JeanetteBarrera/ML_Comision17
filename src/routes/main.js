// ************ Require's ************
const express = require('express');
const router = express.Router();
const db = require('../database/models')


// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 

router.get("/prueba", (req, res) => {
    
    /*
        findByPk -> recibe un parametro, primary key. segundo parametro condiciones de retorno de la consulta
        findOne -> retorna un resultado, segundo parametro condiciones de retorno de la consulta
        >findAll - retorna array de todos los resultados de la consulta,  un parametro condiciones

    */
    db.Subcategories.findAll({
        include: [
            {
                all: true
            }
        ]
    })
    .then(categories => {
        return res.send(categories)
    })
    .catch(err => res.send(err))
    
})

module.exports = router;
