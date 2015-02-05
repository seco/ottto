if(process.platform != 'linux') return;

var NRF24 = require('nrf'),
    spiDev = '/dev/spidev0.0',
    cePin = 24, irqPin = 25,
    pipes = [ 0xF0F0F0F0E1, 0xF0F0F0F0D2 ];

var nrf = NRF24.connect(spiDev, cePin, irqPin);

// nrf._debug = true;

nrf.channel(0x4c)
  .transmitPower('PA_MAX')
  .dataRate('1Mbps')
  .crcBytes(2)
  .autoRetransmit({ count: 10, delay: 1000 });

nrf.begin(function () {

  var rx = nrf.openPipe('rx', pipes[0]),
      tx = nrf.openPipe('tx', pipes[1]),
      buffer = new Buffer(0),
      parser = new ParserStream(buffer).pipe(rx);
      // message = null;



  // rx.on('data', function (data) {

  //   if( data.readInt8(0) == 2 ) { // Stopping indicator

  //     try {
  //       message = buffer.toString('utf-8');
  //       console.log(message);
  //     } catch(error) {}

  //     buffer = new Buffer(0);
  //     message = null;
  //     return;

  //   }

  //   buffer = Buffer.concat([buffer, data]);
  // });






  // tx.on('error', function (error) {

  //   console.warn('Error sending reply.', error);

  // });
});
