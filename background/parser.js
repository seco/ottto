var stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    Buffer = require('buffer'),
    util = require('util');

function ParsingStream(buffer) {
  if(buffer) {
    this.buffer = buffer;
  } else {
    this.buffer = new Buffer();
  }
  Writable.call(this);
}

util.inherits(ParsingStream, Writable);

ParsingStream.prototype._write = function(chunk, enc, next) {
  this buffer = Buffer.concat(this.buffer, chunk);

  next();
};


exports = ParsingStream;