'use strict';

goog.provide('Blockly.JavaScript.Sendto');

goog.require('Blockly.JavaScript');

// --- SendTo todoist new Task --------------------------------------------------
Blockly.Words['todoist']            			= {'en': 'todoist',                     	'de': 'todoist'};
Blockly.Words['todoist_function']     			= {'en': 'fuction',                     	'de': 'Funktion'};
Blockly.Words['todoist_function_add_task']  	= {'en': 'add Task',                        'de': 'Task hinzufügen'};
Blockly.Words['todoist_function_del_task']    	= {'en': 'delete Task',                     'de': 'Task löschen'};
Blockly.Words['todoist_function_add_project']  	= {'en': 'add Project',                    	'de': 'Projekt hinzufügen'};
Blockly.Words['todoist_function_del_project']  	= {'en': 'delete Project',                 	'de': 'Projekt löschen'};
Blockly.Words['todoist_function_close_task']  	= {'en': 'close Task',                    	'de': 'Erledige Task'};
Blockly.Words['todoist_function_reopen_task']  	= {'en': 'reopen Task',                 	'de': 'Wiederöffne Task'};
Blockly.Words['todoist_function_add_section']  	= {'en': 'add section',                    	'de': 'section hinzufügen'};
Blockly.Words['todoist_function_del_section'] 	= {'en': 'del section',                 	'de': 'section löschen'};
Blockly.Words['todoist_task']   				= {'en': 'task',                        	'de': 'Aufgabe'};
Blockly.Words['todoist_task_id']   				= {'en': 'task ID',                        	'de': 'Aufgabe ID'};
Blockly.Words['todoist_project']    			= {'en': 'Project (optional)',      		'de': 'Projekt (optional)'};
Blockly.Words['todoist_project_id']    			= {'en': 'Project ID (optional)',        	'de': 'Projekt ID (optional)'};
Blockly.Words['todoist_section']    			= {'en': 'section (optional)',      		'de': 'Sections (optional)'};
Blockly.Words['todoist_section_id']    			= {'en': 'section ID (optional)',        	'de': 'Sections ID (optional)'};
Blockly.Words['todoist_parent'] 				= {'en': 'parent ID (optional)',        	'de': 'Übergeordnete ID (optional)'};
Blockly.Words['todoist_order']    				= {'en': 'order Number (optional)',     	'de': 'Reihenfolge Nummer (optional)'};
Blockly.Words['todoist_label']    				= {'en': 'Label (optional)',     			'de': 'Label (optional)'};
Blockly.Words['todoist_label_id']    			= {'en': 'Label IDs (optional/array)',     	'de': 'Label IDs (optional/Array)'};
Blockly.Words['todoist_priority']   		 	= {'en': 'priority (optional/1-4)',     	'de': 'Priorität (optional/1-4)'};
Blockly.Words['todoist_date']    				= {'en': 'date (optional)',     			'de': 'Datum (optional)'};
Blockly.Words['todoist_anyInstance']    		= {'en': 'all instances',            		'de': 'Alle Instanzen'};
Blockly.Words['todoist_tooltip']        		= {'en': 'Send message to todoist',     	'de': 'Setze einen Eintrag bei todoist'};
Blockly.Words['todoist_log']        			= {'en': 'log level',               		'de': 'Loglevel'};
Blockly.Words['todoist_log_none']       		= {'en': 'none',                        	'de': 'keins'};
Blockly.Words['todoist_log_info']   			= {'en': 'info',                        	'de': 'info'};
Blockly.Words['todoist_log_debug']		    	= {'en': 'debug',                       	'de': 'debug'};
Blockly.Words['todoist_log_warn']       		= {'en': 'warning',                     	'de': 'warning'};
Blockly.Words['todoist_log_error']  			= {'en': 'error',                       	'de': 'error'};
Blockly.Words['todoist_help']           		= {'en': 'https://github.com/rde-master/ioBroker.todoist2/blob/master/README.md', 'de': 'https://github.com/rde-master/ioBroker.todoist2/blob/master/README.md'};
// --- SendTo todoist delete Task --------------------------------------------------


