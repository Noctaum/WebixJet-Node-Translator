var mongoose = require("mongoose");

var result = mongoose.Schema({
	result: Number,
	user: String,
	created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Result", result);