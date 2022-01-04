'use strict';

function rename(adapter, input, liste, wert){
if(wert == "project"){
    if(adapter.config.json_project_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
            if(liste[i].id === input){
                return liste[i].name;
            }
        }
        return input;
    }else{
        return input;
    }

}
if(wert == "creator"){
    if(input == "null" || input == undefined ){return " "};
    if(adapter.config.json_creator_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
            for (var j = 0; j < liste[i].length; j++){ 
                
                if(liste[i][j].id === input){ 
                    return liste[i][j].name;
                }
            }
        }
        return input;
    }else{
        return input;
    }
}

if(wert == "assignee"){
    if(input == "null" || input == undefined ){return " "};
    if(adapter.config.json_assignee_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
            for (var j = 0; j < liste[i].length; j++){ 
                
                if(liste[i][j].id === input){ 
                    return liste[i][j].name;
                }
            }
        }
        return input;
    }else{
        return input;
    }
}

if(wert == "assigner"){
    if(input == "null" || input == undefined ){return " "};
    if(adapter.config.json_assigner_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
            for (var j = 0; j < liste[i].length; j++){ 
                
                if(liste[i][j].id === input){ 
                    return liste[i][j].name;
                }
            }
        }
        return input;
    }else{
        return input;
    }
}

if(wert == "labels"){
    if(input == "null" || input == undefined ){return " "};
    if(adapter.config.json_labels_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
                if(liste[i].id == input){
                    return liste[i].name;
                }  
            }
            return input;    
    }else{
        return input;
    }
}

if(wert == "section"){
    if(input == "null" || input == undefined ){return " "};
    if(adapter.config.json_section_id_change){      
        //durchsuche die lsite nach dem passenden namen
        for (var i = 0; i < liste.length; i++){ 
            
                    return liste[i].name;
                
            }
        return input;
         
    }else{
        return input;
    }
}



}

