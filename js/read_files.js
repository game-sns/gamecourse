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
			alert("Missing a file");
		}
		if (sameUpload(file1, file2)) {
			alert("Same files uploaded");
		}
		if (sameNumberColumns(columns_1, columns_2) === false) {
			alert("Different number of columns");
		}
	}
}
/**
 * Limit selectable elements
 * @param limit number of selectable elements
 */

var limit = 0;

function setLimit(colonne) {
	limit = colonne;
}

function getLimit() {
	return limit;
}

function loadChosen() {
	loadScript("js/chosen.jquery.js", function () {
		//alert('jQuery has been loaded. 1');
		loadScript("js/docsupport/prism.js", function () {
			//alert('jQuery has been loaded. 2');
			loadScript("js/docsupport/init.js", function () {
				//alert('jQuery has been loaded. 3');
				loadScript("js/init.js", function () {
					//alert('jQuery has been loaded. 4');
				});
			});
		});
	});

	function loadScript(url, completeCallback) {
		var script = document.createElement('script'),
			done = false,
			head = document.getElementsByTagName("head")[0];
		script.src = url;
		script.onload = script.onreadystatechange = function () {
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				completeCallback();
				// IE memory leak
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script);
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
				loadChosen();
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
				loadChosen();
			}
		}
	};
	reader.readAsText(file);
}
document.getElementById("fileInputs").addEventListener("change", setFileColumnsNumber_1, false);
document.getElementById("fileErrors").addEventListener("change", setFileColumnsNumber_2, false);


function markRunButtonReady(labelId) {
	document.getElementById(labelId).innerHTML = 'You are ready to run';
	document.getElementById(labelId).style.backgroundColor = "green";
}

function stampa() {
	document.getElementById('result').innerHTML = "";
	//$('#result').html("<br />$(form).serializeArray():<br />" + JSON.stringify($('form').serializeArray()));
	
	//checkbox state
	var checks = [];
	for (var i = 1; i < 8; i++) {
		checks[i] = document.getElementById('checkbox' + i);
		$('#result').append("Checkbox" + i + ": " + checks[i].checked + '<br />');
	}
	
	//optional
	var optionalprop = document.getElementsByName('optional_files');
	$('#result').append("Optional files yes: " + optionalprop[0].value + '<br />');
	$('#result').append("Optional files no: " + optionalprop[1].value + '<br />');
	
	//email
	var email = document.getElementById('email');
	$('#result').append("Email: " + email.value + '<br />');
}

/* RUN button click*/
$("#run").click(function () {
	markRunButtonReady("run");
	stampa();
});
