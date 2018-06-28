var mongoose = require("mongoose");

var result = mongoose.Schema({
	result: Number,
	user: String,
	order: Number,
	created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Result", result);