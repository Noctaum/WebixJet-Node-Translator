import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;

		let segment =	{ 
			view:"segmented", 
			value:lang, 
			inputWidth:250, 
			name:"lang",
			options:[
				{ id:"en", value:_("En")},
				{ id:"ru", value:_("Ru")}
			],
			click:() => this.toggleLanguage(),
			align:"left"
		};

		let log = {
			view:"label",
			width:100,
			template:()=>{
				let user = this.app.getService("user").getUser();
				return user.name;
			},	
		};
			
		let butOut = {
			view: "button", 
			label:_("Log out"),
			width:100,
			click: ()=>{
				this.app.getService("user").setUser({name: undefined,here: false,});
				delete localStorage["user"];
				this.app.refresh("/start");
			}
		};

		let header = { 
			view: "toolbar",
			elements: [
				{ view: "label", label: "My App", width:100},
				segment,
				log,
				butOut
			]
		};

		return header;
	}

	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name:"lang" }).getValue();
		langs.setLang(value);
	}
}

		
		
