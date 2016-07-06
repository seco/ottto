var wifi = require("Wifi"),
    http = require("http"),

    ssid = "HOME-A7C2",
    key = "chair5974guitar",

    motion = {
      pin: D4,
      state: false
    },

    server = null;


function init() {
  // Connect to the network
  wifi.connect(ssid, { password: key }, onConnect);

  // Create endpoint that the server can ping
  server = http.createServer(onPage).listen(80);

  // Listen for and handle motion changes
  setInterval(checkMotion, 1000);
}


function onConnect() {
  console.log('wifi:connected');
  console.log(wifi.getIP());
}


function onPage(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(getContent());
}


function checkMotion() {
  console.log('motion:change');
  console.log(motion.pin.read());

  send();
}


function send() {
  var content = getContent();

  http
    .request({
      method: 'PUT',
      host: '10.0.0.6',
      port: 1337,
      path: '/api/modules/9',
      header: {
        'Content-Type': 'application/json',
        'Content-Length': content.length
      }
    })
    .end(content);
}


function getContent() {
  return JSON.stringify({
    motion: motion.pin.read()
  });
}


init();

save();
