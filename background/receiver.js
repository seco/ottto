var NRF24 = require("nrf"),
    spiDev = "/dev/spidev0.0",
    cePin = 24, irqPin = 25,
    pipes = [ 0xF0F0F0F0E1, 0xF0F0F0F0D2 ];

var nrf = NRF24.connect(spiDev, cePin, irqPin);

nrf.channel(0x4c)
  .transmitPower('PA_MAX')
  .dataRate('1Mbps')
  .crcBytes(2)
  .autoRetransmit({ count: 15, delay: 4000 });

nrf.begin(function () {

  var rx = nrf.openPipe('rx', pipes[0]),
      tx = nrf.openPipe('tx', pipes[1]),
      buffer = new Buffer(0);

  rx.on('data', function (d) {

    if( d.readInt8(0) == 2 ) {
      console.log(
        buffer.toString('utf-8')
      );

      buffer = new Buffer(0);
      return;
    }

    buffer = Buffer.concat([buffer, d]);
  });

  tx.on('error', function (e) {
    console.warn("Error sending reply.", e);
  });
});
