const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const users = require('../data/users.json')

const controller = {
	register: (req, res) => {
        console.log(users)
		res.render('users/register')
	},
	processRegister: (req, res) => {
		//return res.send(req.body)
 
		let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {

			return res.send('Paso las validaciones');

        } else {
            console.log(req.body)
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
	},
	login: (req, res) => {
		// Do the magic
        res.render('users/login')
	},
	processLogin: (req, res) => {

		let errors = validationResult(req)

        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {

			return res.send('Paso las validaciones');

        } else {
        
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
	},
	profile: (req, res) => {

	},
	editProfile : (req, res) => {

	},
	updateProfile : (req, res) => {
		
	}
};

module.exports = controller;