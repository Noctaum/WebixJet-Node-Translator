import {JetView} from "webix-jet";
import {result} from "models/result";

export default class results extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let list =  {
			view:"list",
			template:(item) => {
				let nowDate;
				if (item.created) {
						nowDate = item.created.slice(0,10)
				} else {
					let date = new Date();
					nowDate = date.toDateString();
				}
				let order;
				if(item.order){
					order = item.order;
				} else {
					order = _("New Result!");
				}
				return `${order}. ${item.user} score: ${item.result} - ${nowDate}`
			},		 
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
		

		