Blockly.Sendto.blocks['todoist'] =
    '<block type="todoist">'
    + '     <value name="INSTANCE">'
    + '     </value>'
    + '     <value name="FUNKTION">'
    + '     </value>'    
    + '     <value name="TASK">'
    + '         <shadow type="text">'
    + '             <field name="TEXT">new Task</field>'
    + '         </shadow>'
    + '     </value>'
    + '     <value name="TASKID">'
    + '     </value>'   
    + '     <value name="PROJECT">'
    + '     </value>'
    + '     <value name="PROJECTID">'
    + '     </value>'
    + '     <value name="SECTION">'
    + '     </value>'
    + '     <value name="SECTIONID">'
    + '     </value>'
    + '     <value name="PARENT">'
    + '     </value>'
    + '     <value name="ORDER">'
    + '     </value>'
    + '     <value name="LABEL">'
    + '     </value>'    
    + '     <value name="LABELID">'
    + '     </value>'
    + '     <value name="PRIORITY">'
    + '     </value>'
	+ '     <value name="DATE">'
    + '     </value>'
    + '     <value name="LOG">'
    + '     </value>'
    + '</block>';




Blockly.Blocks['todoist'] = {
    init: function() {
        var options = [[Blockly.Words['todoist_anyInstance'][systemLang], '']];
        if (typeof main !== 'undefined' && main.instances) {
            for (var i = 0; i < main.instances.length; i++) {
                var m = main.instances[i].match(/^system.adapter.todoist2.(\d+)$/);
                if (m) {
                    var k = parseInt(m[1], 10);
                    options.push(['todoist2.' + k, '.' + k]);
                }
            }
            if (options.length === 0) {
                for (var u = 0; u <= 4; u++) {
                    options.push(['todoist2.' + u, '.' + u]);
                }
            }
        } else {
            for (var n = 0; n <= 4; n++) {
                options.push(['todoist2.' + n, '.' + n]);
            }
        }

        this.appendDummyInput('INSTANCE')
            .appendField(Blockly.Words['todoist'][systemLang])
            .appendField(new Blockly.FieldDropdown(options), 'INSTANCE');
		
		this.appendDummyInput('FUNKTION')
            .appendField(Blockly.Words['todoist_function'][systemLang])
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['todoist_function_add_task'][systemLang],  '"add_task"'],
                [Blockly.Words['todoist_function_del_task'][systemLang],  '"del_task"'],
                [Blockly.Words['todoist_function_add_project'][systemLang],  '"add_project"'],
                [Blockly.Words['todoist_function_del_project'][systemLang],  '"del_project"'],
                [Blockly.Words['todoist_function_close_task'][systemLang],  '"close_task"'],
                [Blockly.Words['todoist_function_reopen_task'][systemLang],  '"reopen_task"'],
                [Blockly.Words['todoist_function_add_section'][systemLang],  '"add_section"'],
                [Blockly.Words['todoist_function_del_section'][systemLang],  '"del_section"']
            ]), 'FUNKTION');

        this.appendValueInput('TASK')
            .appendField(Blockly.Words['todoist_task'][systemLang]);
            
		var input = this.appendValueInput('TASKID')
			.setCheck('Number')
            .appendField(Blockly.Words['todoist_task_id'][systemLang]);

        	input = this.appendValueInput('PROJECT')
            .appendField(Blockly.Words['todoist_project'][systemLang]);
            
            input = this.appendValueInput('PROJECTID')
            .setCheck('Number')
            .appendField(Blockly.Words['todoist_project_id'][systemLang]);
            
            input = this.appendValueInput('SECTION')
            .appendField(Blockly.Words['todoist_section'][systemLang]);
            
            input = this.appendValueInput('SECTIONID')
            .setCheck('Number')
            .appendField(Blockly.Words['todoist_section_id'][systemLang]);
            
            input = this.appendValueInput('PARENT')
            .setCheck('Number')
            .appendField(Blockly.Words['todoist_parent'][systemLang]);
            
            input = this.appendValueInput('ORDER')
            .setCheck('Number')
            .appendField(Blockly.Words['todoist_order'][systemLang]);
            
            input = this.appendValueInput('LABEL')
            .appendField(Blockly.Words['todoist_label'][systemLang]);
            
            input = this.appendValueInput('LABELID')
            .appendField(Blockly.Words['todoist_label_id'][systemLang]);
            
            input = this.appendValueInput('PRIORITY')
            .setCheck('Number')
            .appendField(Blockly.Words['todoist_priority'][systemLang]);
            
            input = this.appendValueInput('DATE')
            .setCheck('Date')
            .appendField(Blockly.Words['todoist_date'][systemLang]);

        this.appendDummyInput('LOG')
            .appendField(Blockly.Words['todoist_log'][systemLang])
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['todoist_log_none'][systemLang],  ''],
                [Blockly.Words['todoist_log_info'][systemLang],  'log'],
                [Blockly.Words['todoist_log_debug'][systemLang], 'debug'],
                [Blockly.Words['todoist_log_warn'][systemLang],  'warn'],
                [Blockly.Words['todoist_log_error'][systemLang], 'error']
            ]), 'LOG');

            

        if (input.connection) input.connection._optional = true;

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words['todoist_tooltip'][systemLang]);
        this.setHelpUrl(Blockly.Words['todoist_help'][systemLang]);
    }
};

