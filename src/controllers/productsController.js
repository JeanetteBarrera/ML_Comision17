const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const products = require('../data/productsDataBase.json');
//const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dato, null, 4), 'utf-8')
const db = require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		res.render('products/products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const id = +req.params.id;
		console.log("Este es el ID")
		console.log(id)
		let product = products.find(product => product.id === id);

		console.log(product)
		return res.render('products/detail', {
			product,
			toThousand
		})


	},

	// Create - Form to create
	create: (req, res) => {
		/*
			1. Traemos todos los datos necesarios para renderizar el formulario de carga
			
		*/
		let categories = db.Categories.findAll()
		let subcategories = db.Subcategories.findAll()
		let marks = db.Marks.findAll()

		/*
			findOne -> 
			findByPk -> PK 
			findAll -> 

			create -> create -> objeto create
			bulkCreate -> 

			update -> retorna un numero
			destroy -> 
		
		*/

		Promise.all([categories, subcategories, marks])
			.then(([categories, subcategories, marks]) => {

				return res.render('admin/products/product-create-form', {
					categories,
					subcategories,
					marks
				})
			}).catch(err => res.send(err))
	},

	// Create -  Method to store
	store: (req, res) => {
		//return res.send(req.body)
		/*
			En caso de que no haya errores:
				1. verificamos que nos esten llegando los datos y como nos estan llegando los datos
				2. desestructuramos req.body
				3. crear el producto utilizando el metodo create de sequelize(tener muy presente verificar los nombre de las columnas a las que debemos pasarle los datos)
				4. si la promesa se resuelve sin errores, redireccionamos al usuario
				5. si la promesa tiene errores, no olvidar el .catch para poder ubicar donde ocurrio

			En caso de haber errores en la carga del formulario:

				1. En caso de que el usuario haya cargado una imagen, debemos eliminarla del servidor, ya que el producto no se creo.
				2. Traemos todos los datos necesarios para renderizar el formulario de carga nuevamente
				3. Pasamos los errores y old
		*/
		let errors = validationResult(req)

		if (req.fileValidationError) {
			let imagen = {
				param: 'imagen',
				msg: req.fileValidationError,
			}
			errors.errors.push(imagen)
		}
		if (errors.isEmpty()) {
			let { name, mark, subcategory, price, discount, stock, description } = req.body;

			db.Products.create({
				name: name.trim(),
				price: +price,
				discount: +discount,
				description: description.trim(),
				stock: +stock,
				status: 1,
				image: req.file ? req.file.filename : 'default-image.png',
				subcategory_id: +subcategory,
				mark_id: +mark
			})
			.then(product => {
				res.redirect('/')
			}).catch(err => res.send(err))

		} else {

			console.log("Ocurrieron errores")

			if(req.file) {
				if ((fs.existsSync("./public/images/products/", req.file.filename)) ){
					fs.unlinkSync(`./public/images/products/${req.file.filename}`)
				}
			}

			let categories = db.Categories.findAll()
			let subcategories = db.Subcategories.findAll()
			let marks = db.Marks.findAll()

			Promise.all([categories, subcategories, marks])
				.then(([categories, subcategories, marks]) => {

					return res.render('admin/products/product-create-form', {
						categories,
						subcategories,
						marks,
						errors: errors.mapped(),
						old: req.body
					})
				}).catch(err => res.send(err))

		}
	},

	// Update - Form to edit
	edit: (req, res) => {

		/*
			1. Traemos todos los datos necesarios para renderizar el formulario de edición
			
		*/

		let categories = db.Categories.findAll()
		let subcategories = db.Subcategories.findAll()
		let marks = db.Marks.findAll()
		let product = db.Products.findByPk(+req.params.id, {
			include: [{
				all: true
			}]
		})

		Promise.all([categories, subcategories, marks, product])
			.then(([categories, subcategories, marks, product]) => {
				if (product) {

					return res.render('admin/products/product-edit-form', {
						categories,
						subcategories,
						marks,
						productToEdit: product
					})
				} else {
					return res.send("No se encuentró el producto")
				}
			})
			.catch(err => res.send(err))
	},
	// Update - Method to update
	update: (req, res) => {
		
		/*
			En caso de que no haya errores:
				1. verificamos que nos esten llegando los datos y como nos estan llegando los datos
				2. desestructuramos req.body
				3. en caso de que el usuario quiera mantener la imagen anteriormente guardada, debemos traernos los datos antes de actualizarlos.
				4. una vez resulta la promesa, verificamos y luego utilizamos el metodo update de sequelize para actualizar los datos, este recibe dos parametros
					- el primero es un objeto con todos los datos a actualizar
					- el segundo es donde definimos con un where, que producto debemos actualizar
				5. si la promesa se resuelve sin errores, redireccionamos al usuario, pero antes en caso de que el usuario haya cargado una nueva imagen, debemos eliminar la anterior del servidor.
				6. si la promesa tiene errores, no olvidar el .catch para poder ubicar donde ocurrio
				

			En caso de haber errores en la carga del formulario:

				1. En caso de que el usuario haya cargado una imagen, debemos eliminarla del servidor, ya que el producto no se actualizo.
				2. Traemos todos los datos necesarios para renderizar el formulario edición
				3. Pasamos los errores y old

		*/

		let errors = validationResult(req)

		if (req.fileValidationError) {
			let imagen = {
				param: 'imagen',
				msg: req.fileValidationError,
			}
			errors.errors.push(imagen)
		}

		if (errors.isEmpty()) {

			let { name, mark, subcategory, price, discount, stock, description } = req.body;

			db.Products.findOne({
				where: {
					id: +req.params.id
				}
			})
				.then(product => {

					db.Products.update({
						name: name.trim(),
						price: +price,
						discount: +discount,
						description: description.trim(),
						stock: +stock,
						status: 1,
						image: req.file ? req.file.filename : product.image,
						subcategory_id: +subcategory,
						mark_id: +mark
					}, {
						where: {
							id: +req.params.id
						}
					})
						.then(data => {
							if (req.file) {
								if ((fs.existsSync("./public/images/products/", product.image)) && product.image !== 'default-image.png'){
									fs.unlinkSync(`./public/images/products/${product.image}`)
								}
							}
							return res.redirect('/')
						})
						.catch(err => res.send(err))
				})
				.catch(err => res.send(err))


		} else {

			if(req.file) {
				if ((fs.existsSync("./public/images/products/", req.file.filename)) ){
					fs.unlinkSync(`./public/images/products/${req.file.filename}`)
				}
			}
			let categories = db.Categories.findAll()
			let subcategories = db.Subcategories.findAll()
			let marks = db.Marks.findAll()
			let product = db.Products.findByPk(+req.params.id, {
				include: [{
					all: true
				}]
			})

			Promise.all([categories, subcategories, marks, product])
				.then(([categories, subcategories, marks, product]) => {
					if (product) {

						return res.render('admin/products/product-edit-form', {
							categories,
							subcategories,
							marks,
							productToEdit: product,
							errors: errors.mapped(),
							old: req.body
						})
					} else {
						return res.send("No se encuentró el producto")
					}
				})
				.catch(err => res.send(err))
		}
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		db.Products.findOne({
            where : {
                id : +req.params.id
            }
        })
        .then(product => {
            
            if ((fs.existsSync("./public/images/products/", product.image)) && product.image !== 'default-image.png'){
				fs.unlinkSync(`./public/images/products/${product.image}`)
			} 

            db.Products.destroy({
                where : {
                    id : +req.params.id
                }
            })
            .then(data => {
                return res.redirect('/')
            })
        })
        .catch(err => res.send(err))

	}
};

module.exports = controller;