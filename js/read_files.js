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
	files.forEach(
		function (element) {
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
		(missingUpload(file1, file2) === false) &&
		(sameUpload(file1, file2) === false) &&
		(sameNumberColumns(columns_1, columns_2))
	) {
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
function setLimit(limit) {
	//TODO

	alert("LIMIT SET TO " + limit);
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
			}
		}
	};
	reader.readAsText(file);
}

document.getElementById("fileInputs").addEventListener(
	"change", setFileColumnsNumber_1, false
);
document.getElementById("fileErrors").addEventListener(
	"change", setFileColumnsNumber_2, false
);


$("input[type='checkbox']").change(function () {
	if ($(this).is(":checked")) {
		$(this).parent().addClass("blueBackground");
	} else {
		$(this).parent().removeClass("blueBackground");
	}
});

/* RADIO BUTTONS DONT SUPPORT UNCHECKED TRIGGER SO THIS IS THE SOLUTION*/
$("input[type='radio']").change(function () {
	if ($(this).is(":checked")) {
		$(this).parent().addClass("blueBackground");
	}
});

function setupDeselectEvent() {
	var selected = {};
	$('input[type="radio"]').on('click', function () {
		if (this.name in selected && this != selected[this.name])
			$(selected[this.name]).trigger("deselect");
		selected[this.name] = this;
	}).filter(':checked').each(function () {
		selected[this.name] = this;
	});
}

$(document).ready(function () {
	setupDeselectEvent(true);

	$('input[name="optional"]').on('deselect', function () {
		$(this).parent().removeClass("blueBackground");
	});
});

/* RUN button click*/
$("#run").click(function () {});
