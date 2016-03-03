// if(process.platform != 'linux') return;

// var NRF24 = require('nrf'),
//     ParsingStream = require('./parser'),

//     spiDev = '/dev/spidev0.0',
//     cePin = 24, irqPin = 25,
//     pipes = [ 0xF0F0F0F0E1, 0xF0F0F0F0D2 ];

// var nrf = NRF24.connect(spiDev, cePin, irqPin);

// // nrf._debug = true;

// nrf.channel(0x4c)
//   .transmitPower('PA_MAX')
//   .dataRate('2Mbps')
//   .crcBytes(2)
//   .autoRetransmit({ count: 15, delay: 4000 });

// nrf.begin(function () {

//   console.log('Running...');

//   var rx = nrf.openPipe('rx', pipes[0]),
//       tx = nrf.openPipe('tx', pipes[1]),
//       buffer = new Buffer(0),
//       parser = new ParsingStream(buffer);

//       rx.pipe(parser);

// });

var radio = new RadioService();