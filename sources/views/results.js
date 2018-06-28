import {JetView} from "webix-jet";
import {result} from "models/result";

export default class results extends JetView{
	config(){

		let list =  {
			view:"list",
			template:(item) => (`${item.user} score: ${item.result} - ${item.created.slice(0,10)}`),
			select:true,
		};

		return {
			rows:[
				list
			]
		};
			
	}
	
	init(view){
		view.queryView({view:"list"}).sync(result);
	}
}
		

		