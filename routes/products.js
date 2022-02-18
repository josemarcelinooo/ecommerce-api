// [SECTION] Dependencies and Modules
	const express = require("express");
	const controller = require("../controllers/products");
	const auth = require("../auth");

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] POST Routes
	// Add Product
	route.post("/", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let data = {
			product: req.body
		};

		if (isAdmin) {
			controller.addProduct(data).then(outcome => res.send(outcome));
		} else {
			res.send("You cannot add products, you're not an administrator.");
		};
	});

// [SECTION] GET Routes
	// Retrieve All Products
	route.get("/all", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		if (isAdmin) {
			controller.getAllProducts().then(outcome => res.send(outcome));
		} else {
			res.send("You do not have the permission to access this resource.");
		};
	});

	// Retrieve Active Products
	route.get("/", (req, res) => {
		controller.getAllActiveProducts().then(outcome => res.send(outcome));
	});

	// Retrieve Single Product
	route.get("/:id", (req, res) => {
		let id = req.params.id;
		controller.getProduct(id).then(outcome => res.send(outcome));
	});

// [SECTION] PUT Routes
	// Update Product Details
	route.put("/:productId", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let id = req.params;
		let body = req.body;
		if (isAdmin) {
			controller.updateProduct(id, body).then(outcome => res.send(outcome));
		} else {
			res.send("You are not authorized to update product details.");
		};
	});

	// Archive Product
	route.put("/:productId/archive", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let id = req.params
		if (isAdmin) {
			controller.archiveProduct(id).then(outcome => res.send(outcome));
		} else {
			res.send("You cannot archive this course since you're not an administrator.");
		};
	});

// [SECTION] DELETE Routes
	route.delete("/:productId", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let id = req.params.productId;

		if (isAdmin) {
			controller.deleteProduct(id).then(outcome => res.send(outcome));
		} else {
			res.send("You are not authorized to delete products.");
		};
	});

// [SECTION] Expose Route System
	module.exports = route;