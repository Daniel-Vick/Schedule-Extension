/*var popupInput;

//Sends message to background script and recieves array of classes
chrome.runtime.sendMessage({greeting: "Hello"}, function(response) {
    console.log(response.array);
    popupInput = response.array;
});*/

/* 
A class object that stores the classes information.
*/
function classObj(name, time, length, loc, num, unit, prof, prereq, days) {
    this.cName = name;
    this.timeSlot = time;
    this.classLength = length;
    this.campusloc = loc;
    this.number = num;
    this.units = unit;
    this.professor = prof;
    this.prereqs = prereq;
    this.days = days;
}

function daySlots(slot, day) {
    this.timeSlots = slot;
    this.day = day;
}

/*
Name: AllClassSchedule
Input: Array
Return: Schedule Array
Purpose: Takes an array of classes and adds each to its appropriate time slot
        in a schedule array, which is then returned. 
*/
function AllClassSchedule(classes) {
    var schedule = blankSchedule();
    for (i = 0; i < classes.length; i++) {
        for (j = classes[i].timeSlot; j < classes[i].timeSlot  + classes[i].classLength; j++) {
            if (classes[i].days == "MWF") {
                if (schedule[0][j] == -1) {
                    schedule[0][j] = [classes[i].cName];
                } else {
                    schedule[0][j].push(classes[i].cName);
                }   
            } else {
                if (schedule[1][j] == -1) {
                    schedule[1][j] = [classes[i].cName];
                } else {
                    schedule[1][j].push(classes[i].cName);
                }
            }
        }
    }
    return schedule

}

/*
A schedule object that contains a schedule array
*/
function Schedule(week) {
    this.week = week;
    if (week == -1) {
        this.week = blankSchedule();
    }
}

/*
Name: blankSchedule
Input: None
Return: Schedule array
Purpose: Creates and returns a blank schedule array 
*/
function blankSchedule() {
    var weekBlock = new Array();
        for (i = 0; i < 5; i++) {
            weekBlock[i] = new Array();
        for (j = 0; j < 26; j++) {
            weekBlock[i][j] = -1;
        }
    }
    return weekBlock;
}

function checkCombos(input1, input2, schedule, allSchedule) {
    console.log("Function Called");
    var comboArray = [schedule];
    for (y = input1; y < 2; y++) {
        for (i = input2; i < 26; i++) {
            console.log(y + " " + i);
            if (i == 26) {
                console.log("Error")
            }
            if (allSchedule[y][i] != -1) {
                if (allSchedule[y][i].length == 1) {
                    if ( i > 0) {
                        var containsOld = false;
                        if (allSchedule[y][i].length > 1) {
                            for (var p = 0; p < allSchedule[y][i-1].length; p++) {
                                if (allSchedule[y][i].name == allSchedule[y][i][p].name) {
                                    containsOld = true;
                                }
                            }
                        }
                    }
                        
                    /*if ((i > 0) && (allSchedule[y][i-1].length > 1) && allSchedule[y][i-1].contains && (schedule[y][i-1] != allSchedule[y][i]) {

                     
                    }*/   
                    else {
                        console.log("OneClass" + i);
                        schedule[y][i] = allSchedule[y][i];
                    }
                } else if (i == 0) {
                    comboArray.pop();
                    console.log("Multiple class conflict: " + allSchedule[y][i].length);
                    //Adds the current conflicting class to schedule
                    for (var x = 0; x < allSchedule[y][i].length; x++) {

                        //console.log(i);
                        //onsole.log(allSchedule[y][i]);
                        schedule[y][i] = allSchedule[y][i][x];
                        var conflictClasses = allSchedule[y][i];
                        //console.log(conflictClasses);
                        //console.log("Current conflict: " + allSchedule[y][i][1])
                        //console.log(y + " " + (i + 1))
                        //rintSchedule(schedule);
                        //console.log("i: " + i + " x: " + x);
                        var oldI = i;
                        var oldY = y;
                        newComboArray = checkCombos(y, (i + 1), arrayDuplicate(schedule), allSchedule);
                        //console.log(x);
                        //console.log(conflictClasses);
                        //console.log("Hello" + i);
                        for (newCombo = 0; newCombo < newComboArray.length; newCombo++) {
                            //console.log("Pushing new array");
                            comboArray.push(newComboArray[newCombo]);
                        }
                        //console.log("Old I and Y " + oldI + " " + oldY)
                        //console.log("X: " + x)
                        i = oldI;
                        y = oldY;
                    }
                    return comboArray;
                } else if ( (i > 0) && ((schedule[y][i - 1] == schedule[y][i]) || (!allSchedule[y][i].includes(schedule[y][i])))) {
                    comboArray.pop();
                    console.log("Multiple class conflict: " + allSchedule[y][i].length);
                    //Adds the current conflicting class to schedule
                    for (var x = 0; x < allSchedule[y][i].length; x++) {

                        //console.log(i);
                        //onsole.log(allSchedule[y][i]);
                        schedule[y][i] = allSchedule[y][i][x];
                        var conflictClasses = allSchedule[y][i];
                        //console.log(conflictClasses);
                        //console.log("Current conflict: " + allSchedule[y][i][1])
                        //console.log(y + " " + (i + 1))
                        //rintSchedule(schedule);
                        //console.log("i: " + i + " x: " + x);
                        var oldI = i;
                        var oldY = y;
                        newComboArray = checkCombos(y, (i + 1), arrayDuplicate(schedule), allSchedule);
                        //console.log(x);
                        //console.log(conflictClasses);
                        //console.log("Hello" + i);
                        for (newCombo = 0; newCombo < newComboArray.length; newCombo++) {
                            //console.log("Pushing new array");
                            comboArray.push(newComboArray[newCombo]);
                        }
                        //console.log("Old I and Y " + oldI + " " + oldY)
                        //console.log("X: " + x)
                        i = oldI;
                        y = oldY;
                    }
                    return comboArray;
                } 
            } else {
                //console.log("Empty" + i + y);
            }
        }
    }
    console.log("Returning this schedule");
    printSchedule(schedule);
    return comboArray;
}

