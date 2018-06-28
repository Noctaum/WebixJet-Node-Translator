import {JetView} from "webix-jet";
import {group} from "models/group";
import WindowEdit from "views/windowGroup";

export default class DataTable extends JetView{
	config(){

		let search = {
			view:"search", 
			icon:"search",
			placeholder:"Write name of group",
			on:{
				onTimedKeyPress:()=>{
					let list = this.getRoot().queryView({view:"grouplist"});
					let search = this.getRoot().queryView({view:"search"}).getValue();
					let filt = search.toLowerCase();
					list.filter((group)=>{
						let nameGroup = group.name.toLowerCase();
						if(nameGroup.indexOf(filt) === 0) return 1;
					});
				}
			}
		};

		let addBut = {
			view:"button", 
			value:"Add new group",
			click: ()=> this.callWindow({}),
		};

		let list =  {
			view: "list",
			select:true,
			//templateBack:"#name# <span class='editButton'>Edit</span> <span class='deleteButton'>Remove</span>",
	  		//templateGroup:"#name#",
	  		//templateItem:"#_id#",
			template:(item)=>(`${item.name} / ${item.words.length} -ptc <span class='editButton'>Edit</span> <span class='deleteButton'>Remove</span>`),
			onClick:{
				deleteButton:(e, id)=>{
					group.remove(id);
				},
				editButton:(e, id)=>{
					this.callWindow(this.getItem(id));
				},
			},
		};

		return {rows:[search, addBut, list]};
	}
	
	init(view){
		this._jetPopup = this.ui(WindowEdit);
		view.queryView({view:"list"}).sync(group);
	}
	
	callWindow(data){
		this.app.callEvent("dataEditGroup", [data]);
		this._jetPopup.showWindow();
	}

	getItem(id){
		let list = this.getRoot().queryView({view:"list"});
		let values = list.getItem(id);
		return values;
	}
}
		

		