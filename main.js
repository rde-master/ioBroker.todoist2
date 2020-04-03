/**
 Api erkärung:
 https://developer.todoist.com/rest/v1/
 Das ist ein test!

// "Aufgabe" bzw Einkaufsgegenstand von todoist entfernen
// ********************************************************************
/*
function deleteTask(){

    // Array der IDs aufbereiten
    
    var idListIDsArray =[];
    var idListIDs;
    
    idListIDs = getState(idEinkaufsIDS).val;
    if(debug)log(idListIDs);
    idListIDsArray = idListIDs.split("<br>");
    idListIDsArray.pop();                                      // aufgrund meiner uneleganten Änderungen steht als letztes immer "<br>" in der Liste. Damit würde ein Element zuviel ausgegeben werden (leer). Pop kürzt den array ums letzte Element

    // Array der Items aufbereiten

    var idListArray =[];
    var idList;
    
    idList = getState(idEinkaufsItems).val;
    if(debug)log(idList);
    idListArray = idList.split("<br>");
    idListArray.pop();       

    // Bestimmen der ID Position im Array
    
    var arrayPosition = idListArray.indexOf(purchItem);
    
    // Den Gegenstand über die gefundene ID löschen

        var deleteURL = "https://beta.todoist.com/API/v8/tasks/"+idListIDsArray[arrayPosition]+"?token="+APItoken;
        if(debug) log("Delete URL ist "+deleteURL);
 
        request({
            uri: deleteURL,
            method: "DELETE",
            timeout: 5000,
            }, 
                function(error, response, body) {
                if(debug) console.log(body);
            });    
}    

*/
// **************************************************************
// Trigger und Wertübergabe
// **************************************************************
/*
on({    id:regexTrigger,   change: 'ne'},                           // regex trigger, löst immer aus sobald etwas an- oder abgewählt wird
            function(data) {
                var temporary;
                temporary = data.id;
                purchItem = temporary.substring(33);                // Pfad bis zum Item ist 33 Stellen lang
                
                if(data.state.val) {                                // wenn das item auf der manuellen Liste hinzugefügt wurde (state ist true) dann...
                    if (debug) log("Es wird hinzugefügt: "+purchItem);
                    setTimeout(addTask, 500); }
                else {                                              // sonst wenn wenn das item auf der manuellen Liste entfernt wurde dann...
                    if (debug) log("Es wird entfernt: "+purchItem);
                    setTimeout(deleteTask, 500); 
                }    
        });
*/

 
 

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';




const utils = require('@iobroker/adapter-core'); // Get common adapter utils
const adapterName = require('./package.json').name.split('.').pop();
const request = require("request");



let uuid;
let adapter;
let debug;
let all_task_objekts;
let all_label_objekts;
let all_project_objekts;



async function startAdapter(options) {
    options = options || {};
    Object.assign(options, {name: adapterName});

    adapter = new utils.Adapter(options);
	
	

    adapter.on('message', obj => {
        //adapter.log.info(JSON.stringify(obj));
        processMessages(obj);
    });

    adapter.on('ready', () => {
        adapter.config.server = adapter.config.server === 'true';
		debug = adapter.config.debug;
        
        newstate();
        adapter.subscribeStates('New.Task');
		check_online();
        main();

        //Regelmäßige ausführung wie eingestellt
        var poll = adapter.config.pollingInterval;
        
        if(poll < 10000){
            adapter.log.error("Polling under 10 Seconds, this is not supported and not working!");
        }
        if(poll < 60000){
            adapter.log.warn("It is recomended to use a intervall over 60 Seconds");
        }
        if(poll > 10000){
        setInterval(function(){main();}, 60000);
        }
    });

    adapter.on('unload', () => {
       
        if (adapter && adapter.setState) adapter.setState('info.connection', false, true);
    });

    
    
    // is called if a subscribed state changes
    adapter.on('stateChange', (id, state) => {
        
        //addTask(item, proejct_id, section_id, parent, order, label_id, priority, date)
        newwithstate(id, state);
        
    });

    adapter.on('objectChange', (id, obj) => {
        
        //adapter.log.warn("AAchtung änderung state!!");

    });

    

    return adapter;
}


