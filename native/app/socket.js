import socketIO from 'socket.io-client'
import sailsIO from 'sails.io.js'
import Promise from 'bluebird'

const io = sailsIO(socketIO)
io.sails.url = 'http://localhost:1337'
io.sails.useCORSRouteToGetCookie = false

const promisified = (method) => {
  return (url) => {
    return new Promise( (resolve, reject) => {
      io.socket[method](url, resolve, reject)
    })
  }
}

const methods = {
    get: promisified('get'),
    put: promisified('put'),
    post: promisified('post'),
    delete: promisified('delete'),

    on: promisified('on'),
    off: promisified('off'),
}

export default methods
