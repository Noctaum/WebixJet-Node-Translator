import {JetView} from "webix-jet";

export default class testMenu extends JetView{
	config(){

		let testButton = { 
			view:"button", 
			label:"Test", 
			width:120,
			align:"center",
			click: ()=>{
				this.show(`../test`);
			}	
		};

		let resultButton = { 
			view:"button", 
			label:"Results", 
			width:120,
			align:"center",
			click: ()=>{
				this.show(`../results`);
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
		

		