//Erstelle neuen Task wenn der Objekt New.Task geänderd wird.
async function newwithstate(id, state){

    var new_project = await adapter.getStateAsync('New.Project');
    var new_priority = await adapter.getStateAsync('New.Priority');
    var new_date =  await adapter.getStateAsync('New.Date');
    var new_label =  await adapter.getStateAsync('New.Label');
    

    //wenn Felder leer sind dise auch löschen.
    if(new_priority == null|| new_priority.val === 0){new_priority = ""};
    if(new_date == null || new_date.val === 0){new_date = ""};
    if(new_label == null || new_label.val === 0){new_label = ""};
    if(new_project == null || new_project.val === 0){new_project = ""};
    //Debug ausgabe:
    if(debug) adapter.log.info("Anlage neues Todo mit Objekten");
    if(debug) adapter.log.info("Task: " + state.val);
    if(debug) adapter.log.info("Project: " + new_project.val);
    if(debug) adapter.log.info("Priorität: " + new_priority.val);
    if(debug) adapter.log.info("Date: " + new_date.val);
    if(debug) adapter.log.info("Label: " + new_label.val);


    
    await addTask(state.val, new_project.val, "", "", "", new_label.val, new_priority.val, new_date.val);
}

//Baue neue States

async function newstate(){
    await adapter.setObjectNotExistsAsync("New.Task", {
        type: 'state',
        common: {
            name: 'Task Name',
            type: 'string'
            
        },
        native: {}
          });
    await adapter.setObjectNotExistsAsync("New.Project", {
            type: 'state',
            common: {
                name: 'Project ID',
                type: 'number'
                
            },
            native: {}
              });
    
    await adapter.setObjectNotExistsAsync("New.Label", {
                type: 'state',
                common: {
                    name: 'Label ID',
                    type: 'number'
                    
                },
                native: {}
                  });

    await adapter.setObjectNotExistsAsync("New.Priority", {
                    type: 'state',
                    common: {
                        name: 'Priority',
                        type: 'number'
                        
                    },
                    native: {}
                      });

    await adapter.setObjectNotExistsAsync("New.Date", {
                        type: 'state',
                        common: {
                            name: 'Date',
                            type: 'string'
                            
                        },
                        native: {}
                          });

}

