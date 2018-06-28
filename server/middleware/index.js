let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("http://localhost:8080/#!userIN?user=log");
}

module.exports = middlewareObj;