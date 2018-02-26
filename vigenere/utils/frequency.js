const _ = require('underscore');

function incompleteIntervals(txt, tuple) {
	return _.chain(txt.split(tuple))
	.rest()
	.initial()
	.map(substr => `${tuple}${substr}`.length)
	.value();
}
function intervals(txt, tuple) {
	return _.chain(incompleteIntervals(txt, tuple))
	.map((i, index, incompletes) => {
		return _.chain(incompletes)
		.rest(index)
		.map((j, jndex, rest) => {
			return _.chain(rest).first(jndex + 1).reduce((memo, interval) => memo + interval).value();
		}).value();
	})
	.flatten()
	.value();
}

module.exports.intervals = intervals;
