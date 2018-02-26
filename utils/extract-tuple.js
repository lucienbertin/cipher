const _ = require('underscore');
const countOccurences = require('./occurence').countOccurences;

function extract(txt, size) {
	const firstLetters = _.initial(txt, size - 1);
	const tuples = firstLetters.map((v, i) => {
		return { key: txt.substring(i, i + size) };
	});
	return _.uniq(tuples, t => t.key);
}
function extractRepeted(txt, size) {
	const rawTuples = extract(txt, size);
	return rawTuples
	.map(rt => ({ key: rt.key, count: countOccurences(txt, rt.key) }))
	.filter(t => t.count > 1)
	.sort((a, b) => b.count - a.count);  // descending
}

module.exports.extract = extract;
module.exports.extractRepeted = extractRepeted;