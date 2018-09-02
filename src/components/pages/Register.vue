<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="loading">马上注册</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '@/serviceAPI/config.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      usernameErrMsg: '',
      passwordErrMsg: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    registerAction () {
      this.checkForm() && this.axiosRegisterUser()
    },
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        console.log('!!!')
        this.usernameErrMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrMsg = ''
      }
      return isOk
    },
    axiosRegisterUser () {
      this.loading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            Toast.success('注册成功')
            this.$router.push('/')
          } else {
            Toast.fail('注册失败')
            this.loading = false
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    }
  }
}
</script>

<style>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>
