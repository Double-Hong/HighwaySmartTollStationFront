<template>
  <el-card
      style="background-image: url('https://ts1.cn.mm.bing.net/th/id/R-C.112a7a0f12d0ac5af50eed60ee202665?rik=Ojlnobn%2bjaSAmg&riu=http%3a%2f%2fm.1234wu.com%2fbjtp%2f154.jpg&ehk=Hz1Jm%2ftTY6D3mW057kRpzZAqyBmPZ5QrOz2rusc9ybA%3d&risl=&pid=ImgRaw&r=0') ;
      background-size:100% 100%;position: absolute;width: 100% ;height: 100%;">
    <el-card class="login" id="login">
      <h1 style="text-align: center">高速公路智慧收费站智慧运维系统</h1>

      <div id="Input" style="position: absolute;width: 100%;height: 30%;left: 0;bottom: 30%;text-align: center">
        <el-form label-width="200px" la>
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" style="width: 50%" v-model="username"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" style="width: 50%" v-model="password"
                      show-password
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-button type="primary" style="position: absolute;left: 42%;bottom: 10%" @click="login">登录</el-button>
      <div style="position: absolute;width: 20%;height: 30%; right: 5%;top: 46%">
        <el-select v-model="userType">
          <el-option v-for="item in option" :value="item.value" :label="item.label" />
        </el-select>
      </div>

    </el-card>
  </el-card>

</template>


<script setup lang="ts">
import {ref} from 'vue'
import request from '../request/request'
import router from "../router";
import {ElMessage} from "element-plus";
import {store} from "../utils/store.ts";

const myStore = store()
const username = ref('')
const password = ref('')
const userType = ref(1)

const option = [
  {
    value: 1,
    label: '管理员',
  },
  {
    value: 2,
    label: '监测人员'
  },
  {
    value: 3,
    label: '维修人员'
  },
]


const login = () => {
  if (username.value == '' || password.value == '') {
    ElMessage.error('用户名或密码不能为空')
    return
  }
  if (userType.value == 0) {
    ElMessage.error('请选择用户类型')
    return
  }
  request.get("/user-info-entity/login/" + username.value + "," + password.value).then(res => {

    if (res.data.length != 0) {
      if (res.data.type!=userType.value) {
        ElMessage.error('用户类型错误')
      } else {
        ElMessage.success('登录成功')
        console.log(res.data)
        myStore.currentUserId = res.data.uid
        myStore.setUserInfo(res.data)
        router.push({
          path: '/mainView'
        })
      }
    }
    else {
      ElMessage.error('用户名或密码错误')
    }

  })


}


</script>

<style scoped>
#login {
  position: absolute;
  width: 40%;
  height: 40%;
  background-color: #a6a9de;
  left: 30%;
  top: 30%;
}
</style>