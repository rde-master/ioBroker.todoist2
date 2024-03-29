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
        if(input == "null" || input == undefined || input == "[]"){return " "};
        if(adapter.config.json_labels_id_change){      
            //durchsuche die lsite nach dem passenden namen
            for (var i = 0; i < liste.length; i++){ 
                    if(liste[i].id == input){
                        return liste[i].name;
                    }   
                }
                return " ";    
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


async function heading_html(adapter) {
    return new Promise(async (resolve) => {
        let HTMLstring = "<tr><th>";
        try {
            
            if (adapter.config.html_name != "") { HTMLstring = HTMLstring + adapter.config.html_name + '</th><th>'; }
            if (adapter.config.html_id && adapter.config.html_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_id_name + '</th><th>' };
            if (adapter.config.html_priority && adapter.config.html_priority_name != "") { HTMLstring = HTMLstring + adapter.config.html_priority_name + '</th><th>' };
            if (adapter.config.html_url && adapter.config.html_url_name != "") { HTMLstring = HTMLstring + adapter.config.html_url_name + '</th><th>' };
            if (adapter.config.html_project_id && adapter.config.html_project_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_project_name + '</th><th>' };
            if (adapter.config.html_comment_cound && adapter.config.html_comment_cound_name != "") { HTMLstring = HTMLstring + adapter.config.html_comment_name + '</th><th>' };
            if (adapter.config.html_parent_id && adapter.config.html_parent_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_parent_name + '</th><th>' };
            //neue felder ab 0.9:
            if (adapter.config.html_due_date && adapter.config.html_due_date_name != "") { HTMLstring = HTMLstring + adapter.config.html_due_date_name + '</th><th>' };
            if (adapter.config.html_due_string && adapter.config.html_due_string_name != "") { HTMLstring = HTMLstring + adapter.config.html_due_string_name + '</th><th>' };
            if (adapter.config.html_due_recurring && adapter.config.html_due_recurring_name != "") { HTMLstring = HTMLstring + adapter.config.html_due_recurring_name + '</th><th>' };
            if (adapter.config.html_creator_id && adapter.config.html_creator_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_creator_id_name + '</th><th>' };
            if (adapter.config.html_assignee_id && adapter.config.html_assignee_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_assignee_id_name + '</th><th>' };
            if (adapter.config.html_assigner_id && adapter.config.html_assigner_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_assigner_id_name + '</th><th>' };
            if (adapter.config.html_labels_id && adapter.config.html_labels_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_labels_name + '</th><th>' };
            if (adapter.config.html_description && adapter.config.html_description_name != "") { HTMLstring = HTMLstring + adapter.config.html_description_name + '</th><th>' };
            if (adapter.config.html_section_id && adapter.config.html_section_id_name != "") { HTMLstring = HTMLstring + adapter.config.html_section_id_name + '</th><th>' };
            if (adapter.config.html_created && adapter.config.html_created_name != "") { HTMLstring = HTMLstring + adapter.config.html_created_name + '</th><th>' };

            HTMLstring = HTMLstring + "" + '</th></tr>';        
        }
        catch (e) {
            adapter.log.error(`exception catch in IsSummerTime [${e}]`);
        }
        resolve(HTMLstring);
    });
}

async function table_html(adapter, task, prio_neu, projects, labels, sections, collaborators) {
    return new Promise(async (resolve) => {
        let HTMLstring = "";
       //if(task.hasOwnProperty('content')){task.content}else{""};
        try {
            HTMLstring = HTMLstring + '<tr><td id="button_html">' + task.content + "</td><td>";
            if (adapter.config.html_id) { if(task.hasOwnProperty('id')){ HTMLstring = HTMLstring + task.id + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_priority) { if(task.hasOwnProperty('priority')){ HTMLstring = HTMLstring + prio_neu + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_url) { if(task.hasOwnProperty('taskurl')){ HTMLstring = HTMLstring + task.taskurl + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_project_id) { if(task.hasOwnProperty('project_id')){ HTMLstring = HTMLstring + rename(adapter, task.project_id , projects, "project") + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_comment_cound) { if(task.hasOwnProperty('comment_count')){ HTMLstring = HTMLstring + task.comment_count + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_parent_id) { if(task.hasOwnProperty('parent_id')){ HTMLstring = HTMLstring + task.parent_id + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            //neue felder ab 0.9:
            if (adapter.config.html_due_date) { if(task.hasOwnProperty('due.date')){ HTMLstring = HTMLstring + task.due.date + '</td><td>'}else{ HTMLstring = HTMLstring + " " + '</td><td>'} };
            if (adapter.config.html_due_string) { { if(task.hasOwnProperty('string')){ HTMLstring = HTMLstring + task.due.string + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} }; };
            if (adapter.config.html_due_recurring) { { if(task.hasOwnProperty('due.recurring')){ HTMLstring = HTMLstring + task.due.recurring + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} }; };
            if (adapter.config.html_creator_id) { { if(task.hasOwnProperty('creator')){ HTMLstring = HTMLstring + rename(adapter, task.creator , collaborators, "creator") + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_assignee_id) { { if(task.hasOwnProperty('assignee')){ HTMLstring = HTMLstring + rename(adapter, task.assignee , collaborators, "assignee") + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_assigner_id) { { if(task.hasOwnProperty('assigner')){ HTMLstring = HTMLstring + rename(adapter, task.assigner , collaborators, "assigner") + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_labels_id) { { if(task.hasOwnProperty('label_ids')){ HTMLstring = HTMLstring + rename(adapter, task.label_ids , labels, "labels") + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_description) { { if(task.hasOwnProperty('description')){ HTMLstring = HTMLstring + task.description + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_section_id) { { if(task.hasOwnProperty('section_id')){ HTMLstring = HTMLstring + rename(adapter, task.section_id , sections, "section") + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};
            if (adapter.config.html_created) { { if(task.hasOwnProperty('created')){ HTMLstring = HTMLstring + task.created + '</td><td>'}else{HTMLstring = HTMLstring + " " + '</td><td>'} };};  

            if (adapter.config.html_button) { HTMLstring = HTMLstring + '<button class="button" type="button" onclick="myFunction(' + JSON.stringify(task.id) + ')">' + adapter.config.html_svg_button + adapter.config.html_button_name + '</button>' + '</td></tr>'; }
            HTMLstring = HTMLstring + '</td></tr>';
             
        }
        catch (e) {
            adapter.log.error(`da passt was net:` + HTMLstring + " fehler: " + e);
        }
        resolve(HTMLstring);
    });
}

async function table_html_empty(adapter) {
    return new Promise(async (resolve) => {
        let HTMLstring = "";
       //if(task.hasOwnProperty('content')){task.content}else{""};
        try {
            HTMLstring = HTMLstring + '<tr><td id="button_html">' + adapter.config.html_notodo_name + "</td><td>";
            if(adapter.config.html_id){HTMLstring = HTMLstring + "-" + '</td><td>'};
            if(adapter.config.html_priority){HTMLstring = HTMLstring + "-" + '</td><td>'};
            if(adapter.config.html_url){HTMLstring = HTMLstring + "-" + '</td><td>'};
            if(adapter.config.html_project_id){HTMLstring = HTMLstring + "-" + '</td><td>'};
            if(adapter.config.html_comment_cound){HTMLstring = HTMLstring + "-" + '</td><td>'};
            if(adapter.config.html_parent_id){HTMLstring = HTMLstring + "-" + '</td><td>'};
            //neue Funktionen ab 0.9
            if (adapter.config.html_due_date) { HTMLstring = HTMLstring + "-" + '</td><td>' };
            if (adapter.config.html_due_string) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_due_recurring) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_creator_id) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_assignee_id) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_assigner_id) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_labels_id) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_description) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_section_id) { HTMLstring = HTMLstring + "-" + '</td><td>'};
            if (adapter.config.html_created) { HTMLstring = HTMLstring + "-" + '</td><td>'};



            //HTMLstring = HTMLstring + '<button class="button" type="button" onclick="myFunction(' + id + ')">Close</button>' + '</td></tr>';
            HTMLstring = HTMLstring + '</td></tr>';
             
        }
        catch (e) {
            adapter.log.error(`da passt was net:` + HTMLstring + " fehler: " + e);
        }
        resolve(HTMLstring);
    });
}

module.exports = {
    heading_html,
    table_html,
    table_html_empty
    
    
};