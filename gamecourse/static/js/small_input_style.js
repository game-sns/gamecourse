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

document.getElementById("frost0").addEventListener("click", scompari);

function scompari() {
	document.getElementById("frost0").classList.toggle("mostra");
}