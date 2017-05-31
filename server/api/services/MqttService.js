var mosca = require('mosca'),
    server = new mosca.Server({
      port: 1883,
      backend: {
        type: 'mongo',
        url: 'mongodb://localhost:27017/mqtt',
        pubsubCollection: 'ascoltatori',
        mongo: {}
      },
      http: {
        port: 1884,
        bundle: true,
        static: './'
      }
    });

module.exports = server;