//Aus der Send Funktion einen Task bauen
function processMessages(obj) {
    //adapter.log.info(JSON.stringify(obj.command));
    
    if(debug) adapter.log.info(JSON.stringify(obj.message.funktion));
      
    switch(obj.message.funktion) {
	case "add_task":
    if(debug) adapter.log.info("prüfe add task ausführen");
    if(obj.message.task !== undefined){
    	
    	if(debug)adapter.log.info("funktion add task ausführen");
    	addTask(obj.message.task, obj.message.project_id, obj.message.section_id, obj.message.parent, obj.message.order, obj.message.label_id, obj.message.priority, obj.message.date);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
	case "del_task":
    if(debug) adapter.log.info("prüfe del task ausführen");
    
    if(obj.message.task_id !== undefined){
    	
    	if(debug) adapter.log.info("funktion del task ausführen");
    	delTask(obj.message.task_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
    case "add_project":
    if(debug) adapter.log.info("prüfe add project ausführen");
    
    if(obj.message.project !== undefined){
    	
    	if(debug) adapter.log.info("funktion add project ausführen");
    	addProject(obj.message.project, obj.message.parent);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
    case "del_project":
    if(debug) adapter.log.info("prüfe del project ausführen");
    
    if(obj.message.project_id !== undefined){
    	
    	if(debug) adapter.log.info("funktion dell project ausführen");
    	dellProject(obj.message.project_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    
    break;
    case "close_task":
    if(debug) adapter.log.info("prüfe close task ausführen");
    
    if(obj.message.task_id !== undefined){
    	
    	if(debug) adapter.log.info("funktion close task ausführen");
    	//adapter.log.warn("Funktion is not working: Problem is by todoist....");
    	closeTask(obj.message.task_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
    case "reopen_task":
    if(debug) adapter.log.info("prüfe reopen task ausführen");
    
    if(obj.message.task_id !== undefined){
    	
    	if(debug) adapter.log.info("funktion reopen task ausführen");
    	//adapter.log.warn("Funktion is not working: Problem is by todoist....");
    	reopenTask(obj.message.task_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
    case "add_section":
    if(debug) adapter.log.info("prüfe add section ausführen");
    
    if(obj.message.project_id !== undefined && obj.message.section !== undefined){
    	
    	if(debug) adapter.log.info("funktion add section ausführen");
    	addSection(obj.message.section, obj.message.project_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
    case "del_section":
    if(debug) adapter.log.info("prüfe del section ausführen");
    
     if(obj.message.section_id !== undefined){
    	
    	if(debug) adapter.log.info("funktion del section ausführen");
    	delSection(obj.message.section_id);
    }else{
    	
    	adapter.log.warn("Please use the needed fields!!!");
    	
    }
    
    break;
	default:
    adapter.log.warn("Please use a defined funktion!!!");
}  
    
}




async function check_online(){
	
	var APItoken = adapter.config.token;
	var online = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/projects',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	
	await request(online, async function (error, response, body) {
        try {
            var projects_json = JSON.parse(body);
            
             
             if(debug) adapter.log.warn("check online: " + JSON.stringify(response.statusCode));
            
            if(response.statusCode == 200){
            	
            	adapter.setState('info.connection', true, true);
            }else{
            	
            	adapter.setState('info.connection', false, true);
            	adapter.log.warn("No Connection to todoist possible!!! Please Check your Internet Connection.")
            }
            
        } catch (err) {
            adapter.log.warn("error: " + err);
        }
	
	});

}

function createUUID(){
    var dt = new Date().getTime();
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function addTask(item, proejct_id, section_id, parent, order, label_id, priority, date){
    if(debug) adapter.log.info("neuen Task anlegen starten....");
    var dublicate_sperre = false;
    
    if(adapter.config.dublicate == true){

        //if(debug)adapter.log.warn("Starte Prüfung Duplikate");
        if(debug)adapter.log.warn("Object liste: " + all_task_objekts);
        if(debug)adapter.log.warn("Object liste: " + all_task_objekts.length);

        for (var ik = 0; ik < all_task_objekts.length; ik++){
            // look for the entry with a matching `code` value
            if (all_task_objekts[ik].content == item){
               
                adapter.log.info("Objekt besteht schon und wird deshalb geplockt");
                return;
            }
          }


    }


        createUUID();
        var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var options = { method: 'POST',
          url: 'https://api.todoist.com/rest/v1/tasks',
          headers: 
           { 'Cache-Control': 'no-cache',
             Authorization: 'Bearer ' + APItoken,
             'X-Request-Id': uuid,
             'Content-Type': 'application/json' },
          body: 
           { content: item
             
             },
          json: true };
        if(proejct_id != ""){
        options.body.project_id = proejct_id;
        }
        if(section_id != ""){
        options.body.section_id = section_id;
        }
        if(parent != ""){
        options.body.parent = parent;
        }
        if(order != ""){
            options.body.order = order;
        }
        if(label_id != ""){
        options.body.label_ids = label_id;
        }
        if(priority != ""){
        options.body.priority = priority;
        }
        if(date != ""){
        options.body.due_date = date;
        }

        if(debug)adapter.log.info("Daten welche an die API gesendet wird: " + JSON.stringify(options));
        if(dublicate_sperre == false) request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify(body));
        });
}


function delTask(task_id){
	
	var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var del_task = { method: 'DELETE',
          url: 'https://api.todoist.com/rest/v1/tasks/' + task_id,
          headers: {Authorization: 'Bearer ' + APItoken,}};
		
		request(del_task, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify("Task wurde geslöscht...." + body));
        });

}


function addProject(project, parent){
	
	createUUID();
        var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var options = { method: 'POST',
          url: 'https://api.todoist.com/rest/v1/projects',
          headers: 
           { 'Cache-Control': 'no-cache',
             Authorization: 'Bearer ' + APItoken,
             'X-Request-Id': uuid,
             'Content-Type': 'application/json' },
          body: 
           { name: project,
             parent: parent,
             },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify(body));
        });
	
}

function dellProject(project_id){
	
	
	var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var del_task = { method: 'DELETE',
          url: 'https://api.todoist.com/rest/v1/projects/' + project_id,
          headers: {Authorization: 'Bearer ' + APItoken,}};
		
		request(del_task, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify("Project wurde geslöscht...." + body));
        });
	
	
	
}


function closeTask(task_id){
	
	var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var del_task = { method: 'POST',
          url: 'https://api.todoist.com/rest/v1/tasks/' + task_id + '/close',
          headers: {Authorization: 'Bearer ' + APItoken,}};
		
		if(debug)adapter.log.info(JSON.stringify(del_task));
		request(del_task, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify("Task wurde geschlossen...." + body));
        });
	

}



function reopenTask(task_id){
	
	var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var del_task = { method: 'POST',
          url: 'https://api.todoist.com/rest/v1/tasks/' + task_id + '/reopen',
          headers: {Authorization: 'Bearer ' + APItoken,}};
		
		request(del_task, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify("Task wurde wieder geöffnet...." + body));
        });
	
	
}


function addSection(section, project_id){
	
	createUUID();
        var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var options = { method: 'POST',
          url: 'https://api.todoist.com/rest/v1/sections',
          headers: 
           { 'Cache-Control': 'no-cache',
             Authorization: 'Bearer ' + APItoken,
             'X-Request-Id': uuid,
             'Content-Type': 'application/json' },
          body: 
           { name: section,
             project_id: project_id,
             },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify(body));
        });
	
	
	
}



function delSection(section_id){
	
	var APItoken = adapter.config.token;
        //purchItem = item + " " + anzahl + " Stück";
        var del_task = { method: 'DELETE',
          url: 'https://api.todoist.com/rest/v1/sections/' + section_id,
          headers: {Authorization: 'Bearer ' + APItoken,}};
		
		request(del_task, function (error, response, body) {
          if (error) throw new Error(error);
        
          if(debug) adapter.log.info(JSON.stringify("Section wurde geslöscht...." + body));
        });

}




