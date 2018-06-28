import {JetView} from "webix-jet";
import {part} from "models/partSpeech";
import * as word from "models/word";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			elements:[{
				rows:[ 
					{view: "textarea", label:"Word", name:"word", height:50},
					{view: "textarea", label:"Translate", name:"translate",height:50},
					{view:"combo", label:"Part of speech", options:{data:part}, name:"partSpeech",labelPosition:"top"},
					{
						cols:[
							{
								view:"button",
								label:"Save",
								type:"form",
								click: () => { 
									let popForm = this.getRoot().queryView({view:"form"});
									let values = popForm.getValues();
									if(!popForm.validate()) return false;
									if(values.id){
										word.putData(values);
									} else {
										word.newData(values);
									}
									this.hideFunction();
								}
							},
							{
								view:"button", 
								label:"Cancel", 
								click:() => {
									this.hideFunction();
								}
							},
						]
					}
				]
			}],
			rules:{
				word:webix.rules.isNotEmpty,
				translate:webix.rules.isNotEmpty,
			},
		};

		let pop = {
			view:"window",
			position:"center",
			head:(obj)=>`${obj} ${"word"}`,
			width: 400,
			body: form
		};

		return pop;
	}
	init(){
		this.on(this.app, "dataEditWord", (data) => {
			let root = this.getRoot();
			root.queryView({view:"form"}).setValues(data);
			let text;
			data.id ? text = "Edit" : text = "Add";
			root.getHead().setValues(text);
			root.queryView({view:"button", type:"form"}).setValue(text);
		});
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

