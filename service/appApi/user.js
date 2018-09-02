const mongoose = require('mongoose')

const Router = require('koa-router')
let router = new Router()
router.get('/', async(ctx)=>{
    ctx.body = "这是用户操作首页"
})
router.post('/register', async(ctx)=>{
    // ctx.body = ctx.request.body
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        message: '注册失败:' + err
      }
    })
})

router.post('/login', async(ctx) => {
  let loginUser = ctx.request.body
  // console.log(loginUser)
  let userName = loginUser.userName
  let passWord = loginUser.passWord
  const User = mongoose.model('User')
  await User.findOne({userName: userName}).exec().then(async(result) => {
    console.log(result)
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(passWord, result.passWord)
        .then((isMatch) => {
          console.log('match')
          ctx.body = {
            code: 200,
            message: isMatch
          }
          console.log(ctx.body)
        })
        .catch(err => {
          console.log('emmmm')
          console.log(err)
          ctx.body = {
            code: 500,
            message: err
          }
        })
      } else {
        console.log('emmmm')
      ctx.body = {
        code: 200,
        message: 'no user!'
      }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  })

})
module.exports = router