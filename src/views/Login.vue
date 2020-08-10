<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="登录">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="loginUsername" placeholder="请输入用户名" />
        </van-cell-group>
        <van-cell-group>
          <van-field required clearable label="密码" v-model="loginPassword" placeholder="请输入密码" />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="loginHandle">登录</van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
        <van-cell-group>
          <van-field required clearable label="用户名" v-model="registUsername" placeholder="请输入用户名" />
        </van-cell-group>
        <van-cell-group>
          <van-field
            required
            clearable
            type="password"
            label="密码"
            v-model="registPassword"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="registHandle">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
    <van-button type="info" size="large" to="/">不登录了，就随便逛逛~</van-button>
  </div>
</template>

<script>
import { regist, login } from "@/service/api.js";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      active: 0,
      loginUsername: "",
      loginPassword: "",
      registUsername: "",
      registPassword: ""
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    //用户注册处理函数
    registHandle() {
      regist({
        userName: this.registUsername,
        password: this.registPassword
      }).then(res => {
        console.log(res);
        if(res.data.code == 200){
          this.$toast.success('注册成功')
          this.registUsername = ''
          this.registPassword = ''
        }else{
          this.$toast.fail(res.data.message)
        }
      }).catch(err => {
        console.log(err);
        this.$toast.fail('注册失败')
      })
    },
    loginHandle() {
      login({
        userName: this.loginUsername,
        password: this.loginPassword
      }).then(res => {
        console.log(res,'555555')
        if(res.data.code == 200){
          this.$toast.success('登录成功')
          this.loginAction(res.data.userInfo)
          this.$router.push('/')
          console.log(this.$store.state.userInfo)
        }else if(res.data.code == 201){
          this.$toast.fail('密码错误')
        }else{
          this.$toast.fail('用户名不存在')
        }
      }).catch(err => {
        console.log(err)
        this.$toast.fail('登录失败')
      })
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-field__control {
  height: 24px;
}
</style>