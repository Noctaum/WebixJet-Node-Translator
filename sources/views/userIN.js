import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

	const _ = this.app.getService("locale")._;

	let backBut = { 
		view:"button", 
		value:_("Cancel"),
		click: ()=>{
			this.show(`../start/transl`);
		}
	};

	let addBut = {
		view:"button", 
		value:_("Login"), 
		type:"form",
		click:()=>{
			let values = this.getRoot().queryView({view:"form"}).getValues();
			let userDo = this.getParam("user",true);
			if(userDo === "new") {
				webix.ajax().post('http://localhost:8096/user/register', values, (text, json)=>{
					this.userAuthenticate(json);
				});
			} else {
				webix.ajax().post('http://localhost:8096/user/login', values, (text, json)=>{
					this.userAuthenticate(json);
				});
			}
		}
	};

	let log = {
		view:"form", 
		width:300,
		elements:[
			{ view:"text", label:_("Email"), name:"username"},
			{ view:"text", type:"password", label:_("Password"), name:"password"},
			{ 
				margin:5, 
				cols:[
					addBut,
					backBut,
			]}
		]
	};

		return {rows:[
			{},
			{cols:[
				{},log,{}
			]},
			{}
		]};
	}
	
	urlChange(view){
		const _ = this.app.getService("locale")._;
		
		let user = this.getParam("user",true);
		let templ;
		user === "new" ? templ = _("Sign in") : templ = _("Log in");
		view.queryView({view:"button", type:"form"}).setValue(templ);
	}

	userAuthenticate(json){
		let data = json.json();
		if(data.problem){
			webix.message({text:data.message,type:"error"});
		} else {
			localStorage["user"] = data;
			this.app.getService("user").setUser({name:data, here: true});
			this.show(`../start/transl`);
		}
	}
}

		
		
