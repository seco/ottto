var through = require('through2');
var NRF24;

if (process.platform == 'linux') {
  NRF = require('nrf');
}


Radio = function(options) {
  if (process.platform == 'linux') {
    this.start();
  }
};


Radio.prototype.start = function() {
  var spiDev = '/dev/spidev0.0',
      cePin = 24, irqPin = 25,
      pipes = [ 0xF0F0F0F0E1, 0xF0F0F0F0D2 ];

  this.radio = NRF24.connect(spiDev, cePin, irqPin);

  this.radio
    .channel(0x4c)
    .transmitPower('PA_MAX')
    .dataRate('2Mbps')
    .crcBytes(2)
    .autoRetransmit({ count: 15, delay: 4000 });

  this.radio.begin(function() {
    var rx = radio.openPipe('rx', pipes[0]),
        tx = radio.openPipe('tx', pipes[1]);

    rx.pipe(this.transforms.reverse)
      .pipe(this.transforms.parse)
      .pipe(this.transforms.delegate);
  });
};


Radio.prototype.transforms = {

  reverse: through(function(message, encoding, next) {
    this.push(message.toString().trim().split('').reverse().join(''));

    next();
  }),


  parse: through(function(message, encoding, next) {
    this.push(JSON.parse(message));

    next();
  }),


  delegate: through(function(message, encoding, next) {
    this.push(message);

    console.log(message);

    ModulesService
      .update({ id: message.id }, { values: message.values })
      .then(next);

    next();
  })

};


module.exports = Radio;
