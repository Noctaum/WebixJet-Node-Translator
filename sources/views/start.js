import {JetView} from "webix-jet";
import withRegistr from "views/templates/withRegistr";
import withoutRegistr from "views/templates/withoutRegistr";

export default class Start extends JetView{
	config(){

		const _ = this.app.getService("locale")._;
		
		let user = this.app.getService("user").getUser();
		let header;
		if(user.name){
			header = withRegistr;
		} else {
			let userName = localStorage["user"];
			if(userName){
				this.app.getService("user").setUser({name:userName, here: true});
				header = withRegistr;
			} else {
				header =  withoutRegistr;
			}
		};

		let tabbar = { 
			view: "tabbar",
			multiview: true,
			minWidth:450,
			options:[
				{id:"transl", icon: "globe", value: _("Translate")},
				{id:"word", icon: "book", value: _("Words")},
				{id:"group", icon: "list-alt", value: _("Groups")},
				{id:"testMenu", icon: "comment", value: _("Test")},
			],
			on:{
				onAfterTabClick: (id)=>{
					this.show(`../start/${id}`);
				}
			}
		};

		return {
			rows:[
				header,
				{cols:[
					{},
					{rows:[
						tabbar,
						{$subview:true}
					]},
					{}
				]},
				
			]
		};

	}
	ready(){
		this.show(`../start/transl`);
	}
}