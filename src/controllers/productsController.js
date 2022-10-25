const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const products = require('../data/productsDataBase.json');

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json')
	, JSON.stringify(dato, null, 4), 'utf-8')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		//return res.send(products)
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
		// Do the magic
		return res.render('admin/products/product-create-form')

	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let errors = validationResult(req)

		if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
		if (errors.isEmpty()) {
			let newProduct = {
				id: products[products.length - 1].id + 1,
				name: req.body.name,
				price: +req.body.price,
				discount: +req.body.discount,
				category: req.body.category,
				description: req.body.description.trim(),
				image: req.file ? req.file.filename : "default-image.png"
			}

			products.push(newProduct);

			guardar(products)

			res.redirect('/products')
		} else {

			res.render('admin/products/product-create-form', {
				errors: errors.mapped(),
				old: req.body
			})

		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const id = +req.params.id;

		let product = products.find(product => product.id === id);

		return res.render('admin/products/product-edit-form', {
			productToEdit: product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic

		let errors = validationResult(req)
		
		if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

		if (errors.isEmpty()) {
			let id = +req.params.id;

			products.forEach(product => {
				if (product.id === id) {
					product.name = req.body.name
					product.price = +req.body.price
					product.discount = +req.body.discount
					product.category = req.body.category
					product.description = req.body.description
					if (req.file) {
						if (fs.existsSync("./public/images/products/", product.image)) {
							fs.unlinkSync(`./public/images/products/${product.image}`)
						} else {
							console.log('No encontré el archivo')
						}
						product.image = req.file.filename
					} else {
						product.image = product.image
					}
				}
			})
			guardar(products)

			return res.redirect('/')
		} else {
			res.render('admin/products/product-edit-form', {
				errors: errors.mapped(),
				old: req.body
			})
		}
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let productId = +req.params.id;

		products.forEach(product => {
			if (product.id === productId) {

				if (fs.existsSync("./public/images/products/", product.image)) {
					fs.unlinkSync(`./public/images/products/${product.image}`)
				} else {
					console.log('No encontré el archivo')
				}

				let productToDestroyIndex = products.indexOf(product) // si lo encuentra devuelve el indice si no -1
				if (productToDestroyIndex !== -1) {
					products.splice(productToDestroyIndex, 1)
				} else {  // primer parámetro es el indice del elemento a borrar, el segundo, la cantidad a eliminar 
					console.log('No encontré el producto')
				}
			}
		})

		guardar(products);
		res.redirect('/products')

	}
};

module.exports = controller;