async function getProject(){
	if(debug) adapter.log.info("getproject");
	var APItoken = adapter.config.token;
	var project = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/projects',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	var ToDoListen = []; // wird mit IDs der TO-DO Listen befuellt
    var Projects_names = []; // wird mit Namen der TO-DO Listen befuellt
    
    var json_neu = "[]";
    var json_neu_parse = JSON.parse(json_neu);
	await request(project, async function (error, response, body) {
        try {
            var projects_json = JSON.parse(body);
            var k;
            all_project_objekts = projects_json; // Alle Projekte in die globelae Variable schreiben
           
            for (k = 0; k < projects_json.length; k++) {
                var projects = parseInt(projects_json[k].id);
                var projects_name = JSON.stringify(projects_json[k].name);
                projects_name = projects_name.replace(/\"/g, ''); //entfernt die Anfuehrungszeichen aus dem Quellstring
                projects_name = projects_name.replace(/\./g, '-'); //entfent die PUnkte hoffentlich...
                //wird für den Return benötigt
                ToDoListen[ToDoListen.length] = projects;
                Projects_names[Projects_names.length] = projects_name;
                /* wird glaub nciht mehr benötigt
                var Listenname = Projects_names[k];
                var listenID = ToDoListen[k];
                */
               var Listenname = projects_name;
                var listenID = projects;
                await adapter.setObjectNotExistsAsync("Projects-HTML." + Listenname, {
                    type: 'state',
                    common: {
                        name: 'ID ' + listenID,
                        type: 'string',
                        
                    },
                    native: {}
              		});
              		
              	await adapter.setObjectNotExistsAsync("Projects-JSON." + Listenname, {
                    type: 'state',
                    common: {
                        name: 'ID ' + listenID,
                        type: 'string',
                        
                    },
                    native: {}
              		});
        
            //json_neu[k].Name.push(Listenname);
            // json_neu[k].ID.push(listenID);
            
            json_neu_parse.push({"name":Listenname, "ID":listenID});
            
            json_neu = JSON.stringify(json_neu_parse);
            if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_neu);


            }
            
            await adapter.setObjectNotExistsAsync("JSON-Projects", {
					type: 'state',
                    common: {
                        name: 'JSON Objekt of all Projects',
                        type: 'string',
                        
                    },
                    native: {}
              		});	
            
            
           	
           
             await adapter.setStateAsync("JSON-Projects", {val: json_neu, ack: true});
            
        } catch (err) {
            adapter.log.error("Error bei Get Projekte: " + err);
        }
         
    });

	return {
		projects_id: ToDoListen,
		projects_names: Projects_names
	};
}


async function getLabels(){
	
	
	var APItoken = adapter.config.token;
	var labels = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/labels',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	var Labelsid = []; 
    var Labels_names = []; 

    var json_neu = "[]";
    var json_neu_parse = JSON.parse(json_neu);
    	await request(labels, async function (error, response, body) {
        try {
            var labels_json = JSON.parse(body);
            var i;
            all_label_objekts = labels_json //Labels in globale Variable schreiben
            for (i = 0; i < labels_json.length; i++) {
                
                var labels1 = parseInt(labels_json[i].id);
                var Labels1_names = JSON.stringify(labels_json[i].name);
                Labels1_names = Labels1_names.replace(/\"/g, ''); //entfernt die Anfuehrungszeichen aus dem Quellstring
                Labels1_names = Labels1_names.replace(/\./g, '-'); //entfent die PUnkte hoffentlich...
                Labelsid[Labelsid.length] = labels1;
                Labels_names[Labels_names.length] = Labels1_names;
                
                var Labels2name = Labels_names[i];
                var Labels2ID = Labelsid[i];
                if (debug) adapter.log.info("labels anlegen....");
                await adapter.setObjectNotExistsAsync("Labels-HTML." + Labels2name, {
                    type: 'state',
                    common: {
                        name: 'ID ' + Labels2ID,
                        type: 'string',
                        
                    },
                    native: {}
              		});
              		
            	await adapter.setObjectNotExistsAsync("Labels-JSON." + Labels2name, {
                    type: 'state',
                    common: {
                        name: 'ID ' + Labels2ID,
                        type: 'string',
                        
                    },
                    native: {}
                      });
                      //Baut den Json auf für Json-Labels
                      json_neu_parse.push({"name":Labels2name, "ID":Labels2ID});
            
                      json_neu = JSON.stringify(json_neu_parse);
                      if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_neu)   
                
            }
            
            await adapter.setObjectNotExistsAsync("JSON-Labels", {
					type: 'state',
                    common: {
                        name: 'JSON Objekt of all Labels',
                        type: 'string',
                        
                    },
                    native: {}
              		});
            
             	
             await adapter.setStateAsync("JSON-Labels", {val: json_neu, ack: true});
            
        } catch (err) {
            adapter.log.error(err); 
        }
        
		});

		//jetzt noch die alten Labels löschen, die es nicht mehr gibt:
        /*
        setTimeout(function(){
    
		adapter.log.warn("löschen alter einträge: ");
		var Key;
        var bestehende_objekte = adapter.getStates('todoist2.' + adapter.instance + '.Labels-JSON.*'); 
		//bestehende_objekte = bestehende_objekte.replace(/\\/g, ''); //Backschlasche entfernen!
		
		adapter.log.warn(JSON.stringify(bestehende_objekte));
		bestehende_objekte = bestehende_objekte.replace(/\\/g, ''); //Backschlasche entfernen!
        adapter.log.warn(JSON.stringify(bestehende_objekte));
        */
		/*
		for(Key in bestehende_objekte){
            	//Sliced den Namen des Objektes raus
            	var dd = Key.slice(13,-7);
            	adapter.log.warn("bestehende objekde: " + dd);
            	//Gibt es das bestehende Objekt noch in der Device liste?
            	//var ddd = device.some(function(item){return item.name === dd;});
            	//Wenn es das Objekt nicht mehr gibt dann löschen:	
            	//if (ddd === false){await this.delObjectAsync(dd);}
            	
            }
          */  
	//	}, 8000);
	return {
		labels_id: Labelsid,
		labes_names: Labels_names
	};
	
}

