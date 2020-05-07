![Logo](admin/todoist.png)
# ioBroker.todoist2

[![NPM version](http://img.shields.io/npm/v/iobroker.template.svg)](https://www.npmjs.com/package/iobroker.todoist2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.template.svg)](https://www.npmjs.com/package/iobroker.todoist2)
![Number of Installations (latest)](http://iobroker.live/badges/todoist2-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/todoist2-stable.svg)
[![Dependency Status](https://img.shields.io/david/rde-master/iobroker.todoist2.svg)](https://david-dm.org/rde-master/iobroker.todoist2)
[![Known Vulnerabilities](https://snyk.io/test/github/rde-master/ioBroker.todoist2/badge.svg)](https://snyk.io/test/github/rde-master/ioBroker.todoist2)

[![NPM](https://nodei.co/npm/iobroker.todoist2.png?downloads=true)](https://nodei.co/npm/iobroker.todoist2/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/rde-master/ioBroker.todoist2/master.svg)](https://travis-ci.org/rde-master/ioBroker.todoist2)

## ioBroker.Todoist

This Adapater is for integrating todoist

Dieser Adaber dient zur zur Integration von todoist

## Beschreibung

* Adapter liest alle Todolisten aus und legt diese als States an, sodass diese in VIS angezeigt werden können
* ein "send to" Blockly wurde eingefügt um neue Aufgaben anzulegen


# sendTo
Dieser Adapter verfügt über die Möglichtkeit mit sendTo zu arbeiten:
Hier ist der nötige Ausbau:

 ``` 
 sendTo("todoist2", "send", {
     funktion: {name/string - see below!},
     task: {name/string},
     task_id: {number},
     project: {name/string},
     project_id: {number},
     section: {name/string},
     section_id: {number},
     parent: {number},
     order: {number},
     label: {name/string},
     label_id: {number},
     priority: {number},
     date: JJJJ-MM-TT,
     });
 
```

Hier die Liste der funktion:

 ``` 

add_task --> new Task
del_task --> delete Task
add_project --> new Project
del_project --> delete Project
close_task --> close Task 
reopen_task --> reopen Task
add_section --> new Section
del_section --> delete Section

```


# Blockly
Dieser Adapter fürgt ein Blockly todoist in den Bereich sendTo hinzu:
![Logo](blockly.png)




## Changelog

### 0.2.0
* (rde-master) added new Sync Projekt option


### 0.1.5
* (rde-master) added new Tasks option
* (rde-master) added beta of remove olt Objects

### 0.1.0
* (rde-master) added Blackist

### 0.0.7
* (rde-master) Update new functions

### 0.0.5
* (rde-master) Update new functions

### 0.0.1
* (rde-master) initial release

## License
Copyright (c) 2020 rde-master <info@rde-master.de>
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
