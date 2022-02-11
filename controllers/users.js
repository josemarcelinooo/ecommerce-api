// [SECTION] Dependencies and Modules
	const User = require("../models/User");
	const bcrypt = require("bcrypt");

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

// [SECTION] Functionality - Retrieve
	// Retrieve All Users
	module.exports.getAllUsers = () => {
		return User.find({}).then(result => {
			return result;
		});
	};

// [SECTION] Functionality - Update
// [SECTION] Functionality - Delete