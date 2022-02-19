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
		mobileNo: {
			type: String,
			required: [true, "Mobile number is required."]
		},
		gender: {
			type: String,
			required: [true, "Gender is required."]
		},
		homeAddress: {
			type: String,
			required: [true, "Home address is required."]
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		orders: [
			{
				products: [
					{
						productName: {
							type: String,
							required: [true, "Product is required."]
						},
						quantity: {
							type: Number,
							required: [true, "You need at least 1."]
						}
					}
				],
				totalAmount: {
					type: Number,
					required: [true, "Total amount is required."]
				},
				purchasedOn: {
					type: Date,
					default: new Date()
				}
			}
		]
	});

// [SECTION] Model
	module.exports = mongoose.model("User", userSchema);