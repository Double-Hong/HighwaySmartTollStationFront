<template>
  <h1 style="text-align: center">个人信息</h1>
  <el-button style="position: absolute;right: 2%;top: 6%" type="danger" @click="logOut">
    退出登录
  </el-button>
  <el-button style="position: absolute;left: 2%;top: 6%" type="primary" @click="goToEquipment">设备管理</el-button>
  <!--  展示个人信息-->
  <br><br><br>
  <div style="position: absolute;background-color: black;width: 100%;height: 2px;top: 17%"></div>
  <br><br>
  <el-descriptions border column="2">
    <template v-slot:title>
      <div style="text-align: center;width: 100%;position: absolute;">
        简介
        <el-button @click="openEditDialog" style="position: absolute;right: 5%">
          <setting theme="outline" size="24" fill="#333" :strokeWidth="2"/>
        </el-button>
        <el-button @click="openPasswordDialog" style="position: absolute;right: 15%">
          修改密码
        </el-button>
      </div>
      <br>
    </template>
    <el-descriptions-item label="姓名" width="100px">
      <template v-slot:label>
        <div style="text-align: center">
          姓名
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageData.userInfo.name }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="性别" width="100px">
      <template v-slot:label>
        <div style="text-align: center">
          性别
        </div>
      </template>
      <template v-slot:default>
        <div style="text-align: center">
          {{ pageData.userInfo.gender }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="电话">
      <template v-slot:label>
        <div style="text-align: center">
          电话
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageData.userInfo.phone }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="用户名">
      <template v-slot:label>
        <div style="text-align: center">
          用户名
        </div>
      </template>
      <template v-slot:default>
        <div style="text-align: center">
          {{ pageData.userInfo.username }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          生日
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageData.userInfo.birthday }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          地址
        </div>
      </template>
      <template v-slot:default>
        <div style="text-align: center">
          {{ pageData.userInfo.address }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          用户类型
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 50px;display: flex;justify-content: center;align-items: center">
          <el-tag size="large">
            {{ userType[pageData.userInfo.type] }}
          </el-tag>
        </div>
      </template>
    </el-descriptions-item>
  </el-descriptions>

  <!--  修改个人信息-->
  <el-dialog
      v-model="editDialogVisible"
      width="500"
      title="修改个人信息"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="pageData.editInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="pageData.editInfo.gender">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
          <el-radio label="其它" size="large">其它</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="pageData.editInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="pageData.editInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="pageData.editInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="pageData.editInfo.birthday"
            type="date"
            size="large"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-button @click="makeSureEdit">确定</el-button>
    </el-form>
  </el-dialog>

  <!--  修改密码-->

  <el-dialog
      v-model="modifyPasswordVisible"
      width="500"
      title="修改密码"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="请输入原密码">
        <el-input v-model="oldPassword" show-password/>
      </el-form-item>
      <el-form-item label="请输入新密码">
        <el-input v-model="newPassword" show-password/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureModifyPassword">确认</el-button>
  </el-dialog>

</template>

<script setup lang="ts">
import {userInfo, userType} from "../utils/interface.ts";
import {onMounted, reactive, ref} from "vue";
import {store} from "../utils/store.ts";
import {
  Setting,
} from "@icon-park/vue-next";
import request from "../request/request.ts";
import {ElMessage} from "element-plus";
import router from "../router";

const myStore = store()
const pageData = reactive({
  userInfo: {} as userInfo,
  editInfo: {} as userInfo
})



onMounted(() => {
  pageData.userInfo = myStore.getUserInfo()
})

const editDialogVisible = ref(false)
//打开编辑对话框
const openEditDialog = () => {
  editDialogVisible.value = true
  console.log(JSON.stringify(pageData.userInfo))
  //这里是为了去除引用传递，先化为json字符串，再转换回来，就形成了值传递
  pageData.editInfo = JSON.parse(JSON.stringify(pageData.userInfo))
}

//确认修改
const makeSureEdit = () => {

  request.post("/user-info-entity/modifyUserInfo", pageData.editInfo).then(res => {
    if (res.data == 1) {
      editDialogVisible.value = false
      ElMessage.success('修改成功')
      pageData.userInfo = JSON.parse(JSON.stringify(pageData.editInfo))
      myStore.setUserInfo(pageData.userInfo)
    } else {
      ElMessage.error('修改失败')
    }
  })
}
//修改密码
const modifyPasswordVisible = ref(false)
const oldPassword = ref("")
const newPassword = ref("")


const openPasswordDialog = () => {
  modifyPasswordVisible.value = true
  oldPassword.value = ""
  newPassword.value = ""
}
const makeSureModifyPassword = () => {
  if (newPassword.value == ""){
    ElMessage.warning('密码不能为空!')
  }
  else {
    if (oldPassword.value != pageData.userInfo.password) {
      ElMessage.error('原密码不正确!')
    } else if (oldPassword.value == newPassword.value) {
      ElMessage.warning('新密码与原密码相同')
    } else {
      request.get("/user-info-entity/modifyPassword/" + pageData.userInfo.uid + "," + newPassword.value).then(res => {
        if (res.data == 1) {
          ElMessage.success('修改密码成功')
          modifyPasswordVisible.value = false
          myStore.setPassword(newPassword.value)
        }
      })
    }
  }
}

//退出登录
const logOut = ()=>{
  router.push({
    path:'/'
  })
}

//前往设备管理页面
const goToEquipment = ()=>{
  router.push({
    path:'/equipmentMain'
  })
}


</script>

<style scoped>

</style>