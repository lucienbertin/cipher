const _ = require('underscore');
const CHAR_CODE_A = 'A'.charCodeAt(0);
const ALPHABET_LENGTH = 26;

function cipher(txt, keys) {
	const keyLength = keys.length;
	return _.map(txt, (l, i) => transform(l, keys[i % keyLength])).join('');
}
function decipher(txt, keys) {
	const keyLength = keys.length;
	return _.map(txt, (l, i) => transform(l, keys[i % keyLength], true)).join('');
}

function transform(letter, key, reverse) {
	if (key === '.') {
		return '.';
	}
	const charCode = letter.charCodeAt(0) - CHAR_CODE_A;
	const keyCode = reverse ? ALPHABET_LENGTH - key.charCodeAt(0) + CHAR_CODE_A - 1 : key.charCodeAt(0) - CHAR_CODE_A + 1;
	const newCharcode = (charCode + keyCode) % ALPHABET_LENGTH;
	return String.fromCharCode(CHAR_CODE_A + newCharcode);
}

module.exports.transform = transform;
module.exports.decipher = decipher;
module.exports.cipher = cipher;