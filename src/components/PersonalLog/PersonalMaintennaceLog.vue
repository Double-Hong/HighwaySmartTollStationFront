<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {MaintenanceLog} from "../../utils/interface.ts";
import request from "../../request/request.ts";
import {store} from "../../utils/store.ts";

const myStore = store()

const pageInfo = reactive({
  logList:[] as MaintenanceLog[]
})

onMounted(()=>{
  request.get("/maintenance-log-entity/getMaintenanceLogByUserId/"+myStore.getCurrentUserId()).then(res=>{
    pageInfo.logList = res.data
    console.log(pageInfo.logList)
  })
})

</script>

<template>
  <h1 style="text-align: center">个人维修日志</h1>
  <br>
  <div>
    <el-table :data="pageInfo.logList" stripe>
      <el-table-column prop="maintainTime" label="日志时间"></el-table-column>
      <el-table-column prop="maintainDescription" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="maintainDescription" label="维修描述"></el-table-column>
      <el-table-column prop="maintainResult" label="维修结果"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>