async function table_json(adapter, task, prio_neu, projects, labels, sections, collaborators) {
    return new Promise(async (resolve) => {
        let baue_json;
        
       //if(task.hasOwnProperty('content')){task.content}else{""};
        try {
            baue_json = '{"'+adapter.config.json_name+'":"' + task.content + '"';
            
            if (adapter.config.json_id) { if(task.hasOwnProperty('id')){ baue_json = baue_json + ', "' + adapter.config.json_id_name + '":"' + task.id + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_priority) { if(task.hasOwnProperty('priority')){ baue_json = baue_json + ', "' + adapter.config.json_priority_name + '":"' + prio_neu + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_priority_name + '":"' + " " + '"' } };
            if (adapter.config.json_url) { if(task.hasOwnProperty('url')){ baue_json = baue_json + ', "' + adapter.config.json_url_name + '":"' + task.url + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_url_name + '":"' + " " + '"' } };
            if (adapter.config.json_project_id) { if(task.hasOwnProperty('project_id')){ baue_json = baue_json + ', "' + adapter.config.json_project_name + '":"' + rename(adapter, task.project_id , projects, "project")+ '"' }else{baue_json = baue_json + ', "' + adapter.config.json_project_name + '":"' + " " + '"' } };
            if (adapter.config.json_comment_cound) { if(task.hasOwnProperty('comment_count')){ baue_json = baue_json + ', "' + adapter.config.json_comment_name + '":"' + task.comment_count + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_comment_name + '":"' + " " + '"' } };
            if (adapter.config.json_parent_id) { if(task.hasOwnProperty('parent_name')){ baue_json = baue_json + ', "' + adapter.config.json_parent_name + '":"' + task.parent_id + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_parent_name + '":"' + " " + '"' } };
            //neue felder ab 0.9

            if (adapter.config.json_due_date) { if(task.hasOwnProperty('due')){ baue_json = baue_json + ', "' + adapter.config.json_due_date_name + '":"' + task.due.date + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_date_name + '":"' + " " + '"' } };
            if (adapter.config.json_due_string) { if(task.hasOwnProperty('due')){ baue_json = baue_json + ', "' + adapter.config.json_due_string_name + '":"' + task.due.string + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_string_name + '":"' + " " + '"' } };
            if (adapter.config.json_due_recurring) { if(task.hasOwnProperty('due')){ baue_json = baue_json + ', "' + adapter.config.json_due_recurring_name + '":"' + task.due.recurring + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_recurring_name + '":"' + " " + '"' } };
            if (adapter.config.json_creator_id) { if(task.hasOwnProperty('creator')){ baue_json = baue_json + ', "' + adapter.config.json_creator_id_name + '":"' + rename(adapter, task.creator , collaborators, "creator") + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_creator_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_assignee_id) { if(task.hasOwnProperty('assignee')){ baue_json = baue_json + ', "' + adapter.config.json_assignee_id_name + '":"' + rename(adapter, task.assignee , collaborators, "assignee") + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_assignee_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_assigner_id) { if(task.hasOwnProperty('assigner')){ baue_json = baue_json + ', "' + adapter.config.json_assigner_id_name + '":"' + rename(adapter, task.assigner , collaborators, "assigner") + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_assigner_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_labels_id) { if(task.hasOwnProperty('label_ids')){ baue_json = baue_json + ', "' + adapter.config.json_labels_name + '":"' + rename(adapter, task.label_ids , labels, "labels") + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_labels_name + '":"' + " " + '"' } };
            if (adapter.config.json_description) { if(task.hasOwnProperty('description')){ baue_json = baue_json + ', "' + adapter.config.json_description_name + '":"' + task.description + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_description_name + '":"' + " " + '"' } };
            if (adapter.config.json_section_id) { if(task.hasOwnProperty('section_id')){ baue_json = baue_json + ', "' + adapter.config.json_section_id_name + '":"' + rename(adapter, task.section_id , sections, "section")+ '"' }else{baue_json = baue_json + ', "' + adapter.config.json_section_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_order) { if(task.hasOwnProperty('order')){ baue_json = baue_json + ', "' + adapter.config.json_order_name + '":"' + task.order + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_order_name + '":"' + " " + '"' } };
            if (adapter.config.json_created) { if(task.hasOwnProperty('created')){ baue_json = baue_json + ', "' + adapter.config.json_created_name + '":"' + task.created + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_created_name + '":"' + " " + '"' } };
            
            

            
            
            baue_json = baue_json + "}";
            baue_json = JSON.stringify(baue_json);

            baue_json = baue_json.replace(/\\/g, '');
            baue_json = baue_json.replace(/\\/g, '');
             
        }
        catch (e) {
            adapter.log.error(" fehler: " + e);
        }
        resolve(baue_json);
    });
}

async function table_json_empty(adapter) {
    return new Promise(async (resolve) => {
       let baue_json;
       
        try {
            
            baue_json = '{"'+adapter.config.json_name+'":"' + adapter.config.json_notodo_name + '"';
            
            if (adapter.config.json_id) { baue_json = baue_json + ', "' + adapter.config.json_id_name + '":"' + "-" + '"'  };
            if (adapter.config.json_priority) { baue_json = baue_json + ', "' + adapter.config.json_priority_name + '":"' + "-" + '"'  };
            if (adapter.config.json_url) {baue_json = baue_json + ', "' + adapter.config.json_url_name + '":"' + "-" + '"' };
            if (adapter.config.json_project_id) {baue_json = baue_json + ', "' + adapter.config.json_project_name + '":"' + "-" + '"' };
            if (adapter.config.json_comment_cound) { {baue_json = baue_json + ', "' + adapter.config.json_comment_name + '":"' + "-" + '"'  };
            if (adapter.config.json_parent_id) {baue_json = baue_json + ', "' + adapter.config.json_parent_name + '":"' + "-" + '"' };
            //neue felder ab 0.9

            if (adapter.config.json_due_date) { baue_json = baue_json + ', "' + adapter.config.json_due_date_name + '":"' + "-" + '"'  };
            if (adapter.config.json_due_string) {baue_json = baue_json + ', "' + adapter.config.json_due_string_name + '":"' + "-" + '"'  };
            if (adapter.config.json_due_recurring) {baue_json = baue_json + ', "' + adapter.config.json_due_recurring_name + '":"' + "-" + '"'  };
            if (adapter.config.json_creator_id) {baue_json = baue_json + ', "' + adapter.config.json_creator_id_name + '":"' + "-" + '"'  };
            if (adapter.config.json_assignee_id) {baue_json = baue_json + ', "' + adapter.config.json_assignee_id_name + '":"' + "-" + '"'  };
            if (adapter.config.json_assigner_id) {baue_json = baue_json + ', "' + adapter.config.json_assigner_id_name + '":"' + "-" + '"' }};
            if (adapter.config.json_labels_id) {baue_json = baue_json + ', "' + adapter.config.json_labels_name + '":"' + "-" + '"' };
            if (adapter.config.json_description) {baue_json = baue_json + ', "' + adapter.config.json_description_name + '":"' + "-" + '"'  };
            if (adapter.config.json_section_id) {baue_json = baue_json + ', "' + adapter.config.json_section_id_name + '":"' + "-" + '"'  };
            if (adapter.config.json_order) {baue_json = baue_json + ', "' + adapter.config.json_order_name + '":"' + "-" + '"'  };
            if (adapter.config.json_created) {baue_json = baue_json + ', "' + adapter.config.json_created_name + '":"' + "-" + '"'  };
            
            

            
            
            baue_json = baue_json + "}";
            baue_json = JSON.stringify(baue_json);

            baue_json = baue_json.replace(/\\/g, '');
            baue_json = baue_json.replace(/\\/g, '');

            
        }
        catch (e) {
            adapter.log.error(" fehler: " + e);
        }
        resolve(baue_json);
    });
}

module.exports = {

    table_json,
    table_json_empty
    
    
};