import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

		let butLog =
			{
				view: "button", 
				label:"Log in",
				width:100,
				click: ()=>{
					this.app.show("userIN?user=log");
				}
			};
		
		let butSign =
			{
				view: "button", 
				label:"Sign in",
				width:100,
				click: ()=>{
					this.app.show("userIN?user=new");
				}
			};

		let header = { 
			view: "toolbar",
			elements: [
				{ view: "label", label: "My App"},
				butLog,
				butSign
			]
		};

		return header
	}
}

		
		
