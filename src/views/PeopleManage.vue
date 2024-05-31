<template>
  <h1 style="text-align: center">人员管理</h1>
  <br>
  <el-button style="position: absolute;left: 4%;top: 5%" @click="back">返回</el-button>
  <br>
  <el-input v-model="search" placeholder="请输入关键字" style="width: 15%;position: absolute;left: 0.5%;top: 11%"
            clearable/>
  <el-select v-model="stateSelect" style="position: absolute;top: 11%;right: 12%;width: 10%" placeholder="筛选在职状态">
    <el-option style="color: #ff5300" label="全部" value=""/>
    <el-option style="color: #ff5300" label="在职" value="在职"/>
    <el-option style="color: #ff5300" label="离职" value="离职"/>
  </el-select>
  <el-select v-model="tyeSelect" style="position: absolute;top: 11%;right: 2%;width: 10%" placeholder="筛选员工类型">
    <el-option style="color: #ff5300" label="全部" value=""/>
    <el-option style="color: #ff5300" label="监测人员" value="2"/>
    <el-option style="color: #ff5300" label="维修人员" value="3"/>
  </el-select>
  <div>
    <el-table :data="peopleListFilter" stripe>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="phone" label="电话"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="type" label="员工类型">
        <template #default="scope">
          <el-tag size="large">
            {{ userType[scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birthday" label="生日"/>
      <el-table-column prop="gender" label="性别"/>
      <el-table-column prop="state" label="状态" >
        <template v-slot:default="scope">
          <el-tag v-if="scope.row.state == '在职'" type="success" size="large">
            {{scope.row.state}}
          </el-tag>
          <el-tag v-else type="danger" size="large">
            {{scope.row.state}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template v-slot:header>
          <label>操作</label>
          <el-button type="success" size="small" @click="openAddPeople">添加员工</el-button>
        </template>
        <template v-slot:default="scope">
          <el-button type="info" @click="openPeopleLog(scope.row)">日志</el-button>
          <el-button type="primary" @click="openEditPeople(scope.row)">修改</el-button>
          <el-button v-if="scope.row.state == '在职'" type="danger" @click="changePeopleState(scope.row)">标记为离职</el-button>
          <el-button v-else type="success" @click="changePeopleState(scope.row)">标记为在职</el-button>
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
        <el-input v-model="pageInfo.addUser.username"/>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="pageInfo.addUser.type">
          <el-option v-for="item in option" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="makeSureAddPeople">确认</el-button>
    <el-button @click="addPeopleVisible=false">取消</el-button>
  </el-dialog>

  <!--  修改员工-->
  <el-dialog
      title="修改员工"
      width="30%"
      style="text-align: center"
      v-model="editPeopleVisible"
  >
    <el-form label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="pageInfo.editUser.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="pageInfo.editUser.gender">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
          <el-radio label="其它" size="large">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="pageInfo.editUser.username"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="pageInfo.editUser.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="pageInfo.editUser.address"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="pageInfo.editUser.birthday"
            type="date"
            size="large"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-button @click="makeSureEdit">确定</el-button>
    </el-form>
  </el-dialog>

  <!--  查看员工日志-->

  <el-dialog
      title="员工日志"
      width="60%"
      style="text-align: center"
      v-model="logVisible"
  >
    <template v-slot:title>
      <h2 v-if="pageInfo.currentUser.type == 2">{{pageInfo.currentUser.name}}的监测工作日志</h2>
      <h2 v-if="pageInfo.currentUser.type == 3">{{pageInfo.currentUser.name}}的维护工作日志</h2>
    </template>
    <el-table v-if="pageInfo.currentUser.type == 2" :data="pageInfo.inspectorLog" stripe>
      <el-table-column prop="logTime" label="日志时间"></el-table-column>
      <el-table-column prop="logDescription" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型"></el-table-column>
    </el-table>
    <el-table v-else :data="pageInfo.accendantLog" stripe>
      <el-table-column prop="logTime" label="日志时间"></el-table-column>
      <el-table-column prop="logDescription" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型"></el-table-column>
    </el-table>
  </el-dialog>

</template>

<script setup lang="ts">

import router from "../router";
import {computed, onMounted, reactive, ref} from "vue";
import {AccendantLog, InspectorLog, userInfo, userType} from "../utils/interface.ts";
import request from "../request/request.ts";
import {ElMessage} from "element-plus";

const back = () => {
  router.push({
    path: '/equipmentMain'
  })
}

const pageInfo = reactive({
  userList: [] as userInfo[],
  addUser: {} as userInfo,
  editUser: {} as userInfo,
  currentUser:{} as userInfo,
  inspectorLog:[] as InspectorLog[],
  accendantLog:[] as AccendantLog[],
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

const openAddPeople = () => {
  pageInfo.addUser = reactive({} as userInfo)
  addPeopleVisible.value = true
}

const makeSureAddPeople = () => {
  request.get("/user-info-entity/checkUsername/"+pageInfo.addUser.username).then(res =>{
    if (res.data == 0){
      request.post("/user-info-entity/addUser", pageInfo.addUser).then(res => {
        pageInfo.userList = res.data
        ElMessage.success('添加成功')
        addPeopleVisible.value = false
      })
    }else {
      ElMessage.error("该用户名已存在，请重新输入")
    }
  })


}

//修改员工信息

const editPeopleVisible = ref(false)

const openEditPeople = (item: userInfo) => {
  editPeopleVisible.value = true
  pageInfo.editUser = JSON.parse(JSON.stringify(item))
}

const makeSureEdit = () => {
  console.log(pageInfo.editUser)
  request.post("/user-info-entity/modifyUserInfo", pageInfo.editUser).then(res => {
    if (res.data == 1) {
      editPeopleVisible.value = false
      ElMessage.success('修改成功')
      request.get("/user-info-entity/getAllUserInfo").then(res2 => {
        pageInfo.userList = res2.data
        console.log(pageInfo.userList)
      })
    } else {
      ElMessage.error('修改失败')
    }
  })
}

//查看员工日志

const logVisible = ref(false)

const openPeopleLog = (item: userInfo) => {
  logVisible.value = true
  pageInfo.currentUser = JSON.parse(JSON.stringify(item))
  if (item.type==2){
    request.get("/inspector-log-entity/getLogByUserId/"+item.uid).then(res =>{
      pageInfo.inspectorLog = res.data
      console.log(res.data)
    })
  }else {
    request.get("/accendant-log-entity/getAccendantLogByUserId/"+item.uid).then(res=>{
      pageInfo.accendantLog = res.data
      console.log(res.data)
    })
  }
}

//标记员工离职和在职
const changePeopleState = (item:userInfo) =>{
  if (item.state == "在职"){
    item.state = "离职"
  }else {
    item.state = "在职"
  }
  request.post("/user-info-entity/modifyUserInfo",item).then(res =>{
    if (res.data == 1) {
      ElMessage.success('操作成功')
      request.get("/user-info-entity/getAllUserInfo").then(res2 => {
        pageInfo.userList = res2.data
        console.log(pageInfo.userList)
      })
    } else {
      ElMessage.error('操作失败')
    }
  })
}

//查找与筛选
const search = ref('')
const stateSelect = ref('')
const tyeSelect = ref('')

const peopleListFilter =computed(()=>{
  return pageInfo.userList.filter((item)=>{
    return ((item.name.includes(search.value)) || (item.username.includes(search.value)) || (item.phone.includes(search.value)))
    && ((item.state.includes(stateSelect.value)))
    && (item.type.includes(tyeSelect.value))
  })
})


onMounted(() => {
  request.get("/user-info-entity/getAllUserInfo").then(res => {
    pageInfo.userList = res.data
    console.log(pageInfo.userList)
  })
})

</script>

<style scoped>

</style>