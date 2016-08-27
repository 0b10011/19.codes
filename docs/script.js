(function () {
	"use strict";

	var i = 0,
		links = document.getElementsByTagName("a"),
		titleEl = document.getElementById("title"),
		key = 0,
		titles = [
			// No value should be longer than "Software Engineer"
			// It also *has* to be the first entry
			'Software Engineer',

			'Backpacker',
			'Bicyclist',
			'Board Game Lover',
			'Feminist',
			'Vegetarian',
			'Web Developer'
		],
		title = titles[key],
		titleLength = titles[key].length,
		pos = title.length,
		titleCount = titles.length - 1,
		writing = 1,
		outputWrapper = document.getElementById("output-wrapper"),
		output = document.getElementById("output"),
		cursor = document.getElementById("cursor");

	function linkEnter(e) {
		document.body.className = "hover-"
			+ e.target.getAttribute("data-target");
	}
	function linkReset() {
		document.body.className = '';
	}

	for (i = 0; i < links.length; i += 1) {
		links[i].addEventListener(
			"mouseover",
			linkEnter,
			{'passive': true}
		);
		links[i].addEventListener(
			"focus",
			linkEnter,
			{'passive': true}
		);
		links[i].addEventListener(
			"mouseout",
			linkReset,
			{'passive': true}
		);
		links[i].addEventListener(
			"blur",
			linkReset,
			{'passive': true}
		);
	}

	function chooseTitle() {
		var nextKey = Math.floor(Math.random() * titleCount);

		cursor.className = "blinking";

		if (nextKey >= key) {
			nextKey += 1;
		}
		key = nextKey;
		writing = -1;
	}
	function deleteTitle() {
		cursor.className = "";

		if (title.length === 0) {
			pos = 0;
			writing = 1;
			title = titles[key];
			titleLength = title.length;
			return;
		}

		title = title.substring(0, title.length - 1);

		output.textContent = title;
	}
	function writeTitle() {
		cursor.className = "";

		if (pos === titleLength) {
			writing = 0;
			return;
		}

		pos += 1;
		title = titles[key].substr(0, pos);

		output.textContent = title;
	}
	function changeTitle() {
		if (writing === -1) {
			deleteTitle();
			window.setTimeout(changeTitle, 100);
		} else if (writing === 1) {
			writeTitle();
			window.setTimeout(changeTitle, 120);
		} else {
			chooseTitle();
			window.setTimeout(changeTitle, 2000);
		}
	}
	outputWrapper.className = "init";
	output.textContent = title;
	changeTitle();
}());
