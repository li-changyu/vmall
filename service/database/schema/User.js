const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  passWord: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})

userSchema.pre('save', function(next){
  let user = this
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if(err) return next(err)
    // console.log(salt + '' + user.passWord)
    bcrypt.hash(user.passWord, salt, function(err, hash){
      if(err) return next(err)
      user.passWord = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_passWord, passWord) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_passWord, passWord, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

mongoose.model('User', userSchema)