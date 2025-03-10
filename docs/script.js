(function () {
	"use strict";

	var i = 0,
		links = document.getElementsByTagName("a"),
		titleEl = document.getElementById("title"),
		titles = [
			// No value should be longer than "Software Engineer",
			// as anything longer will wrap or be cut off.

			// Personal
			'Avid Walker',
			'Backpacker',
			'Board Game Lover',
			'Cyclist',
			'Environmentalist',
			'Feminist',
			'Pun Enthusiast',
			'Vegetarian',

			// Professional
			'CSS Lover',
			'Hacker',
			'Rustacean',
			'Builder',
			'Software Engineer'
		],
		defaultKey = titles.indexOf(titleEl.textContent),
		key = defaultKey,
		pos = titles[key].length,
		paused = true,
		stopped = false,
		writing = false,
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
			{ 'passive': true }
		);
		links[i].addEventListener(
			"focus",
			linkEnter,
			{ 'passive': true }
		);
		links[i].addEventListener(
			"mouseout",
			linkReset,
			{ 'passive': true }
		);
		links[i].addEventListener(
			"blur",
			linkReset,
			{ 'passive': true }
		);
	}

	function run(callback) {
		if (paused) {
			cursor.className = "";
			paused = false;
		}

		callback.call();
	}
	function schedule(callback, timeout) {
		if (timeout > 1200) {
			cursor.className = "blinking";
			paused = true;
		}

		window.setTimeout(run, timeout, callback);
	}

	function chooseTitle() {
		var nextKey = Math.floor(Math.random() * (titles.length - 1));
		key = nextKey >= key ? nextKey + 1 : nextKey;
	}

	function deleteTitle() {
		pos -= 1;
		output.textContent = titles[key].substring(0, pos);

		return pos > 0;
	}

	function writeTitle() {
		pos += 1;
		output.textContent = titles[key].substr(0, pos);

		return pos < titles[key].length;
	}

	function updateTitle() {
		if (stopped) {
			output.textContent = titles[defaultKey];
			cursor.className = "hidden";
		} else if (writing) {
			if (writeTitle()) {
				schedule(updateTitle, 120);
			} else {
				writing = false;
				schedule(updateTitle, Math.floor(Math.random() * 2000) + 3000);
			}
		} else {
			if (!deleteTitle()) {
				chooseTitle();
				writing = true;
			}

			schedule(updateTitle, 100);
		}
	}

	outputWrapper.className = "init";
	schedule(updateTitle, 3000);

	window.addEventListener("keydown", function (e) {
		if (e.defaultPrevented || e.key !== "Escape") {
			return;
		}

		stopped = true;
		updateTitle();
	});
}());
