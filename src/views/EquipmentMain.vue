

<template>
<h1 style="text-align: center">设备管理</h1>
  <el-button style="position: absolute;left: 4%;top: 5%" @click="back">返回</el-button>
<div style="display: flex">
  <div style="position:fixed;top: 11%;left: 0;width: 12%;height: 89%;">
    <EquipmentAside/>
  </div>
  <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%">
    <PreTransactionEquipment v-if="myStore.contentVisible==1"/>
    <LaneSmartDevice v-if="myStore.contentVisible==2"/>
    <LaneInfrastructure v-if="myStore.contentVisible==3"/>
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

const myStore = store()

//返回
const back =()=>{
  router.push({
    path:'/mainView'
  })
}

</script>

<style scoped>

</style>