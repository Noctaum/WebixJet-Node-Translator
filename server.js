
const bodyParser     = require('body-parser'),
	  mongoose       = require("mongoose"),
	  cors           = require('cors'),
	  passport       = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  express        = require('express'),
	  User           = require("./server/models/user"),
	  //Word         = require("./server/models/word"),
	  //Group        = require("./server/models/group"),
	  app            = express();

let port = process.env.PORT || 8096;

let userRoutes = require("./server/routes/user"),
	wordRoutes = require("./server/routes/word"),
	groupRoutes = require("./server/routes/group"),
	resultRoutes = require("./server/routes/result");

mongoose.connect("mongodb://localhost/translate");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//  PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "secrret word",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware that applies currentUser to all routes
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(userRoutes);
app.use(wordRoutes);
app.use(groupRoutes);
app.use(resultRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port, function(){
	console.log(`Started on ${port} port!`);
});

