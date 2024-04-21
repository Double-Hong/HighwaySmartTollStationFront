<template>
  <div class="login" id="login">
    <h1 style="text-align: center">高速公路智慧收费站智慧运维系统</h1>

    <div id="Input" style="position: absolute;width: 100%;height: 30%;left: 0;bottom: 30%;text-align: center">
      <span>用户名</span>
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" style="width: 50%" v-model="username"
                clearable></el-input>
      <br><br>
      <span>密码</span>
      <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" style="width: 50%" v-model="password" show-password
                clearable></el-input>
    </div>


    <el-button type="primary" style="position: absolute;left: 30%;bottom: 10%" @click="login">登录</el-button>
  </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import request from '../request/request'

const username = ref('')
const password = ref('')


const login = () => {
  console.log(username.value)
  console.log(password.value)
  request.get("/user-info-entity/login").then(res=>{
    console.log(res.data.id)

    console.log(res.data)
  })


}


</script>

<style scoped>
#login {
  position: absolute;
  width: 40%;
  height: 40%;
  background-color: #7385e7;
  left: 30%;
  top: 30%;
}
</style>