/*
Name: printSchedule
Input: Schedule Array
Return: void
Purpose: Takes a schedule array as input and prints it to the console 
*/
function printSchedule(schedule) {
    for (index = 0; index < 8; index++) {
        var printString = "";
        for (j = 0; j < 5; j++) {
            printString += ("[" + schedule[j][index].toString() + "] ");
        }
        console.log(printString);
    }
}

/*
Name: arrayDuplicate
Input: Schedule Array
Return: Schedule array
Purpose: Takes a schedule array as input and returns a duplicate 
         of the input array 
*/
function arrayDuplicate(array) {
    var dupedSchedule = blankSchedule();
    for (x = 0; x < 5; x++) {
        for (y = 0; y < 26; y++) {
            dupedSchedule[x][y] = array[x][y];
        }
    }
    return dupedSchedule;
}

//////////////////////////////////////Main//////////////////////////////////////

//Define class objects
var CS12 = new classObj("CS12", 0, 1, "WLH", 123456, 4, "Alvarado", "CS11", "MWF");
var CS21 = new classObj("CS21", 0, 1, "WLH", 123456, 4, "Alvarado", "CS11", "MWF");
var CS30 = new classObj("CS30", 0, 2, "PCYNH", 123456, 4, "Paturi", "CS11", "MWF");
var classes = [CS12];
var Monday = new daySlots(classes, "Monday")

//Class array
var testClasses = [CS12, CS21, CS30];

//Sort and print schedules
var allCombos = checkCombos(0, 0, blankSchedule(), AllClassSchedule(testClasses));
//console.log(allCombos.length)
for (check = 0; check < allCombos.length; check++) {
    console.log("Schedule: " + check)
    printSchedule(allCombos[check]);
}




