const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
//const users = require('../data/users.json')
const db = require('../database/models')

const controller = {
    register: (req, res) => {
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

            let { name, last_name, email, password1 } = req.body

            db.Users.create({
                name: name.trim(),
                last_name: last_name.trim(),
                email: email.trim(),
                password: bcrypt.hashSync(password1, 12),
                rol_id: 2,
                avatar: req.file ? req.file.filename : 'default-image-user.jpg'
            })
            .then(user => {
                return res.redirect('/users/login')
            }).catch(err => res.send(err))

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

        if (errors.isEmpty()) {

            const {email,remember} = req.body

            db.Users.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                req.session.user = {
                    id : user.id,
                    name : user.name,
                    lastname : user.last_name,
                    email : user.email,
                    image : user.avatar,
                    birthday_date : user.birthday_date ? user.birthday_date : null,
                    rol : user.rol_id
                }
                if(remember) {
                    res.cookie('mercadoLiebre_cookie', req.session.user, {maxAge: 1000 * 60 * 60 * 24})
                }
                console.log(req.session.user)
                return res.redirect('/users/profile')
            }).catch(err => res.send(err))

        } else {

            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        db.Users.findOne({
			where: {
				email: req.session.user.email
			}
		})
		.then(user => {
			res.render('users/profile', {
				user
			})
		}).catch(err => res.send(err))
    },
    updateProfile: (req, res) => {
        //return res.send(req.body)

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            const {name, last_name, birthday_date, phone } = req.body

            db.Users.findOne({
                id: +req.params.id
            })
            .then(user => {
                //`${user.birthday_date.getFullYear()}-${user.birthday_date.getMonth()}-${user.birthday_date.getDate()}`
                db.Users.update({
                    name: name.trim(),
                    last_name: last_name.trim(),
                    email: user.email,
                    password: user.password,
                    rol_id: user.rol_id,
                    phone: phone,
                    birthday_date: birthday_date,
                    avatar: req.file ? req.file.filename : user.avatar
                },{
                    where: {
                        id: +req.params.id
                    }
                })
                .then(data=> {
                    db.Users.findOne({
                        id: +req.params.id
                    })
                    .then(user => { 
                        
                        req.session.user = {
                            id : user.id,
                            name : user.name,
                            lastname : user.last_name,
                            email : user.email,
                            image : user.avatar,
                            birthday_date : user.birthday_date ? user.birthday_date : null,
                            rol : user.rol_id
                        }
                        if(req.cookies.mercadoLiebre_cookie){
                            res.cookie('mercadoLiebre_cookie','',{maxAge: -1});
                            res.cookie('mercadoLiebre_cookie', req.session.user, {maxAge: 1000 * 60 * 60 * 24})
                        }
                        req.session.save( (err) => {
                            req.session.reload((err) => {
                                return res.redirect('/users/profile')
            
                            });
                         });
            
                    })
                    
                }).catch(err => res.send(err))

            })
            .catch(err => res.send(err))

        } else {

        }
    }
};

module.exports = controller;