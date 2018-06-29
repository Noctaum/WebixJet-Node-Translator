import {JetView} from "webix-jet";
import {group} from "models/group";
import {result} from "models/result";
//import * as word from "models/word";

let groupWord;
let actualWord;
let counter;
let userResult;
let markOneWord;

export default class test extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		//Start game
		let label = {
			view:"label",
			label:_("Choose group for test"),
		};

		let list =  {
			view: "list",
			select:true,
			template:(item)=>{
				let nowDate;
				if (item.created) {
					nowDate = item.created.slice(0,10);
				} else {
					let date = new Date();
					nowDate = date.toISOString().slice(0,10);
				}
				return `${item.name} / ${nowDate}`;
			},
		};

		let startButton = { 
			view:"button", 
			label:_("Start"), 
			width:120,
			align:"center",
			click:()=>{
				this.chooseTest();
			}
		};
		
		let startTemplate = {
			id:"startTempl",
			rows:[
				label,
				list,
				startButton
			]
		};

		//Game 
		let mainWord = {
			id:"mainWord",
			view:"label",
			label:"Word",
			align:"center",
		};

		let firstBtn = { 
			id:"Btn1",
			view:"button", 
			label:"1", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let secondBtn = { 
			id:"Btn2",
			view:"button", 
			label:"2", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let thirdBtn = { 
			id:"Btn3",
			view:"button", 
			label:"3", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let fourthBtn = { 
			id:"Btn4",
			view:"button", 
			label:"4", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let btnForAnswer = {
			rows:[
				firstBtn,
				secondBtn,
				thirdBtn,
				fourthBtn,

			]
		};

		let testTemplate = {
			id:"testTempl",
			rows:[
				{height:20},
				mainWord,
				btnForAnswer,
			]
		};

		//End game 
		let endLabel = {
			view:"label",
			label:_("End Game"),
			align:"center",
		};

		let resultLabel = {
			id:"resultLabel",
			view:"label",
			label:"Word",
			align:"center",
		};

		let newGamebtn = { 
			view:"button", 
			label:_("Start new game!"), 
			width:120,
			align:"center",
			click:()=>{
				this.show("../testMenu");
			}
		};


		let endTemplare = {
			id:"endTempl",
			rows:[
				{height:20},
				endLabel,
				resultLabel,
				newGamebtn,
			]
		};

		return  {
			rows:[
				startTemplate,
				testTemplate,
				endTemplare,
			]
		};
	}

	init(view){
		this.$$("startTempl").show();
		this.$$("testTempl").hide();
		this.$$("endTempl").hide();
		view.queryView({view:"list"}).sync(group);
	}

	chooseTest(){
		const _ = this.app.getService("locale")._;
		
		let list = this.getRoot().queryView({view:"list"});
		let item = list.getSelectedItem();
		if(item === undefined){
			webix.message({text:_("You should choose group"),type:"error"});
			return false;
		}

		this.$$("startTempl").hide();
		this.$$("testTempl").show();

		webix.ajax().get("http://localhost:8096/word"+"/test", {filter: item.words}, (text, json)=>{
			let data = json.json();
			if(data.problem){
				webix.message({text:data.message,type:"error"});
			} else {
				this.choosePartOfSpeech(data);
				return data;
			}
		});
	}

	choosePartOfSpeech(data){
		let length = data.length;
		let numForPartSpeech = Math.floor(Math.random()*length);
		let partSpeech = data[numForPartSpeech].partSpeech;
		let massForTest = data.filter(item=>(item.partSpeech === partSpeech));

		if(partSpeech === "Noun" || partSpeech === "Verb"){
			markOneWord = 2;
		} else {
			markOneWord = 1;
		}

		groupWord = massForTest;
		counter = 0;
		userResult = 0;
		this.testStart();
	}

	testStart(){

		if(counter >= 10){
			this.endGame();
		}

		let data = groupWord;
		
		let length = data.length;
		let rightWord = Math.floor(Math.random()*length);

		actualWord = data[rightWord];

		let word = data[rightWord].word;
		this.$$("mainWord").setValue(word);
		let massBtn = [1,2,3,4];
		let btnRight = Math.floor(Math.random()*4)+1;
		let massWithoutRight = massBtn.filter(item=>(item !== btnRight));

		this.$$("Btn"+btnRight).setValue(actualWord.translate);
		let btnLength = massWithoutRight.length;
		for (let i=0; i<btnLength; i++){
			let num = Math.floor(Math.random()*length);
			this.$$("Btn"+massWithoutRight[i]).setValue(data[num].translate);
		}

	}
	
	checkAnswer(id){
		const _ = this.app.getService("locale")._;

		let choose = this.$$(id).getValue();
		
		if(choose == actualWord.translate){
			userResult+=markOneWord;

			webix.message({text:_("It's right")});
		} else {
			webix.message({text:_("Wrong"),type:"error"});
		}
		
		counter++;
		this.testStart();
		
	}

	endGame(){
		const _ = this.app.getService("locale")._;

		this.$$("resultLabel").setValue(_("Your result: ")+userResult);
		this.$$("testTempl").hide();
		this.$$("endTempl").show();

		let userForResult = "unknown";
		let user = localStorage["user"];
		if(user) userForResult = user;
		let value = {
			result: userResult,
			user: userForResult,
		};

		result.add(value);
		return false;
	}

}
	