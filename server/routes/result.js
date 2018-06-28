const	express = require("express"),
		router = express.Router({mergeParams: true}),
		result = require("../models/result");

let metods = {
	showResult: function(req, res){
		result.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
			} else {
				let length = data.length;
				let mass = data;
				for(let i = 0; i<length; i++){
					mass[i].order = i+1;
				}
				res.json(mass);
			}
		});
	},
	addResult: function(req, res){
		let newResult = req.body;
		result.create(newResult, function(err, data){
			if(err){
				console.log("ERROR!");
			} else {
				res.json({});
			}
		});
	},
	delResult: function(req, res){
		result.findByIdAndRemove(req.body._id, function(err){
			if(err){
				console.log("ERROR!");
			} else {
				res.json({});
			}
		});
	},
};	

router.get('/result', metods.showResult);	
router.post('/result', metods.addResult);
router.delete('/result/:id', metods.delResult);
	
module.exports = router;

	