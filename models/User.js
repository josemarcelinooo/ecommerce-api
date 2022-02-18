// [SECTION] Dependencies and Modules
	const mongoose = require("mongoose");

// [SECTION] Schema
	const userSchema = new mongoose.Schema({
		firstName: {
			type: String,
			required: [true, "First name is required."]
		},
		lastName: {
			type: String,
			required: [true, "Last name is required."]
		},
		middleName: {
			type: String,
			required: [true, "Middle name is required."]
		},
		email: {
			type: String,
			required: [true, "Email is required."]
		},
		password: {
			type: String,
			required: [true, "Password is required."]
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		orders: [
			{
				productName: {
					type: String,
					required: [true, "Product is required."]
				},
				quantity: {
					type: Number,
					required: [true, "You need at least 1."]
				},
				total: {
					type: Number,
					required: [true, "Total is required."]
				}
			}
		]
	});

// [SECTION] Model
	module.exports = mongoose.model("User", userSchema);