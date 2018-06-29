import {JetView} from "webix-jet";
import * as word from "models/word";
import WindowEdit from "views/windowWord";

export default class DataTable extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let search = {
			view:"search", 
			icon:"search",
			placeholder:_("Write word"),
			on:{
				onTimedKeyPress:()=>this.filterLoad()
			}
		};

		let addBut = {
			view:"button", 
			value:_("Add new"),
			click: ()=> this.callWindow({}),
		};

		let list =  {
			view: "list",
			select:true,
			template:`#word# - #translate# <span class='editButton'>${_("Edit")}</span> <span class='deleteButton'>${_("Remove")}</span>`,
			onClick:{
				deleteButton:(e, id)=>{
					word.deleteData(id);
					this.getRoot().queryView({view:"list"}).remove(id);
				},
				editButton:(e, id)=>{
					this.callWindow(this.getItem(id));
				},
			},
		};

		return {rows:[search, addBut, list]};
	}
	
	init(){
		this._jetPopup = this.ui(WindowEdit);
		//view.queryView({view:"list"}).sync(word);
	}
	
	callWindow(data){
		this.app.callEvent("dataEditWord", [data]);
		this._jetPopup.showWindow();
		this.getRoot().queryView({view:"search"}).setValue("");
		this.getRoot().queryView({view:"list"}).clearAll();
	}

	getItem(id){
		let list = this.getRoot().queryView({view:"list"});
		let values = list.getItem(id);
		return values;
	}

	filterLoad(){
		let list = this.getRoot().queryView({view:"list"});
		let search = this.getRoot().queryView({view:"search"}).getValue();
		list.clearAll();
		list.parse(word.getData(search));
		//list.load(`http://localhost:8096/word?filter=${search}`);
	}

}
		

		