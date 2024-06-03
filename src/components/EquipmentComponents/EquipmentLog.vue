<template>
<h1 style="text-align: center">设备日志</h1>
  <el-table :data="pageInfo.cameraLogList">
    <el-table-column prop="logTime" label="日期" />
    <el-table-column prop="equipmentName" label="设备名称" />
    <el-table-column prop="description" label="日志内容" />
    <el-table-column prop="focalLength" label="焦距" />
    <el-table-column prop="writerName" label="书写人" />
  </el-table>
</template>

<script setup lang="ts">

import {onMounted, reactive} from "vue";
import {CameraLog} from "../../utils/interface.ts";
import request from "../../request/request.ts";

const pageInfo = reactive({
  cameraLogList:[] as CameraLog[],
})

onMounted(()=>{
  request.get("/camera-log-entity/getCameraLogById/"+"001").then(res=>{
    pageInfo.cameraLogList = res.data
  })
})

</script>

<style scoped>

</style>