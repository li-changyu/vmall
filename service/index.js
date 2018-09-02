const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

;(async ()=>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'9',passWord:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let user = await User.findOne({}).exec()
    // console.log('------------------------')
    // console.log(user)
    // console.log('------------------------')
})()

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
  ctx.body='<h1>hw</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})