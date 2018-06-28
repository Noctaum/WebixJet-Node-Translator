var mongoose   = require("mongoose");
// SCHEMA SETUP
var group = new mongoose.Schema({
	name: String,
	words : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Word"
		}
	],
   created: {type: Date, default: Date.now},
   id: String,
});

module.exports = mongoose.model("Group", group);
