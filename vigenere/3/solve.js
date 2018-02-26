const _ = require('underscore');
const raw = require('./raw').raw;
const extractRepeted = require('../../utils/extract-tuple').extractRepeted;
const intervals = require('../utils/frequency').intervals;
const decipher = require('../utils/decipher').decipher;
const transform = require('../utils/decipher').transform;
const stats = require('../utils/stat').stats;

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
	...stats(allIntervals, kl),
}));
statistics.forEach(s => console.log(s));


// console.log(repetedTuples);

// console.log(decipher('ABCDEFGHIJKLMNOPQRSTUVWXYZ','AZ.'));