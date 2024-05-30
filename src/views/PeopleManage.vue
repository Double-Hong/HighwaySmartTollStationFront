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
      <el-table-column label="操作" width="300">
        <template v-slot:header>
          <label>操作</label> <el-button type="success" size="small" @click="openAddPeople">添加员工</el-button>
        </template>
        <template v-slot:default>
          <el-button type="info">日志</el-button>
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!--  添加员工-->
  <el-dialog
      title="添加员工"
      width="30%"
      v-model="addPeopleVisible"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="登录名">
        <el-input v-model="pageInfo.addUser.username" />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="pageInfo.addUser.type">
          <el-option v-for="item in option" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="makeSureAddPeople">确认</el-button>
    <el-button @click="addPeopleVisible=false">取消</el-button>
  </el-dialog>

</template>

<script setup lang="ts">

import router from "../router";
import {onMounted, reactive, ref} from "vue";
import {userInfo, userType} from "../utils/interface.ts";
import request from "../request/request.ts";
import {ElMessage} from "element-plus";

const back = () =>{
  router.push({
    path: '/equipmentMain'
  })
}

const pageInfo = reactive({
  userList:[] as userInfo[],
  addUser:{} as userInfo,
})

const option = [
  {
    value: 2,
    label: '监测人员'
  },
  {
    value: 3,
    label: '维修人员'
  },
]
//添加员工

const addPeopleVisible = ref(false)

const openAddPeople = () =>{
  pageInfo.addUser = reactive({} as userInfo)
  addPeopleVisible.value = true
}

const makeSureAddPeople = ()=>{
  request.post("/user-info-entity/addUser",pageInfo.addUser).then(res =>{
    pageInfo.userList = res.data
    ElMessage.success('添加成功')
    addPeopleVisible.value = false
  })
}


onMounted(()=>{
  request.get("/user-info-entity/getAllUserInfo").then(res=>{
    pageInfo.userList = res.data
    console.log(pageInfo.userList)
  })
})

</script>

<style scoped>

</style>