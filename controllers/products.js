// [SECTION] Dependencies and Modules
	const Product = require("../models/Product");

// [SECTION] Functionality - Create
	// Add Product
	module.exports.addProduct = (data) => {
		let product = data.product;

		let pName = product.name;
		let pDesc = product.description;
		let pPrice = product.price;

		let newProduct = new Product({
			name: pName,
			description: pDesc,
			price: pPrice
		});

		return newProduct.save().then((savedProduct, err) => {
			if (savedProduct) {
				return savedProduct;
			} else {
				return false;
			};
		});
	};

// [SECTION] Functionality - Retrieve
	// Retrieve All Products
	module.exports.getAllProducts = () => {
		return Product.find({}).then(result => {
			return result;
		});
	};

	// Retrieve Active Products
	module.exports.getAllActiveProducts = () => {
		return Product.find({isActive: true}).then(result => {
			return result;
		});
	};

	// Retrieve Single Product
	module.exports.getProduct = (id) => {
		return Product.findById(id).then(result => {
			return result;
		});
	};

// [SECTION] Functionality - Update
	// Update Product Details
	module.exports.updateProduct = (product, details) => {
		let pName = details.name;
		let pDesc = details.description;
		let pPrice = details.price;

		let updatedProduct = {
			name: pName,
			description: pDesc,
			price: pPrice
		};

		let id = product.productId;

		return Product.findByIdAndUpdate(id, updatedProduct).then((productUpdated, err) => {
			if (productUpdated) {
				return true;
			} else {
				return "Failed to update product.";
			};
		});
	};

	// Archive Product
	module.exports.archiveProduct = (product) => {
		let id = product.productId;
		let updates = {
			isActive: false
		};

		return Product.findByIdAndUpdate(id, updates).then((archived, err) => {
			if (archived) {
				return "Product has been archived.";
			} else {
				return false;
			};
		});
	};

// [SECTION] Functionality - Delete