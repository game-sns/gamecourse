/**
 * Limit selectable elements
 * @param limit number of selectable elements
 */
var limit = 0;

function setLimit(colonne) {
	limit = colonne;
}

function getLimit() {
	return limit;
}

function loadChoosen() {
	loadScript("js/chosen.jquery.js", function () {
		//alert('jQuery has been loaded. 1');
		loadScript("js/docsupport/prism.js", function () {
			//alert('jQuery has been loaded. 2');
			loadScript("js/docsupport/init.js", function () {
				//alert('jQuery has been loaded. 3');
				loadScript("js/init.js", function () {
					//alert('jQuery has been loaded. 4');
				});
			});
		});
	});

	function loadScript(url, completeCallback) {
		var script = document.createElement('script'),
			done = false,
			head = document.getElementsByTagName("head")[0];
		script.src = url;
		script.onload = script.onreadystatechange = function () {
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				completeCallback();
				// IE memory leak
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script);
	}
}