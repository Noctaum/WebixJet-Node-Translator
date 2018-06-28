const	express = require("express"),
		passport = require("passport"),
		router = express.Router({mergeParams: true}),
		user= require("../models/user");

let metods = {
	
	showUser: function(req, res){
		user.find({}, function(err, data){
			if(err){
				console.log("ERROR!");
			} else{
				res.json(data);
			}
		});
	},
	addUser: function(req, res){
		let newUser = new user({username: req.body.username});
		user.register(newUser, req.body.password, function(err, user){
			if(err){
				res.locals.currentUser = req.user;
				err.problem = true;
				return res.json(err);
			}
			passport.authenticate("local")(req, res, function(){
				res.json(user.username);
			});
		});
	},
	CheckUser: function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) {
	    	err.problem = true;
	    	return res.json(err);
	    }
	    if (!user) { 
	    	return res.json({
	    		problem: true,
	    		message:"User not found",
	    	});
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	       	err.problem = true;
	    	return res.json(err);
	   		}
	      return res.json(user.username);
	    });
	  })(req, res, next);
	},

};

router.get('/user', metods.showUser);	
router.post('/user/register', metods.addUser);
router.post('/user/login', metods.CheckUser);

module.exports = router;