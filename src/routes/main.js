// ************ Require's ************
const express = require('express');
const router = express.Router();
const db = require('../database/models')


// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search); 

router.get("/prueba", (req, res) => {
    
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
