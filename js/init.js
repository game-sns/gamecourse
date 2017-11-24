/**
 * Populate labels table
 * @param url where to fetch data
 */
function populateLabelsTable(url) {
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'text',
		success: function (data) {
			var options = data.split("\n");
			for (var i = 0; i < options.length; i++) {
				$("#labels_selector").append(
					options[i]
				)
			}
			$("#labels_selector").trigger("chosen:updated");
		},
		error: function (e) {
			console.log(e.message);
		}
	})
}

populateLabelsTable("data/labels_options.txt");
