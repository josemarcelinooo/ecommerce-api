// [SECTION] Dependencies and Modules
	const mongoose = require("mongoose");

// [SECTION] Schema
	const productSchema = new mongoose.Schema({
		name: {
			type: String,
			required: [true, "Product name is required."]
		},
		description: {
			type: String,
			required: [true, "Product description is required."]
		},
		price: {
			type: Number,
			required: [true, "Product price is required."]
		},
		imageUrl: {
			type: String,
			required: [true, "Product image is required."]
		},
		isActive: {
			type: Boolean,
			default: true
		},
		createdOn: {
			type: Date,
			default: new Date()
		},
		orders: [
			{
				orderId: {
					type: String,
					required: [true, "Order ID is required."]
				}
			}
		]
	});

// [SECTION] Model
	module.exports = mongoose.model("Product", productSchema);