var filepath = 'https://raw.githubusercontent.com/Archetipo95/GAMEplayground/master/input/input/library_labels.dat?token=ALQG36BWdFaeMUgrE8D39hIRvin05BV9ks5aDyrWwA%3D%3D';

$.get(filepath, function (data) {
	var lines = new Array(3024);
	lines = data.split(/\n/);
	var x = document.getElementById("menu");

	for (var line = 0; line < 3024; line++) {

		var option = document.createElement("option");
		option.text = lines[line];
		option.value = lines[line];
		x.add(option);
	}

	//<!--Activate zmultiselect on menu-->
	$("#menu").zmultiselect({
		filter: true,
		filterResult: true,
		selectAll: true,
		get: "zmultiselect",
		placeholder: "Column 1",
		live: '#menu_live'
	});
});
