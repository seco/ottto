import socketIO from 'socket.io-client'
import sailsIO from 'sails.io.js'
import Promise from 'bluebird'

const io = sailsIO(socketIO)
io.sails.url = 'http://192.168.1.11:1337'
io.sails.useCORSRouteToGetCookie = false

class Socket {

  promisified(method) {
    return (url, data) => {
      return new Promise( (resolve, reject) => {
        if(data == undefined) {
          io.socket[method](url, resolve, reject)
        } else {
          io.socket[method](url, data, resolve, reject)
        }
      })
    }
  }

  get(url) {
    return this.promisified('get')(url)
  }

  put(url, data) {
    return this.promisified('put')(url, data)
  }

  post(url, data) {
    return this.promisified('post')(url, data)
  }

  delete(url) {
    return this.promisified('delete')(url)
  }

  on(name, callback) {
    io.socket.on(name, callback)
  }

  off(name, callback) {
    io.socket.off(name, callback)
  }

}

export default new Socket
