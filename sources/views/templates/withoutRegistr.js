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

		let butLog =
			{
				view: "button", 
				label:_("Log in"),
				width:100,
				click: ()=>{
					this.app.show("userIN?user=log");
				}
			};
		
		let butSign =
			{
				view: "button", 
				label:_("Sign in"),
				width:100,
				click: ()=>{
					this.app.show("userIN?user=new");
				}
			};

		let header = { 
			view: "toolbar",
			elements: [
				{ view: "label", label: "My App", width:100},
				segment,
				butLog,
				butSign
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

		
		
