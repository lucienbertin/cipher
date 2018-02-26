const _ = require('underscore');
const raw = require('./raw').raw;
const extractRepeted = require('../../utils/extract-tuple').extractRepeted;
const intervals = require('../utils/frequency').intervals;
const decipher = require('../utils/decipher').decipher;
const transform = require('../utils/decipher').transform;
const intervalDistribution = require('../utils/stat').intervalDistribution;
const letterDistribution = require('../utils/stat').letterDistribution;
const split = require('../utils/split').split;

const repetedTuples = _.chain(_.range(2,5))
.map(size => extractRepeted(raw, size))
.flatten()
.each(t => t.intervals = intervals(raw, t.key))
.value();

const allIntervals = _.chain(repetedTuples)
.map(t => t.intervals)
.flatten()
.value();

const intervalDistributions = _.range(2,10).map(kl => ({
	keyLength: kl,
	...intervalDistribution(allIntervals, kl),
}));

const splitRaw = split(raw, 3);

const letterDistributions = splitRaw.map(txt => ({
	txt: txt, distribution: letterDistribution(txt),
}));

console.log(letterDistributions[0])
console.log(decipher('JCWSVLIVLVGSJJFJCWCVL', 'PU.'))
console.log(decipher('JCWSVLIVLVGSJJFJCWCVL', 'PUR'))