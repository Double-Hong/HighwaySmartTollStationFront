<script setup lang="ts">

import router from "../router";
import {onMounted, reactive} from "vue";
import {userInfo, userType} from "../utils/interface.ts";
import request from "../request/request.ts";

const back = () =>{
  router.push({
    path: '/equipmentMain'
  })
}

const pageInfo = reactive({
  userList:[] as userInfo[]
})

onMounted(()=>{
  request.get("/user-info-entity/getAllUserInfo").then(res=>{
    pageInfo.userList = res.data
    console.log(pageInfo.userList)
  })
})

</script>

<template>
  <h1 style="text-align: center">人员管理</h1>
  <br>
  <el-button style="position: absolute;left: 4%;top: 5%" @click="back">返回</el-button>
  <br>
  <div>
    <el-table :data="pageInfo.userList" stripe>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="type" label="员工类型" >
        <template #default="scope">
          <el-tag size="large">
            {{ userType[scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>>
      <el-table-column prop="birthday" label="生日" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column label="操作">
        <template v-slot:default>
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>