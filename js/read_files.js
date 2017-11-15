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
 * Shows user number of columns in files
 */
function alertFileColumns() {
	var files = ["fileInputs", "fileErrors"];
	files.forEach(
		function (element) {
			document.getElementById(element).onchange = function () {
				var file = this.files[0];
				markFileAsRead(element + "Label", file.name);
			}
		});
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
 * Performs various checks on files before running GAME
 */
function checks() {
	if (
		(missingUpload(file1, file2) === false) &&
		(sameUpload(file1, file2) === false) &&
		(columns_1 === columns_2)
	) {
		return true;
	} else {
		alert("There is something wrong with uploaded files");
	}
}

/*Limited to 3 selectable elements just for test*/
function setLimit(limit) {
	console.log(limit);
	$('#multiselect_simple').bind('multiselectChange', function (evt, ui) {
		var selectedCount = $("option:selected", this).length;
		$(this).find('option:not(:selected)').prop('disabled', selectedCount >= limit).end().multiselect('refresh');
	});
}

var numFileUploaded = 0;

/**
 * Sets number of column of file 1
 * @param evt event
 */
function setFileColumnsNumber_1(evt) {
	var reader = new FileReader();
	var file = evt.target.files[0];
	reader.onload = function (progressEvent) {
		columns_1 = countColumns(this.result, ' ');
		numFileUploaded++;
		if (numFileUploaded >= 2) {
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
		numFileUploaded++;
		if (numFileUploaded >= 2) {
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

$("#run").click(function () {
});

alertFileColumns();