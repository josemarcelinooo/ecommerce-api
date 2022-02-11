// [SECTION] Dependencies and Modules
	const mongoose = require("mongoose");

// [SECTION] Schema
	const OrderSchema = new mongoose.Schema({
		totalAmount: {
			type: Number,
			required: [true, "Total amount is required"]
		},
		purchasedOn: {
			type: Date,
			default: new Date()
		}
	});

// [SECTION] Model
	module.exports = mongoose.model("Order", orderSchema);