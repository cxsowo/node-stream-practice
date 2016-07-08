var duplex = require('stream').Duplex,
	util = require('util');

var ServerDuplex = function(opts){
	var opts = opts | {};
	duplex.call(this,opts);
	this.buffer = '';
}

ServerDuplex.prototype._read = function(size) {
	console.log("ServerDuplex _read run");
};

ServerDuplex.prototype._write = function(chunk, encoding, callback) {
	var self = this;
	console.log("ServerDuplex _write run");
	if(chunk){
		console.log("ServerDuplex _write run with chunk : " +  chunk.toString());
		self.buffer += chunk.toString();
		while(self.buffer.indexOf('\n') > 0){
			var str = self.buffer.substring(0,self.buffer.indexOf('\n')+1).replace(/\r?\n/g,'');
			if(str === 'time'){
				var date = new Date();
		 		this.push(date.toString()+'\r\n');
			}
			else if(str === 'end')
				this.push(null);
			else
				this.push('send to me "time" to get time.\r\n');
			self.buffer = self.buffer.substring(self.buffer.indexOf('\n')+1);
		}
	}
    callback();
};

util.inherits(ServerDuplex, duplex);

module.exports = ServerDuplex;