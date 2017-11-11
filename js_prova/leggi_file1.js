document.getElementById('file1').onchange = function () {
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function (progressEvent) {

		//console.log(this.result);

		var riga = this.result.substr(0, this.result.indexOf("\n"));
		var conta = 1;
		for (var i = 0; i < riga.length; i++) {
			if (riga[i] === ' ') {
				conta++;
			}
		}
		alert("Nel primo file ci sono " + conta + " colonne");

	}
	reader.readAsText(file);
};
