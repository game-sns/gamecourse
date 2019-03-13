/**
 * Marks file label as read
 * @param labelId id of label to mark
 * @param text optional text to show
 */
function markFileAsRead(labelId, text) {
	document.getElementById(labelId).innerHTML = text + " <img src=\"" + checkedIcon + "\">";
}

/**
 * Counts columns in file
 * @param result reader of file to read
 * @param separator char (or string) which separates one column from the next
 */
function countColumns(result, separator) {
	var riga = result.substr(0, result.indexOf("\n"));
	var counter = 1;
	for (var i = 0; i < riga.length; i++) {
		if (riga[i] === separator) {
			counter++;
		}
	}
	return counter;
}

/**
 * Checks if both files were uploaded
 * @param file1 file1
 * @param file2 file2
 * @returns {boolean} True iff both files were uploaded
 */
function missingUpload(file1, file2) {
	return file1.value === "" || file2.value === "";
}

/**
 * Checks if uploaded files have same value
 * @param file1 blob
 * @param file2 blob
 * @returns {boolean} True iff files have same value
 */
function sameUpload(file1, file2) {
	return file1.value === file2.value
}

/**
 * Check if number of column is the same
 * @param col1 numb column 1
 * @param col2 numb column 2
 * @returns {boolean} True iff number of column is the same
 */
function sameNumberColumns(col1, col2) {
	return col1 === col2;
}

/**
 * Performs various checks on files before running GAME
 */
function checks() {
	return !missingUpload(file1, file2) &&
			!sameUpload(file1, file2) &&
			sameNumberColumns(columns_1, columns_2) &&
			checkSelectedLabels() &&
			checkEmail() &&
			checkPhysicalProp();
}

/**
 * Shows alert boxes with errors
 */
function alertErrors() {
	if (missingUpload(file1, file2)) {
		alert("There is an error with uploaded files: Missing a file");
	} else if (sameUpload(file1, file2)) {
		alert("There is an error with uploaded files: Same files uploaded");
	} else if (!sameNumberColumns(columns_1, columns_2)) {
		alert("There is an error with uploaded files: Different number of columns");
	} else if (!checkSelectedLabels()) {
		var missingLabels = columns_1 - $("#labels_selector").find(":selected").length;
		if (isNaN(missingLabels)) {
			missingLabels = 0;
		}
		if (missingLabels < 0) {
			alert("Too many labels! Please, remove exactly " + (-missingLabels) + " labels");
		} else {
			alert("Too few labels! Please, add exactly " + missingLabels + " more labels");
		}
	} else if (!checkPhysicalProp()) {
		alert("You need to select at least 1 physical proprety");
	} else if (!checkEmail()) {
		alert("Invalid email! Please fix the email address.");
	}
}

/**
 * Sets number of column of file 1
 * @param evt event
 */
function setFileColumnsNumber_1(evt) {
	var reader = new FileReader();
	var file = evt.target.files[0];
	reader.onload = function (progressEvent) {
		columns_1 = countColumns(this.result, ' ');
		/*numFileUploaded1++;
		if (numFileUploaded1 >= 1 && numFileUploaded2 >= 1) {
			if (checks()) {
				setLimit(columns_1);
			}
		}*/
	};
	reader.readAsText(file);
	markFileAsRead("fileInputsLabel", file.name);
}

/**
 * Sets number of column of file 2
 * @param evt event
 */
function setFileColumnsNumber_2(evt) {
	var reader = new FileReader();
	var file = evt.target.files[0];
	reader.onload = function (progressEvent) {
		columns_2 = countColumns(this.result, ' ');
		/*numFileUploaded2++;
		if (numFileUploaded1 >= 1 && numFileUploaded2 >= 1) {
			if (checks()) {
				setLimit(columns_1);
			}
		}*/
	};
	reader.readAsText(file);
	markFileAsRead("fileErrorsLabel", file.name);
}

/**
 * Checks if selected labels correspond to # of columns in the uploaded files
 * @returns {boolean} True iff were selected same # of columns_1
 */
function checkSelectedLabels() {
	var numSelected = $("#labels_selector").find(":selected").length;
	return numSelected === columns_1;
}

/**
 * Checks if was selected at least 1 physicalProp
 * @returns {boolean} True iff was selected at least 1 physicalProp
 */
function checkPhysicalProp() {
	var checks = [];
	var numSelected = 0;
	for (var i = 0; i < 7; i++) {
		checks[i] = document.getElementById('checkbox' + i);
		if (checks[i].checked) numSelected++;
	}
	return numSelected > 0;
}

/**
 * Checks for valid email
 * @returns {boolean} True iff input is a valid email
 */
function checkEmail() {
	var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return re.test($("#email").val());
}

