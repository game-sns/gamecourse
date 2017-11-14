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
	return file1.value === "" || file2.value === "";
}

/*
Check if uploaded files have same value
*/
function sameUpload(file1, file2) {
	return file1.value === file2.value;
}

function checks() {
	var file1 = document.getElementById("fileInputs");
	var file2 = document.getElementById("fileErrors");
	var files = [file1, file2];

	if (
		(missingUpload(file1, file2) === false) &&
		(sameUpload(file1, file2) === false)
    ) {
		alert("Uploaded files seems OK");

        files.forEach(
            function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var numberOfColumns = countColumns(reader.result, " ");
                    alert(
                        "In file \"" + fileContent.name + "\" there are " + numberOfColumns + " columns"
                    );
                };
                var fileContent = file.files[0];
                reader.readAsText(fileContent);
            });
	} else
		alert("There is something wrong with uploaded files");
}

$("#run").click(function () {
	checks();
});
