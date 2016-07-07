var duplex = require('stream').Duplex,
	util = require('util');

var ServerDuplex = function(opts){
	var opts = opts | {};
	duplex.call(this,opts);
}

ServerDuplex.prototype._read = function(size) {
	console.log("ServerDuplex _read run");
};

ServerDuplex.prototype._write = function(chunk, encoding, callback) {
	console.log("ServerDuplex _write run");
	if(chunk){
		console.log("ServerDuplex _write run with chunk : " +  chunk.toString());
		var str = chunk.toString().replace(/\r?\n/g,'');
		if(str === 'time'){
			var date = new Date();
	 		this.push(date.toString());
		}
		else
			this.push('send to me "time" to get time');
	}
    callback();
		
	// 	console.log('ServerDuplex'+chunk.toString);
	// 	var str = chunk.toString(encoding | 'UTF-8');
	// 	str = str.replace('\r','').replace('\n','');
	// 	if(str === 'time'){
	// 		var date = new Date();
	// 		this._buffer.push(date.toString());
	// 	}
	// 	else
	// 		this._buffer.push('inivalid data');
	// }
	// else
	// 	this._buffer.push(null);
	// callback();
};

util.inherits(ServerDuplex, duplex);

module.exports = ServerDuplex;