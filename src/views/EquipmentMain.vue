<template>
  <h1 style="text-align: center">设备管理</h1>
  <el-button style="position: absolute;left: 4%;top: 5%" @click="back">返回</el-button>
  <el-button v-if="myStore.getUserInfo().type!=1" style="position: absolute;right: 4%;top: 5%" @click="goToPersonalLog"
             type="primary">个人日志
  </el-button>
  <el-button v-else style="position: absolute;right: 4%;top: 5%" type="primary" @click="goToPeopleManage">员工管理
  </el-button>
  <div style="display: flex">
    <div style="position:fixed;top: 11%;left: 0;width: 12%;height: 89%;">
      <EquipmentAside/>
    </div>
    <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%">
      <PreTransactionEquipment v-if="myStore.contentDeviceVisible==1"/>
      <LaneSmartDevice v-if="myStore.contentDeviceVisible==2"/>
      <LaneInfrastructure v-if="myStore.contentDeviceVisible==3"/>
      <Test v-if="myStore.contentDeviceVisible==4"/>
      <ChildrenEquiments v-if="myStore.contentDeviceVisible==5"/>
      <EquipmentLog v-if="myStore.contentDeviceVisible == 6"/>
    </div>
  </div>

</template>


<script setup lang="ts">
import {store} from "../utils/store.ts";
import EquipmentAside from "../components/EquipmentComponents/EquipmentAside.vue";
import PreTransactionEquipment from "../components/EquipmentComponents/PreTransactionEquipment.vue";
import router from "../router";
import LaneSmartDevice from "../components/EquipmentComponents/LaneSmartDevice.vue";
import LaneInfrastructure from "../components/EquipmentComponents/LaneInfrastructure.vue";
import Test from "../components/EquipmentComponents/Test.vue";
import ChildrenEquiments from "../components/EquipmentComponents/ChildrenEquiments.vue";
import EquipmentLog from "../components/EquipmentComponents/EquipmentLog.vue";

const myStore = store()

//返回
const back = () => {
  router.push({
    path: '/mainView'
  })
}

const goToPersonalLog = () => {
  router.push({
    path: '/personalLog'
  })
}

const goToPeopleManage = () => {
  router.push({
    path: '/peopleManage'
  })
}

</script>

<style scoped>

</style>