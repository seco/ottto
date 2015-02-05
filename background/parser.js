var stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,

    util = require('util');

function ParsingStream(buffer) {
  Writable.call(this);
}

util.inherits(ParsingStream, Writable);

ParsingStream.prototype._write = function(chunk, enc, next) {
  console.log('message:', chunk.toString().split('').reverse().join(''));

  if(typeof next == 'function') next();
};


module.exports = ParsingStream;