async function getSections(){
	
	
	
	var APItoken = adapter.config.token;
	var sections = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/sections',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	var Sectionsid = []; 
    var Sections_names = [];
    
    var json_neu = "[]";
    var json_neu_parse = JSON.parse(json_neu);

	await request(sections, async function (error, response, body) {
        try {
            var sections_json = JSON.parse(body);
            var i;
            
            
            if (sections_json.length > 0){
            
            for (i = 0; i < sections_json.length; i++) {
                
                var sections1 = parseInt(sections_json[i].id);
                var sections1_names = JSON.stringify(sections_json[i].name);
                sections1_names = sections1_names.replace(/\"/g, ''); //entfernt die Anfuehrungszeichen aus dem Quellstring
                Sectionsid[Sectionsid.length] = sections1;
                Sections_names[Sections_names.length] = sections1_names;
                
                var Sections2name = Sections_names[i];
                var Sections2ID = Sectionsid[i];
                await adapter.setObjectNotExistsAsync("Sections." + Sections2name, {
                    type: 'state',
                    common: {
                        name: 'ID ' + Sections2ID,
                        type: 'string'
                        
                    },
                    native: {}
                      });
                      
                      //Baut den Json auf für Json-Labels
                      json_neu_parse.push({"name":Sections2name, "ID":Sections2ID});
            
                      json_neu = JSON.stringify(json_neu_parse);
                      if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_neu)   
                
            }
            
            }else{
        	
        	adapter.log.warn("no Sections found");
        }
        
        await adapter.setObjectNotExistsAsync("JSON-Sections", {
					type: 'state',
                    common: {
                        name: 'JSON Objekt of all Sections',
                        type: 'string',
                        
                    },
                    native: {}
              		});
            
              	
             await adapter.setStateAsync("JSON-Sections", {val: json_neu, ack: true});
        
        
        } catch (err) {
            adapter.log.error(err); 
        }
        
		});

	return {
		sections_id: Sectionsid,
		sections_names: Sections_names
	};
	
}

