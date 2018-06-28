import {JetView} from "webix-jet";
import * as word from "models/word";

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

		let list =  {
			view:"list",
			template:"#word# - #translate#",
			select:true,
		};

		return {rows:[search,list]};
	}

	filterLoad(){
		let list = this.getRoot().queryView({view:"list"});
		let search = this.getRoot().queryView({view:"search"}).getValue();
		list.clearAll();
		list.parse(word.getData(search));
		//list.load(`http://localhost:8096/word?filter=${search}`);
	}
}

		