// [SECTION] Dependencies and Modules
	const User = require("../models/User");
	const bcrypt = require("bcrypt");
	const auth = require("../auth");

// [SECTION] Functionality - Create
	// User Registration
	module.exports.registerUser = (data) => {
		let fName = data.firstName;
		let lName = data.lastName;
		let mName = data.middleName;
		let email = data.email;
		let password = data.password;

		let newUser = new User({
			firstName: fName,
			lastName: lName,
			middleName: mName,
			email: email,
			password: bcrypt.hashSync(password, 10)
		});

		return newUser.save().then((userSaved, err) => {
			if (userSaved) {
				return userSaved;
			} else {
				return false;
			};
		});
	};

	// Email Checker
	module.exports.checkEmailExists = (reqBody) => {
		return User.find({email: reqBody.email}).then(result => {
			if (result.length > 0) {
				return "Email already exists.";
			} else {
				return "Email is still available.";
			};
		});
	};

	// Login (User Authentication)
	module.exports.loginUser = (reqBody) => {
		let inputEmail = reqBody.email;
		let inputPassword = reqBody.password;
		return User.findOne({email: inputEmail}).then(result => {
			if (result === null) {
				return "Email does not exist.";
			} else {
				let passW = result.password;
				const isMatched = bcrypt.compareSync(inputPassword, passW);
				if (isMatched) {
					let userData = result.toObject();
					return {accessToken: auth.createAccessToken(userData)};
				} else {
					return "Password does not match. Check credentials";
				};
			};
		});
	};

// [SECTION] Functionality - Retrieve
	// Retrieve All Users
	module.exports.getAllUsers = () => {
		return User.find({}).then(result => {
			return result;
		});
	};

	// Retrieve Single User
	module.exports.getProfile = (id) => {
		return User.findById(id).then(user => {
			return user;
		});
	};

// [SECTION] Functionality - Update
	// Set User as Admin
	module.exports.setAsAdmin = (inputId) => {
		let updates = {
			isAdmin: true
		};

		return User.findByIdAndUpdate(inputId, updates).then((done, err) => {
			if (done) {
				return true;
			} else {
				return "Failed to convert to administrator."
			};
		});
	};

	// Set Admin to Non-Admin
	module.exports.setAsNonAdmin = (inputId) => {
		let updates = {
			isAdmin: false
		};

		return User.findByIdAndUpdate(inputId, updates).then((done, err) => {
			if (done) {
				return true;
			} else {
				return "Failed to convert administrator to non-administrator."
			};
		});
	};

// [SECTION] Functionality - Delete