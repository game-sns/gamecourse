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

alertFileColumns();

/*
Check if both files were uploaded
*/
function missingUpload(file1, file2) {
	if (file1.value === "" || file2.value === "")
		return true;
	else
		return false;
}

/*
Check if uploaded files have same value
*/
function sameUpload(file1, file2) {
	if (file1.value === file2.value)
		return true;
	else
		return false;
}

/**
 * return number of columns in file
 * @param file file to read
 */
var number;
function numberColumns(file) {
	var reader = new FileReader();
	reader.onload = function (progressEvent) {
		number = 0;
		number = countColumns(this.result, ' ');
		//alert("Found " + n_columns + " columns in file");
	};
	reader.readAsText(file);
	// TODO: send file to server and show loading icon
}

function checks() {
	var file1 = document.getElementById("fileInputs");
	var file2 = document.getElementById("fileErrors");

	if ((missingUpload(file1, file2) == false) && (sameUpload(file1, file2) == false) /*&& (numberColumns(blob1) === numberColumns(blob2))*/ ) {
		alert("Uploaded files seems OK");

		var blob1 = file1.files[0];
		var blob2 = file2.files[0];

		alert(numberColumns(blob1));
		alert(numberColumns(blob2));

	} else
		alert("There is something wrong with uploaded files");
}

$("#run").click(function () {
	checks();
});
