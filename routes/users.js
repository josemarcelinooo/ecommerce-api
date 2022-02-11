// [SECTION] Dependencies and Modules
	const express = require("express");
	const controller = require("../controllers/users");

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] POST Routes
	// Register User
	route.post("/register", (req, res) => {
		let userInput = req.body;
		controller.registerUser(userInput).then(outcome => {
			res.send(outcome);
		});
	});

// [SECTION] GET Routes
	// Retrieve All Users
	route.get("/all", (req, res) => {
		controller.getAllUsers().then(outcome => {
			res.send(outcome);
		});
	});

// [SECTION] PUT Routes
// [SECTION] DEL Routes
// [SECTION] Expose Route System
	module.exports = route;