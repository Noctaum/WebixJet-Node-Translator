var mongoose = require("mongoose");

var word = mongoose.Schema({
	word: String,
	translate: String,
	partSpeech: String,
	id: String,
});

module.exports = mongoose.model("Word", word);