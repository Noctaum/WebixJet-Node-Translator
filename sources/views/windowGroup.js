import {JetView} from "webix-jet";
//import {part} from "models/partSpeech";
import * as word from "models/word";
import {group} from "models/group";

export default class WindowEdit extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let form = {
			view:"form",
			elements:[{
				rows:[ 
					{view: "textarea", label:_("Name"), name:"name", height:40},
					{
						view:"multicombo", 
						label:_("Words"), 
						tagMode: false,
						name:"words",
						suggest: {
							body:{
								data: [],
								template: "#word# - #translate# - #partSpeech#",
							}
						},
					},
					{
						cols:[
							{
								view:"button",
								label:_("Save"),
								type:"form",
								click: () => { 
									let popForm = this.getRoot().queryView({view:"form"});
									let values = popForm.getValues();
									if(!popForm.validate()) return false;
									if(values.words !== ""){
										let allWords = this.getRoot().queryView({view:"multicombo"}).getPopup().getList().data.pull;
										let words = values.words.split(",");
										values.words = words.map(id => allWords[id]._id);
									}
						
									if(values.id){
										group.updateItem(values.id, values);
									} else{
										group.add(values);
									}
									
									this.hideFunction();
								}
							},
							{
								view:"button", 
								label:_("Cancel"), 
								click:() => {
									this.hideFunction();
								}
							},
						]
					}
				]
			}],
			rules:{
				name:webix.rules.isNotEmpty,
			},
		};

		let pop = {
			view:"window",
			position:"center",
			head:(obj)=>`${obj} ${"group"}`,
			width: 400,
			body: form
		};

		return pop;
	}
	init(){
		const _ = this.app.getService("locale")._;
		
		let multicombo = this.getRoot().queryView({view:"multicombo"});
		let list = multicombo.getPopup().getList();
		list.parse(word.getData("All"));
		this.on(this.app, "dataEditGroup", (data) => {
			let root = this.getRoot();
			root.queryView({view:"form"}).setValues(data);
			let text;
			data.id ? text = _("Edit") : text = _("Add");
			root.getHead().setValues(text);
			root.queryView({view:"button", type:"form"}).setValue(text);

			if(data.words){
				let listWord = data.words;
				listWord = listWord.join(",");
				multicombo.setValue(listWord);
			}
		});
		list.load("http://localhost:8096/word?filter=All");
	}
	showWindow() {
		this.getRoot().show();
	}
	hideFunction(){
		let popForm = this.getRoot().queryView({view:"form"});
		popForm.clear();
		popForm.clearValidation();
		this.getRoot().hide();
	}
}

