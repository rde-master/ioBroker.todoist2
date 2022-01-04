'use strict';


async function table_json(adapter, task, prio_neu) {
    return new Promise(async (resolve) => {
        let baue_json;
       //if(task.hasOwnProperty('content')){task.content}else{""};
        try {
            baue_json = '{"'+adapter.config.json_name+'":"' + task.content + '"';
            
            if (adapter.config.json_id) { if(task.hasOwnProperty('id')){ baue_json = baue_json + ', "' + adapter.config.json_id_name + '":"' + task.id + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_priority) { if(task.hasOwnProperty('priority')){ baue_json = baue_json + ', "' + adapter.config.json_priority_name + '":"' + prio_neu + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_priority_name + '":"' + " " + '"' } };
            if (adapter.config.json_url) { if(task.hasOwnProperty('url')){ baue_json = baue_json + ', "' + adapter.config.json_url_name + '":"' + task.url + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_url_name + '":"' + " " + '"' } };
            if (adapter.config.json_project_id) { if(task.hasOwnProperty('project_id')){ baue_json = baue_json + ', "' + adapter.config.json_project_name + '":"' + task.project_id + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_project_name + '":"' + " " + '"' } };
            if (adapter.config.json_comment_cound) { if(task.hasOwnProperty('comment_count')){ baue_json = baue_json + ', "' + adapter.config.json_comment_name + '":"' + task.comment_count + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_comment_name + '":"' + " " + '"' } };
            if (adapter.config.json_parent_id) { if(task.hasOwnProperty('comment_count')){ baue_json = baue_json + ', "' + adapter.config.json_parent_name + '":"' + task.parent_id + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_parent_name + '":"' + " " + '"' } };
            //neue felder ab 0.9

            if (adapter.config.json_due_date) { if(task.hasOwnProperty('date')){ baue_json = baue_json + ', "' + adapter.config.json_due_date_name + '":"' + task.due.date + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_date_name + '":"' + " " + '"' } };
            if (adapter.config.json_due_string) { if(task.hasOwnProperty('string')){ baue_json = baue_json + ', "' + adapter.config.json_due_string_name + '":"' + task.due.string + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_string_name + '":"' + " " + '"' } };
            if (adapter.config.json_due_recurring) { if(task.hasOwnProperty('recurring')){ baue_json = baue_json + ', "' + adapter.config.json_due_recurring_name + '":"' + task.due.recurring + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_due_recurring_name + '":"' + " " + '"' } };
            if (adapter.config.json_creator_id) { if(task.hasOwnProperty('creator')){ baue_json = baue_json + ', "' + adapter.config.json_creator_id_name + '":"' + task.creator + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_creator_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_assignee_id) { if(task.hasOwnProperty('assignee')){ baue_json = baue_json + ', "' + adapter.config.json_assignee_id_name + '":"' + task.assignee + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_assignee_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_assigner_id) { if(task.hasOwnProperty('assigner')){ baue_json = baue_json + ', "' + adapter.config.json_assigner_id_name + '":"' + task.assigner + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_assigner_id_name + '":"' + " " + '"' } };
            if (adapter.config.json_labels_id) { if(task.hasOwnProperty('labels')){ baue_json = baue_json + ', "' + adapter.config.json_labels_name + '":"' + task.labels + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_labels_name + '":"' + " " + '"' } };
            if (adapter.config.json_description) { if(task.hasOwnProperty('description')){ baue_json = baue_json + ', "' + adapter.config.json_description_name + '":"' + task.description + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_description_name + '":"' + " " + '"' } };
            if (adapter.config.json_section_id) { if(task.hasOwnProperty('section')){ baue_json = baue_json + ', "' + adapter.config.json_section_id_name + '":"' + task.section + '"' }else{baue_json = baue_json + ', "' + adapter.config.json_section_id_name + '":"' + " " + '"' } };
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
       
       
        try {
            


            
        }
        catch (e) {
            adapter.log.error(" fehler: " + e);
        }
        //resolve();
    });
}

module.exports = {

    table_json,
    table_json_empty
    
    
};