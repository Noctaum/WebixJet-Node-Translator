import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){

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
		label:"Log out",
		width:100,
		click: ()=>{
			let user = this.app.getService("user").setUser({name: undefined,here: false,});
			delete localStorage["user"];
			this.app.refresh("/start");
		}
	};

		let header = { 
			view: "toolbar",
			elements: [
				{ view: "label", label: "My App"},
				log,
				butOut
			]
		};

		return header
	}
}

		
		
