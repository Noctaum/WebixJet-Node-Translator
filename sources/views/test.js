import {JetView} from "webix-jet";
import {group} from "models/group";
import {result} from "models/result";
import * as word from "models/word";

let groupWord;
let actualWord;
let counter;
let userResult;
let markOneWord;

export default class test extends JetView{
	config(){

//Start game
		let label = {
			view:"label",
			label:"Choose group for test",
		};

		let list =  {
			view: "list",
			select:true,
			template:(item)=>(`${item.name} / ${item.created.slice(0,10)}`),
		};

		let startButton = { 
			view:"button", 
			label:"Start", 
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
			align:'center',
		};

		let firstBtn = { 
			id:'Btn1',
			view:"button", 
			label:"1", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let secondBtn = { 
			id:'Btn2',
			view:"button", 
			label:"2", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let thirdBtn = { 
			id:'Btn3',
			view:"button", 
			label:"3", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.checkAnswer(id, event);
			}
		};

		let fourthBtn = { 
			id:'Btn4',
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
		}

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
			label:"End Game",
			align:'center',
		};

		let resultLabel = {
			id:"resultLabel",
			view:"label",
			label:"Word",
			align:'center',
		};

		let newGamebtn = { 
			view:"button", 
			label:"Start new game!", 
			width:120,
			align:"center",
			click:(id, event)=>{
				this.show(`../testMenu`);
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
		}

		return  {
			rows:[
				startTemplate,
				testTemplate,
				endTemplare,
			]
		}
	}
  	
	init(view){
		$$("startTempl").show();
		$$("testTempl").hide();
		$$("endTempl").hide();
		view.queryView({view:"list"}).sync(group);
	}

	chooseTest(){
		
		let list = this.getRoot().queryView({view:"list"});
		let item = list.getSelectedItem();
		if(item === undefined){
			webix.message({text:"You should choose group",type:"error"});
			return false
		}

		$$("startTempl").hide();
		$$("testTempl").show();

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
		let length = data.length
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
		
		let length = data.length
		let rightWord = Math.floor(Math.random()*length);

		actualWord = data[rightWord];

		let word = data[rightWord].word;
		$$("mainWord").setValue(word);
		let massBtn = [1,2,3,4];
		let btnRight = Math.floor(Math.random()*4)+1;
		let massWithoutRight = massBtn.filter(item=>(item !== btnRight));

		$$("Btn"+btnRight).setValue(actualWord.translate);
		let btnLength = massWithoutRight.length;
		for (let i=0; i<btnLength; i++){
			let num = Math.floor(Math.random()*length);
			$$("Btn"+massWithoutRight[i]).setValue(data[num].translate);
		}

	}
	
	checkAnswer(id, event){
		let choose = $$(id).getValue();
		
		if(choose == actualWord.translate){
			userResult+=markOneWord;

			webix.message({text:"It's right"});
		} else {
			webix.message({text:"Wrong",type:"error"});
		}
		
		counter++;
		this.testStart();
		
	}

	endGame(){
		$$("resultLabel").setValue("Your result: "+userResult);
		$$("testTempl").hide();
		$$("endTempl").show();

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
	