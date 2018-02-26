const _ = require('underscore');

function countOccurences(txt, tuple) {
	return txt.split(tuple).length - 1;
}

module.exports.countOccurences = countOccurences;