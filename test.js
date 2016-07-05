var CountLength = require('./src/CountWordsTransform.js');
var fs = require('fs');

var fsStream = fs.createReadStream('1.txt');
fsStream
	.pipe(new CountLength())
	.pipe(process.stdout);

