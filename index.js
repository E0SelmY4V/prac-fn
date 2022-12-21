'use strict';

for (const n of [
	'file',
	'lang',
]) module.exports[n] = require('./' + n);
