import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";
import {user} from "helpers/user.js";

webix.ready(() => {
	webix.CustomScroll.init();
	var app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		//router:        UrlRouter,
		start:		"/start/transl",
		debug:      true
	});

	app.render();
	app.use(user);
	app.use(plugins.Locale);

	app.attachEvent("app:error:resolve", function(name, error){
		window.console.error(error);
	});
});
