const	express = require("express"),
		router = express.Router({mergeParams: true}),
		word= require("../models/word"),
		middleware = require("../middleware/index");

let metods = {
	showWord: function(req, res){
		let filter = req.query.filter
		word.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				return res.json(err);
			} else{
				let massWord = [];
				if(filter === "All"){
					massWord = data;
				} 
				else if(filter){
					let filt = filter.toLowerCase();
					data.forEach(function(word){
						let engWord = word.word.toLowerCase();
						let rusWord = word.translate.toLowerCase();
						if(engWord.indexOf(filt) === 0 || rusWord.indexOf(filt) === 0) massWord.push(word);
					});
				}
				let mass = massWord.map((item)=>{
					item.id = item._id;
					return item;
				});
				res.json(massWord);
			}
		});
	},
	addWord: function(req, res){
		word.create(req.body, function(err, newWord){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				return res.json(err);
			} else{
				res.json({});
			}
		});
	},
	delWord: function(req, res){
		word.findByIdAndRemove(req.params.id, function(err){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				return res.json(err);
			} else{
				res.json({});
			}
		});
	},
	changeWord: function(req, res){
		word.findByIdAndUpdate(req.params.id, req.body, function(err, foundWord){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				return res.json(err);
			} else {
				res.json({});
			}
		});
	},
	wordsForTest:function(req,res){
		let words = req.query.filter;
		let massId = JSON.parse(words);
		word.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
				err.problem = true;
				return res.json(err);
			} else{
				let length = massId.length;
				let massWord = data.filter((item)=>{
					for(let i=0; i<length; i++){
						if(item._id == massId[i]) return true;
					}
					return false;
				});
				res.json(massWord);
			}
		})
	}
};	

router.get('/word', metods.showWord);	
router.post('/word', metods.addWord);
router.delete('/word/:id', metods.delWord);
router.put('/word/:id', metods.changeWord);
router.get('/word/test', metods.wordsForTest);
	
module.exports = router;

	