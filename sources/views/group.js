import {JetView} from "webix-jet";
import {group} from "models/group";
import * as word from "models/word";
import WindowEdit from "views/windowGroup";

export default class DataTable extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let search = {
			view:"search", 
			icon:"search",
			placeholder:_("Write name of group"),
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
			value:_("Add new group"),
			click: ()=> this.callWindow({}),
		};

		let list =  {
			view: "grouplist",
			select:true,
			//templateBack:"#name# <span class='editButton'>Edit</span> <span class='deleteButton'>Remove</span>",
	  		//templateGroup:"#name#",
	  		//templateItem:"#_id#",
			template:(item)=>(`${item.name} / ${item.words.length} -ptc <span class='editButton'>${_("Edit")}</span> <span class='deleteButton'>${_("Remove")}</span>`),
			onClick:{
				deleteButton:(e, id)=>{
					group.remove(id);
				},
				editButton:(e, id)=>{
					this.callWindow(this.getItem(id));
				},
			},
			on:{
				onAfterSelect:(id)=>{
					let list = this.getRoot().queryView({view:"grouplist"});
					let listOneGroup = this.getRoot().queryView({view:"list"});
					let item = list.getSelectedItem();
					let words = item.words;
					listOneGroup.clearAll();
					listOneGroup.parse(word.dataFromGroup(words));
				}
			}
		};

		let listOneGroup =  {
			view:"list",
			template:"#word# - #translate# - #partSpeech#",		 
			select:true,
		};

		return {rows:[search, addBut, list, listOneGroup]};
	}
	
	init(view){
		this._jetPopup = this.ui(WindowEdit);
		view.queryView({view:"grouplist"}).sync(group);
	}
	
	callWindow(data){
		this.app.callEvent("dataEditGroup", [data]);
		this._jetPopup.showWindow();
	}

	getItem(id){
		let list = this.getRoot().queryView({view:"grouplist"});
		let values = list.getItem(id);
		return values;
	}
}
		

		