Blockly.JavaScript['todoist'] = function(block) {
    var dropdown_instance = block.getFieldValue('INSTANCE');
    var dropdown_funktion = block.getFieldValue('FUNKTION');
    var logLevel = block.getFieldValue('LOG');
    var value_task = Blockly.JavaScript.valueToCode(block, 'TASK', Blockly.JavaScript.ORDER_ATOMIC);
    var value_task_id = Blockly.JavaScript.valueToCode(block, 'TASKID', Blockly.JavaScript.ORDER_ATOMIC);
    var value_projekt = Blockly.JavaScript.valueToCode(block, 'PROJECT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_projekt_id = Blockly.JavaScript.valueToCode(block, 'PROJECTID', Blockly.JavaScript.ORDER_ATOMIC);
    var value_section = Blockly.JavaScript.valueToCode(block, 'SECTION', Blockly.JavaScript.ORDER_ATOMIC);
	var value_section_id = Blockly.JavaScript.valueToCode(block, 'SECTIONID', Blockly.JavaScript.ORDER_ATOMIC);
    var value_parent = Blockly.JavaScript.valueToCode(block, 'PARENT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_order = Blockly.JavaScript.valueToCode(block, 'ORDER', Blockly.JavaScript.ORDER_ATOMIC);
    var value_label = Blockly.JavaScript.valueToCode(block, 'LABEL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_label_id = Blockly.JavaScript.valueToCode(block, 'LABELID', Blockly.JavaScript.ORDER_ATOMIC);
    var value_priority = Blockly.JavaScript.valueToCode(block, 'PRIORITY', Blockly.JavaScript.ORDER_ATOMIC);
    var value_date = Blockly.JavaScript.valueToCode(block, 'DATE', Blockly.JavaScript.ORDER_ATOMIC);

    
    var text = '{\n';
    if(value_task) text += '   task: ' + value_task + ',\n';
    if(value_task_id) text += '   task_id: ' + value_task_id + ',\n';
    if(dropdown_funktion) text += ' funktion: ' + dropdown_funktion + ',\n';
	if(value_projekt) text += '   project: ' + value_projekt + ',\n';
	if(value_projekt_id) text += '   project_id: ' + value_projekt_id + ',\n';
    if(value_section) text += '   section: ' + value_section + ',\n';
    if(value_section_id) text += '   section_id: ' + value_section_id + ',\n';
    if(value_parent) text += '   parent: ' + value_parent + ',\n';
    if(value_order) text += '   order: ' + value_order + ',\n';
    if(value_label) text += '   label: ' + value_label + ',\n';
    if(value_label_id) text += '   label id: ' + value_label_id + ',\n';
    if(value_priority) text += '   priority: ' + value_priority + ',\n';
    if(value_date) text += '   date: ' + value_date + ',\n';
    text += '   }';
   
   var logText;
    if (logLevel) {
        //logText = 'console.' + logLevel + '("todoist' + text + '")';'\n';
        logText = '';
    } else {
        logText = '';
    }
   

    return 'sendTo("todoist2' + dropdown_instance + '", "send", ' + text + ');\n' + logText;
	
	/*
    return 'sendTo("todoist' + dropdown_instance + '", "send", {\n    task: ' + value_task, ' \n    ' + 
        (value_username.startsWith('-',1) ? 'chatId: ' : 'user: ') + value_username : '') +
        (silent === 'TRUE' ? ', \n    disable_notification: true' : '') +
        (parsemode !== 'default' ? ', \n    parse_mode: "' + parsemode + '"': '') +
        '\n});\n' +
        logText;
        */
};


