const _ = require('underscore');

function stats(intervals, keyLength) {
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
module.exports.stats = stats;
