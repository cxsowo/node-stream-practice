const IN_WORD = 1,NOT_IN_WORD = 0;

var Transform = require('stream').Transform,
    util = require('util');

var CountWords = function(opts) {
  Transform.call(this, opts);
};

util.inherits(CountWords, Transform);

var len = 0,state = NOT_IN_WORD;

CountWords.prototype._transform = function(chunk, encoding, callback) {
	if(chunk){
		var str = chunk.toString(encoding | 'UTF-8');
		var i;
		for(i = 0; i < str.length; i++)
			switch(state){
				case NOT_IN_WORD:
					if(str[i].match(/^[a-zA-Z0-9-]/g))
						state = IN_WORD;
				break;
				case IN_WORD:
					if(!str[i].match(/^[a-zA-Z0-9-]/g)){
						len++;
						state = NOT_IN_WORD;
					}
				break;
			}
	}
	callback();
};

CountWords.prototype._flush = function(callback){
	if(state === IN_WORD)
		len++;
	this.push(len.toString());
	callback();
};

module.exports = CountWords;