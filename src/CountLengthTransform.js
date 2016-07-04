var Transform = require('stream').Transform,
    util = require('util');

var CountLength = function(opts) {
  Transform.call(this, opts);
};

util.inherits(CountLength, Transform);

var len = 0;

Transform.prototype._transform = function(chunk, encoding, callback) {
	if(chunk)
		len += chunk.toString(encoding | 'UTF-8').replace(/\r?\n/g,'').length;
	callback();
};

Transform.prototype._flush = function(callback){
	this.push(len.toString());
	callback();
};

module.exports = CountLength;