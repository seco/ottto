var stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,

    util = require('util');

function ParsingStream(buffer) {
  Writable.call(this);
}

util.inherits(ParsingStream, Writable);

ParsingStream.prototype._write = function(chunk, enc, next) {
  var message = chunk.toString().trim().split('').reverse().join(''),
      parsed = JSON.parse(message);

  console.log(parsed);

  if(typeof next == 'function') next();
};


module.exports = ParsingStream;