/**
 * Marks file label as read
 * @param labelId id of label to mark
 * @param text optional text to show
 */
function markFileAsRead(labelId, text) {
    document.getElementById(labelId).innerHTML = text + "<img src=\"img/checked.png\">";
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
    return (checkSelectedLabels() &&
        checkEmail() && 
		checkPhysicalProp() &&
        missingUpload(file1, file2) === false) &&
        (sameUpload(file1, file2) === false) &&
        (sameNumberColumns(columns_1, columns_2));
}

/**
 * Shows alert boxes with errors
 */
function alertErrors() {
    if (!checkSelectedLabels()) {
        var missingLabels = columns_1 - $("#labels_selector").find(":selected").length;
        if (missingLabels < 0) {
            alert("Too many labels! Please, remove exactly " + (-missingLabels) + " labels");
        } else {
            alert("Too few labels! Please, add exactly " + missingLabels + " labels");
        }
    }

    if (!checkEmail()) {
        alert("Invalid email! Please fix the email address.")
    }
	
	if(!checkPhysicalProp()) {
		alert("You need to select at least 1 physical proprety")
	}

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
            }
		}
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
		numFileUploaded2++;
		if (numFileUploaded1 >= 1 && numFileUploaded2 >= 1) {
			if (checks()) {
				setLimit(columns_1);
            }
		}
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
	for (var i = 1; i < 8; i++) {
		checks[i] = document.getElementById('checkbox' + i);
		if(checks[i].checked) numSelected++;
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
	e.innerHTML = 'You are ready to run';
	e.classList.remove('alert');
	e.classList.add('success');

}

/**
 * Makes button red (shows user that program is NOT ready)
 * @param labelId id of button to change
 */
function markRunButtonNotReady(labelId) {
    var e = document.getElementById(labelId);
    e.innerHTML = 'You are NOT ready to run';
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
 * Creates HTML visual output with debug info
 */
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

/**
 * Sets event listeners
 */
function setCheckEventListeners() {
    var elements = [
        "fileInputs",  // files
        "fileErrors",
        "email",  // email
        "labels_selector",  // labels selector
		"checkbox1",
		"checkbox2",
		"checkbox3",
		"checkbox4",
		"checkbox5",
		"checkbox6",
		"checkbox7",
    ];  // ids of elements to set

    elements.forEach(function (element) {
        document.getElementById(element).onchange = function () {
            checkEverything();
        };  // add event listener on change event
    });
}

/**
 * Start program
 */
function init() {
    document.getElementById("fileInputs").addEventListener("change", setFileColumnsNumber_1, false);
    document.getElementById("fileErrors").addEventListener("change", setFileColumnsNumber_2, false);
    setCheckEventListeners();

    $("#run").click(function () {
        alertErrors();
        printAll();
    });
}

// global vars
var columns_1, columns_2;  // number of columns in each input file
var file1 = document.getElementById("fileInputs");
var file2 = document.getElementById("fileErrors");
var numFileUploaded1 = 0;
var numFileUploaded2 = 0;

// global functions
init();
