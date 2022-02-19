// [SECTION] Dependencies and Modules
	const User = require("../models/User");
	const bcrypt = require("bcrypt");
	const auth = require("../auth");
	const Product = require("../models/Product");
	const products = require("./products");
	const Order = require("../models/Order");

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

	// Non-Admin Product Purchase
	module.exports.addToCart = async (data) => {
		let userId = data.userId;
		let productId = data.productId;
		let quantity = data.quantity;
		let toBePurchased = await Product.findById(productId).then((found, err) => {
			if (found) {
				return found;
			} else {
				return false;
			};
		});
		let name = toBePurchased.name;

		let isUserUpdated = await User.findById(userId).then(user => {
			user.orders.push({products: {productName: name, quantity: quantity}, totalAmount: quantity * toBePurchased.price});
			return user.save().then((save, err) => {
				if (err) {
					return false;
				} else {
					return true;
				};
			});
		});

		let isProductUpdated = await Product.findById(productId).then(product => {
			product.orders.push({orderId: userId});
			return product.save().then((saved, err) => {
				if (err) {
					return false;
				} else {
					return true;
				};
			});
		});

		if (isUserUpdated && isProductUpdated) {
			return true;
		} else {
			return "Purchase failed, please contact our support team.";
		};
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