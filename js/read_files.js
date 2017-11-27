var columns_1, columns_2; // number of columns in each input file
var file1 = document.getElementById("fileInputs");
var file2 = document.getElementById("fileErrors");
var blob1 = file1.files[0];
var blob2 = file2.files[0];
/**
 * Marks file label as read
 * @param labelId id of label to mark
 * @param text optional text to show
 */
function markFileAsRead(labelId, text) {
	document.getElementById(labelId).innerHTML = text + "    <img src=\"img/checked.png\">";
}
/**
 * Mark Files button on upload
 */
function FileUploaded() {
	var files = ["fileInputs", "fileErrors"];
	files.forEach(function (element) {
		document.getElementById(element).onchange = function () {
			var file = this.files[0];
			markFileAsRead(element + "Label", file.name);
		}
	});
}
FileUploaded();
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

function sameNumberColumns(col1, col2) {
	return col1 === col2;
}
/**
 * Performs various checks on files before running GAME
 */
function checks() {
	if (
		(missingUpload(file1, file2) === false) && (sameUpload(file1, file2) === false) && (sameNumberColumns(columns_1, columns_2))) {
		return true;
	} else {
		if (missingUpload(file1, file2)) {
			alert("There is an error with uploaded files: Missing a file");
		}
		if (sameUpload(file1, file2)) {
			alert("There is an error with uploaded files: Same files uploaded");
		}
		if (sameNumberColumns(columns_1, columns_2) === false) {
			alert("There is an error with uploaded files: Different number of columns");
		}
	}
}

var numFileUploaded1 = 0;
var numFileUploaded2 = 0;
/**
 * Sets number of column of file 1
 * @param evt event
 */
function setFileColumnsNumber_1(evt) {
	var reader = new FileReader();
	var file = evt.target.files[0];
	reader.onload = function (progressEvent) {
		columns_1 = countColumns(this.result, ' ');
		numFileUploaded1++;
		if (numFileUploaded1 >= 1 && numFileUploaded2 >= 1) {
			if (checks()) {
				setLimit(columns_1);
				loadChoosen();
			}
		}
	};
	reader.readAsText(file);
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
		numFileUploaded2++;
		if (numFileUploaded1 >= 1 && numFileUploaded2 >= 1) {
			if (checks()) {
				setLimit(columns_1);
				loadChoosen();
			}
		}
	};
	reader.readAsText(file);
}
document.getElementById("fileInputs").addEventListener("change", setFileColumnsNumber_1, false);
document.getElementById("fileErrors").addEventListener("change", setFileColumnsNumber_2, false);

var physicalPropSelected = 0;
countPhysicalPropSelected();

function countPhysicalPropSelected() {
	$(".checkbox").change(function () {
		if (this.checked)
			physicalPropSelected++;
		else
			physicalPropSelected--;
	});
}

//return true if was selected at least 1 physicalProp
function checkPhysicalProp(){
	console.log(physicalPropSelected>0);
	return physicalPropSelected>0;	
}

//return true if valid email
function checkEmail() {
	var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return re.test($("#email").val());
}

markRunButtonReady("run");

function markRunButtonReady(labelId) {
	var e = document.getElementById(labelId);
	e.innerHTML = 'You are ready to run';
	e.classList.remove('alert');
	e.className += ' success';

}

function checkEverything(){
	
}

//se tutto ok
	//pulsante verde
		//se premo pulsante run verde
			//controllo captcha
				//se captcha ok
					//invio dati
//se qlk cambia e non va bene
	//pulsante rosso

function printAll() {
	document.getElementById('result').innerHTML = "";
	//$('#result').html("<br />$(form).serializeArray():<br />" + JSON.stringify($('form').serializeArray()));

	//checkbox state
	var checks = [];
	for (var i = 1; i < 8; i++) {
		checks[i] = document.getElementById('checkbox' + i);
		$('#result').append("Checkbox" + i + ": " + checks[i].checked + '<br />');
	}

	//optional files
	var optionalFiles = document.getElementsByName('optional_files');
	if (optionalFiles[0].checked)
		$('#result').append("Optional files: " + optionalFiles[0].value + '<br />');
	else
		$('#result').append("Optional files: " + optionalFiles[1].value + '<br />');

	//email
	var email = document.getElementById('email');
	$('#result').append("Email: " + email.value + '<br />');
}

/* RUN button click*/
$("#run").click(function () {
	printAll();
});