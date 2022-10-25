// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/multerUser')
const registerValidator = require('../validations/formRegister');
const loginValidator = require('../validations/formLogin');

router.get('/register', usersController.register); 
router.post('/register', upload.single('image'), registerValidator, usersController.processRegister); 
router.get('/login', usersController.login); 
router.post('/login',loginValidator, usersController.processLogin);
module.exports = router;