/**
 * Makes button green (shows user that program is ready)
 * @param labelId id of button to change
 */
function markRunButtonReady(labelId) {
	var e = document.getElementById(labelId);
	e.innerHTML = 'You are ready';
	e.classList.remove('alert');
	e.classList.add('success');
}

/**
 * Makes button red (shows user that program is NOT ready)
 * @param labelId id of button to change
 */
function markRunButtonNotReady(labelId) {
	var e = document.getElementById(labelId);
	e.innerHTML = 'You are NOT ready';
	e.classList.add('alert');
	e.classList.remove('success');
}

/**
 * Checks if every input is valid
 */
function checkEverything() {
	if (checks()) {
		markRunButtonReady("run");
	} else {
		markRunButtonNotReady("run");
	}
}

/**
 * Package data in request
 * @returns {Object} all data input by user
 */
function getDataAsObj() {
	var obj = new Object();

	// labels
	for (var i = 0; i < globalLabels.length; i++) {
		obj.LabelsArray = globalLabels;
	}

	// checkbox state
	var checks = [];
	var array = new Array();
	for (var i = 0; i < 7; i++) {
		checks[i] = document.getElementById('checkbox' + i);
		array[i] = checks[i].checked;
		obj.PhysicalProprieties = array;
	}

	// optional files
	var optionalFiles = document.getElementsByName('optional_files');
	if (optionalFiles[0].checked) {
		obj.OptionalFiles = optionalFiles[0].value;
	} else {
		obj.OptionalFiles = optionalFiles[1].value;
	}

	// email
	var email = document.getElementById('email');
	obj.Email = email.value;

	return obj;
}

function showResponse(){
	document.getElementById("server-response").style.display = "block";
	document.getElementById("cover-body").style.display = "block";
	document.getElementById("frost0").scrollIntoView();
}

function injectTextResponse(text){
	document.getElementById("text-response").innerHTML = text;
	showResponse();
}

/**
 * Creates a XMLHttpRequest to send data over
 * @returns {XMLHttpRequest} request to send data
 */
function getXMLHttpRequest() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log("server responded: " + xhr.responseText);
			if(xhr.responseText === "200"){
				console.log("Il server ha risposto 200");
				injectTextResponse("Tutto ok");
			}
			/* 210-219 errori con files
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 220-229 problemi con server (carico...cores...memoria)
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 230-239 list of emission lines??
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 240-249 physical proprieties
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 250-259 errori con optional files
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 260-269 errori con email
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			/* 270-299 altri errori
			if(xhr.responseText === "2XX"){
				CODE
			}
			*/
			else {
				displayBadDialog();
			}
		}
	};
	return xhr;
}

/**
 * Form data with input files
 * @returns FormData with input files
 */
function getFiles() {
	var form = document.getElementById("filesForm");
	var formData = new FormData(form);
	return formData;
}

/**
 * Creates HTML visual output with debug info
 */
function uploadAll() {
	var files = getFiles();
	files.append("meta-data", JSON.stringify(getDataAsObj()))
	getXMLHttpRequest().send(files)
}

/**
 * Sets event listeners
 */
function setCheckEventListeners() {
	var elements = [
		"labels_selector"
	]; // ids of elements to set

	elements.forEach(function (element) {
		document.getElementById(element).onchange = function(evt, params) {
					globalLabels.push(""+params.selected);
		}; // add event listener on change event
	});
}

/**
 * Start program
 */
function init(checkedIconUrl) {
	checkedIcon = checkedIconUrl;
	document.getElementById("fileInputs").addEventListener("change", setFileColumnsNumber_1, false);
	document.getElementById("fileErrors").addEventListener("change", setFileColumnsNumber_2, false);
	setCheckEventListeners();

	$("#run").click(function () {
		checkEverything();
		alertErrors();
		if(checks()){
			var captchaContainer = null;
			var loadCaptcha = function() {
				captchaContainer = grecaptcha.render('captcha_container', {
					'sitekey' : '6LdRLZUUAAAAANgqnksR7BUTb20l4vn_hcaGC5m5',
					'callback' : function(response) {
						//console.log(response);
						uploadAll();
					}
				});
			};
			loadCaptcha();
		}
	});
}

// global vars
var columns_1, columns_2; // number of columns in each input file
var file1 = document.getElementById("fileInputs");
var file2 = document.getElementById("fileErrors");
var numFileUploaded1 = 0;
var numFileUploaded2 = 0;
var globalLabels = new Array();
var checkedIcon = "";


function hideServerResponse(){
	document.getElementById("server-response").style.display = "none";
	document.getElementById("cover-body").style.display = "none";
}

document.body.addEventListener('click', function() { hideServerResponse(); }, true);

document.addEventListener('click', function() { checkEverything(); }, true);

