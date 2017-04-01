import socketIO from 'socket.io-client'
import sailsIO from 'sails.io.js'
import Promise from 'bluebird'

const io = sailsIO(socketIO)
io.sails.url = 'http://localhost:1337'
io.sails.useCORSRouteToGetCookie = false

const promisified = (method) => {
  return (url, data) => {
    return new Promise( (resolve, reject) => {
      if(method == 'get') {
        io.socket[method](url, resolve, reject)
      } else {
        io.socket[method](url, data, resolve, reject)
      }
    })
  }
}

const methods = {
    get: promisified('get'),
    put: promisified('put'),
    post: promisified('post'),
    delete: promisified('delete'),

    on: io.socket.on,
    off: io.socket.off,
}

export default methods
