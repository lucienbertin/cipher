const _ = require('underscore');

function intervalDistribution(intervals, keyLength) {
	const compatibles = _.map(intervals, i => (i % keyLength) === 0);
	const length = intervals.length;
	const randomDistribution = Math.floor(length / keyLength);
	const compatiblesCount = compatibles.filter(v => v).length;
	return {
		random: randomDistribution,
		count: compatiblesCount,
		delta: compatiblesCount - randomDistribution,
		pct: Math.floor(100 * (compatiblesCount - randomDistribution) / length),
	}
}


function letterDistribution(txt) {
	return _.chain(txt)
	.map(l => l)
	.uniq()
	.map(l => ({ letter: l, count: txt.split(l).length - 1 }))
	.sortBy(d => -d.count)
	.value();
}

module.exports.intervalDistribution = intervalDistribution;
module.exports.letterDistribution = letterDistribution;
