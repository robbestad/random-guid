"use strict";

function randomGuid(numberOfBlocks) {
	num = numberOfBlocks || 4;

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	var output = '';
	var num = numberOfBlocks;
	while (num > 0) {
		output += s4();
		if (num > 1) output += "-";
		num--;
	}
	return output;
}
module.exports = randomGuid;