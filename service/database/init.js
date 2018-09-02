const mongoose = require('mongoose')
const {resolve} = require('path')
const glob = require('glob')

const db = "mongodb://localhost/vmall"

mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    mongoose.connect(db)
    mongoose.connection.on('disconnected', () => {
      console.log('disconnected!')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      }
      reject()
      throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    })
    mongoose.connection.on('error', (err) => {
      console.log('disconnected!')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      }
      reject()
      throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    })
    mongoose.connection.on('open', () => {
      console.log('success!')
      resolve()
    })
  })
}

exports.initSchemas = () => {
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}