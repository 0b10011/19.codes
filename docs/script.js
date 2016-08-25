function linkEnter (e) {
	document.body.className = "hover-"
		+ e.target.getAttribute("data-target");
}
function linkReset () {
	document.body.className = '';
}

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i += 1) {
	console.log(links[i]);
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
