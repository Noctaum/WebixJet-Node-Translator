// export const word = new webix.DataCollection({ 
	
// 	url:"http://localhost:8096/word",
// 	save:"rest->http://localhost:8096/word/",
	
// });

const APIURL = "http://localhost:8096/word";
const messages = {
	get: "Data loaded.",
	post: "Data added.",
	put: "Data changed.",
	del: "Data deleted.",
}

export function getData(filter){
	return webix.ajax().get(APIURL, { filter : filter }, function(text, json){
		template(json, messages.get, false);
	});
};

export function newData(value){
    return webix.ajax().post(APIURL, value, function(text, json){
    	template(json, messages.post, true);
    });
};

export function putData(value){
	let id = value._id;
    return webix.ajax().put(APIURL+"/"+id, value, function(text, json){
    	template(json, messages.put, true);
    });
};

export function deleteData(id){
    return webix.ajax().del(APIURL+"/"+id, function(text, json){
    	template(json, messages.del, true);
    });
};

export function dataFromGroup(value){
    return webix.ajax().get(APIURL+"/test", {filter: value}, function(text, json){
    	template(json, messages.get, false);
    });
};

function template(json, message, display){
	let data = json.json();
	if(data.problem){
		webix.message({text:data.message,type:"error"});
	} else {
		if(display) webix.message({text:message});
		return data;
	}
};
