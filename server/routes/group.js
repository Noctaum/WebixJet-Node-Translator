const	express = require("express"),
		router = express.Router({mergeParams: true}),
		group= require("../models/group"),
		middleware = require("../middleware/index");

let metods = {
	showGroup: function(req, res){
		group.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
			} else {
				let mass = data.map((item)=>{
					item.id = item._id;
					return item;
				});
				res.json(mass);
			}
		});
	},
	addGroup: function(req, res){
		let name = req.body.name;
		let words = JSON.parse(req.body.words);
		let newGroup = {
			name,
			words
		};
		group.create(newGroup, function(err, newGroup){
			if(err){
				console.log("ERROR!");
			} else {
				res.json({"id":newGroup._id});
			}
		});
	},
	delGroup: function(req, res){
		group.findByIdAndRemove(req.body._id, function(err){
			if(err){
				console.log("ERROR!");
			} else {
				res.json({});
			}
		});
	},
	changeGroup: function(req, res){
		let name = req.body.name;
		var words = JSON.parse(req.body.words);
		let newGroup = {
			name,
		};
		group.findByIdAndUpdate(req.params.id, newGroup, function(err, data){
			if(err){
				console.log("ERROR!");
			} else {
				data.words.splice(0,data.words.length);
				let length = words.length;
				for(let i = 0; i<length; i++){
					data.words.push(words[i]);
				}
				data.save(function(err, newNewData){
					if(err){
						console.log("ERROR!");
						res.send(err);
					} else {
						res.json({});
					}
				}); 
			}
		});
	},
};	

router.get('/group', metods.showGroup);	
router.post('/group', metods.addGroup);
router.delete('/group/:id', metods.delGroup);
router.put('/group/:id', metods.changeGroup);
	
module.exports = router;

	