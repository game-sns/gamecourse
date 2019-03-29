$("input[type='checkbox']").change(function () {
	if ($(this).is(":checked")) {
		$(this).parent().addClass("blueBackground");
	} else {
		$(this).parent().removeClass("blueBackground");
	}
});

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

	$('input[name="optional_files"]').on('deselect', function () {
		$(this).parent().removeClass("blueBackground");
	});
});

var link = document.getElementById("link_pdf");
link.setAttribute("href", "/static/data/readme_GAME.pdf#page=6");


document.getElementById("show_more").addEventListener("click", show_more);

function show_more() {
	var ele = document.getElementById("espandi");
	ele.classList.toggle("nascondi");
}