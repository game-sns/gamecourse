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
 * Shows number of columns in file
 * @param file file to read
 */
function showNumberColumns(file) {
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        var n_columns = countColumns(this.result, ' ');
        alert("Found " + n_columns + " columns in file");
    };
    reader.readAsText(file);
    // TODO: send file to server and show loading icon
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
                showNumberColumns(file);
                markFileAsRead(element + "Label", file.name);
            }
        });
}

alertFileColumns();
