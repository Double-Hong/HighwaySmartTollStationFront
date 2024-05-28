<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {FaultLog} from "../../utils/interface.ts";
import request from "../../request/request.ts";
import {store} from "../../utils/store.ts";

const myStore = store()

const pageInfo = reactive({
  logList:[] as FaultLog[]
})

onMounted(()=>{
  request.get("/fault-log-entity/getFaultLogByUserId/"+myStore.getCurrentUserId()).then(res=>{
    pageInfo.logList = res.data
    console.log(pageInfo.logList)
  })
})

</script>

<template>
  <h1 style="text-align: center">个人故障日志</h1>
  <br>
  <div>
    <el-table :data="pageInfo.logList" stripe>
      <el-table-column prop="faultTime" label="日志时间"></el-table-column>
      <el-table-column prop="description" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="maintenanceState" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>