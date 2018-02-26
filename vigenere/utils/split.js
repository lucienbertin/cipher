const _ = require('underscore');

function split(txt, keyLength) {
	const results = _.range(keyLength).map(i => '');
	_.each(txt, (l, index) => results[index % keyLength] += l);
	return results;
}

module.exports.split = split;