/////////////////////////////////Construct HTML/////////////////////////////////
/*var index1 = 0;
var index2 = 0;
var currentSchedule;

var days = document.getElementsByTagName("table");
var monday, tuesday, wednesday, thursday, friday;

var dayArray = [monday, tuesday, wednesday, thursday, friday];
function buildHTMLSchedule(schedule) {
	console.log("Starting HTML build")
	var scheduleHTML = constructEmptyHTMLSchedule();
	var daysHTML = document.getElementsByTagName("table");
    console.log(daysHTML);
	for (index1 = 0; index1 < 5; index1++) {
		//var day = schedule[index1];
		//var blockHTML = daysHTML[index1];
        //console.log(blockHTML);
        if (index1 % 2 === 0) {
    		for (index2 = 0; index2 < 13; index2++) {
    			//if (!(index1 % 2 === 0) && (index2 > 7)) {
    			//} else {
    				//if (schedule[index1][index2] != -1) {
                            //var inputArray = blockHTML.getElementsByTagName("tr");
                            //console.log(inputArray);
                            //console.log(index1 + " " + index2);
        					replaceHTML(schedule);
                            console.log("Exiting ReplaceHTML, index1: " + index1);
                            if (index2 === 8) {
                                //index1 += 1;
                                //index2 = -1;
                            }   
    				//}
    			//}
    		}
        } else {
            for (index2 = 0; index2 < 7; index2++) {
                //if (!(index1 % 2 === 0) && (index2 > 7)) {
                //} else {
                    //if (schedule[index1][index2] != -1) {
                            //var inputArray = blockHTML.getElementsByTagName("tr");
                            //console.log(inputArray);
                            //console.log(index1 + " " + index2);
                            replaceHTML(schedule);
                            console.log("Exiting ReplaceHTML, index1: " + index1);
                            if (index2 === 8) {
                                //index1 += 1;
                                //index2 = -1;
                            }   
                    //}
                //}
            }
        }
	}
}

function constructEmptyHTMLSchedule() {
	var emptyHTMLSchedule = [[],[],[],[],[]];
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 13; j++) {
			if (!(i % 2 === 0) && (j > 7)) {
			} else {
				emptyHTMLSchedule[i][j] = [document.createElement("td").appendChild(document.createTextNode((j + 8) + ":")), document.createTextNode("")];
			}
		}
	}
	return emptyHTMLSchedule;
}


function replaceHTML(schedule) {
    //var block = allCombos[0][index1][index2];
    var infoText = "";
    var indexTime = index2;
    console.log(block);

    var nameText;
    if (index1 % 2 === 0) {
        if (schedule[index1][index2] != -1) {
            infoText = "Professor: " + schedule[index1][index2].professor  + "\n" + "Building: " + schedule[index1][index2].campusloc;
        }
        if (indexTime > 4) {
            nameText = (indexTime - 4) + " PM";
        } else if (indexTime === 4) {
            nameText = (indexTime + 8) + " PM";
        } else {
            nameText = (indexTime + 8) + " AM";
        }
        //if (index1 === 0 && index2 === 0) {
          //  infoText = "Professor: " + CS12.professor + "\n" + "Building: " + CS12.campusloc; 
            //nameText = nameText + " " + CS12.cName;
        //}
    } else {
        if (schedule[index1][index2] != -1) {
            infoText = "Professor: " + schedule[index1][index2].professor  + "\n" + "Building: " + schedule[index1][index2].campusloc;
        }
        switch(indexTime) {
            case 0:
                nameText = "8 AM";
                break;
            case 1:
                nameText = "9:30 AM"
                break;
            case 2:
                nameText = "11 AM"
                break;
            case 3:
                nameText = "12:30 PM";
                break;
            case 4:
                nameText = "2 PM";
                break;
            case 5:
                nameText = "3:30 PM";
                break;
            case 6:
                nameText = "6 PM";
                break;
        }
    }
    console.log("index1: " + index1 + " index2: " + index2);
    var tester = document.getElementsByTagName("table")[index1].getElementsByTagName("tbody")[index2].getElementsByTagName("tr")[0];
    tester.setAttribute("data-target", "#D" + index1 + "H" + index2);
    var tester2 = document.getElementsByTagName("table")[index1].getElementsByTagName("tbody")[index2].getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
    var htmlClassInfo = document.createElement("div")
    htmlClassInfo.setAttribute("class", "accordian-body collapse");
    htmlClassInfo.setAttribute("id", "D" + index1 + "H" + index2);
    var htmlClassInfoText = document.createElement("p");
    htmlClassInfoText.appendChild(document.createTextNode(infoText));
    var htmlClassName = document.createElement("th");
    var htmlClassNameText = document.createTextNode(nameText);
    htmlClassName.appendChild(htmlClassNameText);
    htmlClassInfo.appendChild(htmlClassInfoText);
    tester.removeChild(tester.firstElementChild);
    tester.appendChild(htmlClassName);
    tester2.removeChild(tester2.firstElementChild);
    tester2.appendChild(htmlClassInfo);
}
*/
/*currentSchedule = allCombos[0];
currentSchedule[0][0] = CS12;
currentSchedule[2][0] = CS12;
currentSchedule[4][0] = CS12;
currentSchedule[1][3] = CS30;
currentSchedule[3][3] = CS30;
var block = currentSchedule[0][0];
console.log(block);
console.log(currentSchedule);
buildHTMLSchedule(currentSchedule);*/
