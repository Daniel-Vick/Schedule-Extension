function classObject(id, type, Section, Days, time, BuildingAndRoom, Professor, Seats) {
	this.ident = id;
	this.classType = type;
	this.section = Section;
	this.days = Days;
	this.classTime = time;
	this.buildingAndRoom = BuildingAndRoom;
	this.professor = Professor;
	this.seats = Seats;
}

function createClass(input) {
	console.log("Entering createClass");
	var id;
	var classType;
	var Section;
	var Days;
	var time;
	var BuildingAndRoom;
	var Professor;
	var Seats;
	var classInfo = input.getElementsByClassName("brdr");
	if (classInfo.length < 10) {
		console.log("Error");
		return;
	}
	console.log(classInfo);
	//console.log(classInfo[2].innerText);

	if (classInfo[2].innerText.length != 6) {
		id = null;
	} else {
		id = classInfo[2].innerText;
	}

	if (classType != null) {
		classType = classInfo[3].innerText;
		Section = classInfo[4].innerText;
		Days = classInfo[5].innerText;
		time = classInfo[6].innerText;
		BuildingAndRoom = classInfo[7].innerText;
		Professor = classInfo[8].innerText;
		Seats = classInfo[9].innerText;
	} else {
		classType = classInfo[3].innerText;
		Section = classInfo[4].innerText;
		Days = classInfo[5].innerText;
		time = classInfo[6].innerText;
		BuildingAndRoom = classInfo[7].innerText;
		Professor = classInfo[8].innerText;
		Seats = null;
	}
	var newClassObject = new classObject(id, classType, Section, Days, time, BuildingAndRoom, Professor, Seats);
	//console.log(newClassObject);
	return newClassObject;
}

function getClassInfo() {
	//console.log("Entering getClassInfo");
	var classObjects = new Array();
	var classInformationArrays = document.getElementsByClassName("sectxt");
	console.log(classInformationArrays.length);
	for (var i = 0; i < classInformationArrays.length; i++) {
		//console.log(i);
		classObjects[i] = (createClass(classInformationArrays[i]));
		//console.log("test")
		//console.log(classInformationArrays[i]);
	}
	//console.log("Class objects " + classObjects);
	return classObjects;
}

//var tct = document.getElementsByClassName("sectxt");
//var tct = document.body.getElementsByClass("sectxt");
//console.log(tct);
chrome.runtime.sendMessage({classArray: getClassInfo()});

//var tct1 = tct
//849757	LE	A00	TuTh	3:30p-4:50p	PCYNH	106	Gillespie, Gary N ↵FULL↵Waitlist(17)	65
