// [SECTION] Dependencies and Modules
	const express = require("express");
	const controller = require("../controllers/users");
	const auth = require("../auth");

// [SECTION] Routing Component
	const route = express.Router();

// [SECTION] POST Routes
	// Register User
	route.post("/register", (req, res) => {
		let userInput = req.body;
		controller.registerUser(userInput).then(outcome => res.send(outcome));
	});

	// Check Email
	route.post("/check-email", (req, res) => {
		controller.checkEmailExists(req.body).then(outcome => res.send(outcome));
	});

	// User Login
	route.post("/login", (req, res) => {
		let data = req.body;
		controller.loginUser(data).then(outcome => res.send(outcome));
	});

// [SECTION] GET Routes
	// Retrieve All Users
	route.get("/all", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		if (isAdmin) {
			controller.getAllUsers().then(outcome => res.send(outcome));
		} else {
			res.send("Sorry, you are not authorized to access the user's list.");
		};
	});

	// Retrieve Single User
	route.get("/profile", auth.verify, (req, res) => {
		let userId = auth.decode(req.headers.authorization).id;
		controller.getProfile(userId).then(outcome => res.send(outcome));
	});

// [SECTION] PUT Routes
	// Set User as Admin
	route.put("/:userId/set-as-admin", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let id = req.params.userId;

		if (isAdmin) {
			controller.setAsAdmin(id).then(outcome => res.send(outcome));
		} else {
			res.send("You are not authorized to do this task since you are not an administrator.")
		};
	});

	// Set Admin to Non-Admin
	route.put("/:userId/set-as-user", auth.verify, (req, res) => {
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let id = req.params.userId;

		if (isAdmin) {
			controller.setAsNonAdmin(id).then(outcome => res.send(outcome));
		} else {
			res.send("You are not authotized to do this task since you are not an administrator.")
		};
	});

// [SECTION] DEL Routes
// [SECTION] Expose Route System
	module.exports = route;