//zur Verarbeitung von den Objekten in den Projekten und den einzelnen Tasks
async function readTasks(project){
	
	var APItoken = adapter.config.token;
	var TasksApi = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/tasks',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	
	
	request(TasksApi, async function (error, response, body) {
            try {
                if(debug) adapter.log.info(JSON.stringify(body));
                if(debug) adapter.log.info("länge: " + project.projects_id.length);
                
                var json = JSON.parse(body);
                var j;
                if(debug) adapter.log.warn("anzahl task: " + json.length);
                all_task_objekts = json;
                //Verarbeitung von Projekten
                
                
                for (j = 0; j < project.projects_id.length; j++) {
                    
                    var HTMLstring = '';
                    //adapter.setState('Lists.' + project.projects_name[j], {ack: true, val: 'empty'});
                    var i = 0;

                    var json_task = "[]";
                    var json_task_parse = JSON.parse(json_task);
                    for (i = 0; i < json.length; i++) {
                        
                        var Liste = parseInt(json[i].project_id);
                        var content = JSON.stringify(json[i].content);
                        var id = JSON.stringify(json[i].id);
                        content = content.replace(/\"/g, ''); //entfernt die Anfuehrungszeichen aus dem Quellstring
                        //content = content[0].toUpperCase() + content.substring(1); // Macht den ersten Buchstaben des strings zu einem Grossbuchstaben
                        var taskurl = JSON.stringify(json[i].url);
                        taskurl = taskurl.replace(/\"/g, '');
                        
                        
                        
                        //Anlage für jeden Task in einen eigenen State:
                        
                        var content2 = content.replace(/\./g, '-'); //ERstetzt die Punke - aus dem Quellstring weil, sonst ordner angelegt werden
                        if(adapter.config.tasks === true){
                        adapter.setObjectNotExists("Tasks." + content2, {
                    			type: 'state',
                    				common: {
                        				name: 'ID ' + id,
                        				type: 'string',
                    					},
                    						native: {}
              							});
                        }
                        //Zuordnung zu den Listen:
                        if (Liste === project.projects_id[j]) {
                            if(debug)adapter.log.info('[' + content + '] in ' + project.projects_names[j] + ' found');
                            
                            HTMLstring = HTMLstring + '<tr><td><li><a href="' + taskurl + '" target="_blank">' + content + ' ID: ' + id + '</a></li></td></tr>';
                            //var json_zwischen = JSON.stringify(json[i]);
                            //json_task = json_task + json_zwischen;
                            
                            json_task_parse.push({"name":content, "ID":id});
            
                            json_task = JSON.stringify(json_task_parse);
                            if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_task)

                        }
                    }
               if(debug) adapter.log.info("schreibe in liste: " + 'Lists.'+project.projects_names[j]);
               if(debug) adapter.log.info(HTMLstring);
               
               //json wandeln 
				//json_task = JSON.stringify(json_task);
               
               //Setzte den Status:
               adapter.setState('Projects-HTML.'+project.projects_names[j], {val: '<table><ul>' + HTMLstring + '</ul></table>', ack: true});
               if(json_task === "[]"){
                json_task = '[{"name":"no Todos"}]';
               }
               adapter.setState('Projects-JSON.'+project.projects_names[j], {val: json_task, ack: true});
                }
               if(adapter.config.tasks === true){
               await adapter.setObjectNotExistsAsync("JSON-Tasks", {
					type: 'state',
                    common: {
                        name: 'JSON Objekt of all Tasks',
                        type: 'string',
                        
                    },
                    native: {}
              		});
               }
            //hier gehen wir nochmals durch die Tasks für den Datenpunkt Json-Tasks
            var json_neu = "[]";
            var json_neu_parse = JSON.parse(json_neu);   
            
            for (i = 0; i < json.length; i++) {

                json_neu_parse.push({"name":json[i].content, "ID":json[i].project_id});
            
                 json_neu = JSON.stringify(json_neu_parse);
                    if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_neu);

               }


               
            	
             await adapter.setStateAsync("JSON-Tasks", {val: json_neu, ack: true});
              
               
            } catch (err) {
                adapter.log.error('Error by read of task: ' + err);
            }
        });
	
}

//zur Verarbeitung der Tasks in den Labels:

