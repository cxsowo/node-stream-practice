var duplex = require('stream').Duplex,
	util = require('util');

var ClientDuplex = function(opts){
	var opts = opts | {};
	duplex.call(this,opts);
}

ClientDuplex.prototype._read = function(size) {
	console.log("ClientDuplex _read run");
};

ClientDuplex.prototype._write = function(chunk, encoding, callback) {
	console.log("ClientDuplex _write run with chunk : " + chunk.toString());
	if(chunk){
		this.emit('serverData', chunk.toString());
	}
    callback();
};

util.inherits(ClientDuplex, duplex);

module.exports = ClientDuplex;