// [SECTION] Dependencies and Modules
	const express = require("express");
	const mongoose = require("mongoose");
	const dotenv = require("dotenv");
	const cors = require("cors");
	const userRoutes = require("./routes/users");
	const productRoutes = require("./routes/products");

// [SECTION] Environment Variables Setup
	dotenv.config();
	const port = process.env.PORT;
	const credentials = process.env.MONGO_ACCESS;

// [SECTION] Server Setup
	const app = express();
	app.use(express.json());

// [SECTION] Database Connect
	mongoose.connect(credentials);
	const db = mongoose.connection;
	db.once("open", () => console.log("Connected to MongoDB Atlas"));

// [SECTION] Server Routes
	app.use("/users", userRoutes);
	app.use("/products", productRoutes);

// [SECTION] Server Responses
	app.get("/", (req, res) => {
		res.send("This is my Capstone 2 Project!");
	});
	app.listen(port, () => {
		console.log(`API is online on port ${port}`);
	});