async function readTasks2(labels){
	
	var APItoken = adapter.config.token;
	var TasksApi = { method: 'GET',
          url: 'https://api.todoist.com/rest/v1/tasks',
          headers: 
           { Authorization: 'Bearer ' + APItoken}
	};
	
	
	request(TasksApi, async function (error, response, body) {
            try {
                if(debug) adapter.log.info(JSON.stringify(body));
                
                var json = JSON.parse(body);
                var j;
                if(debug) adapter.log.info("anzahl task: " + json.length);
                
                //Verarbeitung von Projekten
                
                
                for (j = 0; j < labels.labels_id.length; j++) {
                    
                    var HTMLstring = '';
                    //adapter.setState('Lists.' + project.projects_name[j], {ack: true, val: 'empty'});
                    var i = 0;
                    var json_task = "[]";
                    var json_task_parse = JSON.parse(json_task);
                    for (i = 0; i < json.length; i++) {
                        
                        var Liste = parseInt(json[i].project_id);
                        var content = JSON.stringify(json[i].content);
                        var id = JSON.stringify(json[i].id);
                        var label = json[i].label_ids;
                        content = content.replace(/\"/g, ''); //entfernt die Anfuehrungszeichen aus dem Quellstring
                        //content = content[0].toUpperCase() + content.substring(1); // Macht den ersten Buchstaben des strings zu einem Grossbuchstaben
                        var taskurl = JSON.stringify(json[i].url);
                        taskurl = taskurl.replace(/\"/g, '');
                        
                        
                        
                        var d = 0;
                        for(d = 0; d < label.length; d++){
                        	
                        	if(label[d] === labels.labels_id[j]){
                        		if(debug)adapter.log.info('[' + content + '] in ' + labels.labes_names[j] + ' found');
                        		
                        		HTMLstring = HTMLstring + '<tr><td><li><a href="' + taskurl + '" target="_blank">' + content + ' ID: ' + id + '</a></li></td></tr>';
                            //var json_zwischen = JSON.stringify(json[i]);
                            //json_task = json_task + json_zwischen;

                            json_task_parse.push({"name":content, "ID":id});
            
                            json_task = JSON.stringify(json_task_parse);
                            if(debug) adapter.log.info("Aufbau Projekt Liste: " + json_task)
                        		
                        	}
                        	
                        }
                        
                    }
               if(debug) adapter.log.info("schreibe in Label: " + 'Label.'+ labels.labes_names[j]);
               if(debug) adapter.log.info(HTMLstring);
               
               //json wandeln 
				//json_task = JSON.stringify(json_task);
               // json_task = json_task.replace(/\\/g, ''); //Backschlasche entfernen!
               //Setzte den Status:
               adapter.setState('Labels-HTML.'+labels.labes_names[j], {val: '<table><ul>' + HTMLstring + '</ul></table>', ack: true});
               
               if(json_task === "[]"){
                json_task = '[{"name":"no Todos"}]';
               }
               adapter.setState('Labels-JSON.'+labels.labes_names[j], {val: json_task, ack: true});
                
            
            
            }
               
               
            
            	
           //  await adapter.setStateAsync("JSON-Tasks", {val: json, ack: true});
              
              
            } catch (err) {
                adapter.log.error('Error by read of task: ' + err);
            }
        });
        
}


async function remove_old_objects(){
var new_id;
var pos;
var end_pos;
var match = false;
// Tasks:
if (adapter.config.tasks == true){
    adapter.getStates('Tasks.*', function (err, states) {
       if (debug) adapter.log.info("...........Jetzt Tasks prüfen ob etwas gelöscht werden soll..............");
        for (var id in states) {        
            //Aus der ID den Namen extrahieren:
            pos = id.lastIndexOf('.');
            pos = pos +1;
            end_pos = id.length;
            new_id = id.substr(pos, end_pos);
            
            

            for(var i = 0; i < all_task_objekts.length; i++){
                //adapter.log.error("nummer: " + i + "content: " + all_task_objekts[i].content);
                //adapter.log.info("überprüfung: " +  all_task_objekts[i].content + " mit " + new_id);
                var bearbeitet12 = all_task_objekts[i].content.replace(/\./g, '-') // Punkte entfernden und mit - erseztten
                if (bearbeitet12 == new_id) {
                    //adapter.log.warn("länge: " + all_task_objekts.length);
                    //adapter.log.info("länge objekte  " + states.length);
                    //adapter.log.info("NUM: " + i + " gefunden: " + new_id);
                    match = true;

                } 
            }
            
            if (match != true){

                adapter.log.warn("dieser state löschen: " + new_id);
               // adapter.delObject("Tasks." + new_id, function (err) {

                //                if (err) adapter.log.error('Cannot delete object: ' + err);

               //             });

            }
            
        match = false;    
        }      
    });
}
 //Projekte HTML
if (adapter.config.project == true){
    adapter.getStates('Projects-HTML.*', function (err, states) {
      if (debug)  adapter.log.info("...........Jetzt Projekte HTML prüfen ob etwas gelöscht werden soll..............");
        for (var id in states) {    

            //Aus der ID den Namen extrahieren:
            pos = id.lastIndexOf('.');
            pos = pos +1;
            end_pos = id.length;
            new_id = id.substr(pos, end_pos);
            for(var i = 0; i < all_project_objekts.length; i++){
                
                var bearbeitet12 = all_project_objekts[i].name.replace(/\./g, '-') // Punkte entfernden und mit - erseztten
                 if (bearbeitet12 == new_id) {
                    // adapter.log.warn("länge Projekte: " + all_project_objekts.length);
                    // adapter.log.info("länge objekte Projekte  " + states.length);
                    // adapter.log.info("NUM: " + i + " gefunden: " + new_id);
                     match = true;
 
                 } 
             }
             
             if (match != true){
 
                 adapter.log.warn("dieser state löschen: " + new_id);
                 adapter.delObject("Projects-HTML." + new_id, function (err) {
 
                                 if (err) adapter.log.error('Cannot delete object: ' + err);
 
                             });
 
             }
             
         match = false;   

        }
    })
}
    //Projekte JSON
    if (adapter.config.project == true){
    adapter.getStates('Projects-JSON.*', function (err, states) {
       if (debug) adapter.log.info("...........Jetzt Projekte JSON prüfen ob etwas gelöscht werden soll..............");
        for (var id in states) {    

            //Aus der ID den Namen extrahieren:
            pos = id.lastIndexOf('.');
            pos = pos +1;
            end_pos = id.length;
            new_id = id.substr(pos, end_pos);
            for(var i = 0; i < all_project_objekts.length; i++){
                
                var bearbeitet12 = all_project_objekts[i].name.replace(/\./g, '-') // Punkte entfernden und mit - erseztten
                 if (bearbeitet12 == new_id) {
                     //adapter.log.warn("länge Projekte: " + all_project_objekts.length);
                     //adapter.log.info("länge objekte Projekte  " + states.length);
                     //adapter.log.info("NUM: " + i + " gefunden: " + new_id);
                     match = true;
 
                 } 
             }
             
             if (match != true){
 
                 adapter.log.warn("dieser state löschen: " + new_id);
                 adapter.delObject("Projects-JSON." + new_id, function (err) {
 
                                 if (err) adapter.log.error('Cannot delete object: ' + err);
 
                             });
 
             }
             
         match = false;   

        }
    })
}
//Labels HTML
if (adapter.config.labels == true){
adapter.getStates('Labels-HTML.*', function (err, states) {
    if (debug) adapter.log.info("...........Jetzt Labels HTML prüfen ob etwas gelöscht werden soll..............");
    for (var id in states) {    

        //Aus der ID den Namen extrahieren:
        pos = id.lastIndexOf('.');
        pos = pos +1;
        end_pos = id.length;
        new_id = id.substr(pos, end_pos);
        for(var i = 0; i < all_label_objekts.length; i++){
            
            var bearbeitet12 = all_label_objekts[i].name.replace(/\./g, '-') // Punkte entfernden und mit - erseztten
             if (bearbeitet12 == new_id) {
                // adapter.log.warn("länge Projekte: " + all_project_objekts.length);
                 //adapter.log.info("länge objekte Projekte  " + states.length);
                 //adapter.log.info("NUM: " + i + " gefunden: " + new_id);
                 match = true;

             } 
         }
         
         if (match != true){

             adapter.log.warn("dieser state löschen: " + new_id);
             adapter.delObject("Labels-HTML." + new_id, function (err) {

                             if (err) adapter.log.error('Cannot delete object: ' + err);

                         });

         }
         
     match = false;   

    }
})
}
//Labels JSON
if (adapter.config.labels == true){
adapter.getStates('Labels-JSON.*', function (err, states) {
    if(debug) adapter.log.info("...........Jetzt Labels JSON prüfen ob etwas gelöscht werden soll..............");
    for (var id in states) {    

        //Aus der ID den Namen extrahieren:
        pos = id.lastIndexOf('.');
        pos = pos +1;
        end_pos = id.length;
        new_id = id.substr(pos, end_pos);
        for(var i = 0; i < all_label_objekts.length; i++){
            
            var bearbeitet12 = all_label_objekts[i].name.replace(/\./g, '-') // Punkte entfernden und mit - erseztten
             if (bearbeitet12 == new_id) {
                // adapter.log.warn("länge Projekte: " + all_project_objekts.length);
                 //adapter.log.info("länge objekte Projekte  " + states.length);
                 //adapter.log.info("NUM: " + i + " gefunden: " + new_id);
                 match = true;

             } 
         }
         
         if (match != true){

             adapter.log.warn("dieser state löschen: " + new_id);
             adapter.delObject("Labels-JSON." + new_id, function (err) {

                             if (err) adapter.log.error('Cannot delete object: ' + err);

                         });

         }
         
     match = false;   

    }
})
}
}


async function main() {
    if (!adapter.config.token) {
        adapter.log.warn('Token tosoist is not set!');
        return;
    }
    
    if (debug) adapter.log.warn("Debug Mode for todoist is online: Many Logs are generated!");
    if (debug) adapter.log.info("Token: " + adapter.config.token);
	if (debug) adapter.log.info("Polling: " + adapter.config.pollingInterval);
    if (debug) adapter.log.info("Debug mode: " + adapter.config.debug);
    if (debug) adapter.log.warn("Dublikate Modus: " + adapter.config.dublicate);
   
    


    if(adapter.config.project === true){
    	var projects = await getProject();
     //Schreibe die Tasks erst nach 5 Sekunden in die States, damit auch alle daten da sind!
    
   
    
     
     setTimeout(function(){
    
    readTasks(projects);	
    	
    }, 5000);
    
    }
    
    if(adapter.config.section === true){
    var sections = await getSections();	
    	
    }
    if(adapter.config.labels === true){
    var labels = await getLabels();
    
    setTimeout(function(){
    
    readTasks2(labels);	
    	
    }, 5000);
    
    }
    
    setTimeout(function(){
    
       remove_old_objects();
            
        }, 7000);
    
}

// If started as allInOne/compact mode => return function to create instance
// @ts-ignore
if (module && module.parent) {
    module.exports = startAdapter;
} else {
    // or start the instance directly
    startAdapter();
}
