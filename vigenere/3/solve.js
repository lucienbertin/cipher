const _ = require('underscore');
const raw = require('./raw').raw;
const extractRepeted = require('../../utils/extract-tuple').extractRepeted;
const intervals = require('../utils/frequency').intervals;
const decipher = require('../utils/decipher').decipher;
const cipher = require('../utils/decipher').cipher;
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

const statistics = _.range(2,10).map(kl => ({
	keyLength: kl,
	...intervalDistribution(allIntervals, kl),
}));
statistics.forEach(s => console.log(s));

const splitRaw = split(raw, 3);
const letterDistributions = splitRaw.map(txt => ({
	txt: txt, distribution: letterDistribution(txt),
}));

console.log(letterDistributions[0]);

console.log(decipher('L', 'A')) // K
console.log(decipher('L', 'E')) // G
console.log(decipher('L', 'T')) // R
console.log(decipher('D', 'A')) // C
console.log(decipher('D', 'E')) // Y
console.log(decipher('D', 'T')) // J
console.log(decipher(raw, 'K..'))
console.log(decipher(raw, 'G..'))

// good candidate for first key letter: K -> a lot of A, S