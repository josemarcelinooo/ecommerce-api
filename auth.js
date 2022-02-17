// [SECTION] Dependencies and Modules
	const jwt = require("jsonwebtoken");
	const dotenv = require("dotenv");

// [SECTION] Environment Variable Setup
	dotenv.config();
	let passkey = process.env.PASSKEY;

// [SECTION] Functionalities
	// Create Access Token
	module.exports.createAccessToken = (authUser) => {
		let userData = {
			id: authUser._id,
			email: authUser.email,
			isAdmin: authUser.isAdmin
		};

		return jwt.sign(userData, passkey, {});
	};

	// Middleware to Verify Authorization Token
	module.exports.verify = (req, res, next) => {
		let token = req.headers.authorization;
		if (typeof token != "undefined") {
			token = token.slice(7, token.length);
			return jwt.verify(token, passkey, (err, payload) => {
				if (err) {
					return res.send({auth: "Authorization has failed, token is invalid."});
				} else {
					next();
				};
			});
		} else {
			return res.send({auth: "Authorization has failed, please check token."});
		};
	};

	// Value Decoder from the Payload of the Access Token
	module.exports.decode = (accessToken) => {
		if (typeof accessToken != "undefined") {
			accessToken = accessToken.slice(7, accessToken.length);
			return jwt.verify(accessToken, passkey, (err, verified) => {
				if (err) {
					return null;
				} else {
					return jwt.decode(accessToken, {complete: true}).payload;
				};
			});
		} else {
			return null;
		};
	};