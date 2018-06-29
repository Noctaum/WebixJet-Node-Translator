import {JetView} from "webix-jet";

export default class testMenu extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let testButton = { 
			view:"button", 
			label:_("Test"), 
			width:120,
			align:"center",
			click: ()=>{
				this.show("../test");
			}	
		};

		let resultButton = { 
			view:"button", 
			label:_("Results"), 
			width:120,
			align:"center",
			click: ()=>{
				this.show("../results");
			}	
		};
  
		return {
			rows:[
				{height:40},
				testButton,
				{height:10},
				resultButton,
			]
		};
	}
	
	init(){
	}
}
		

		