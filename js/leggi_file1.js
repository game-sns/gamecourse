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
}

/**
 * Shows user number of columns of file
 */
document.getElementById('file1').onchange = function () {
    showNumberColumns(this.files[0]);
};
