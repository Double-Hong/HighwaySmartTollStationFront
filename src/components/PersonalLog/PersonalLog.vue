<template>
  <h1 style="text-align: center">个人日志详情</h1>
  <br>
  <div style="width: 100%">
    <el-table v-if="myStore.getUserInfo().type==2" :data="pageInfo.inspectorLogList" stripe>
      <el-table-column prop="logTime" label="日志时间"></el-table-column>
      <el-table-column prop="logDescription" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型"></el-table-column>
    </el-table>
    <el-table v-else :data="pageInfo.accendantLogList" stripe>
      <el-table-column prop="logTime" label="日志时间"></el-table-column>
      <el-table-column prop="logDescription" label="日志描述"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceType" label="设备类型"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import router from "../../router";
import {store} from "../../utils/store.ts";
import {onMounted, reactive} from "vue";
import {AccendantLog, InspectorLog} from "../../utils/interface.ts";
import request from "../../request/request.ts";

const myStore = store()

const pageInfo = reactive({
  inspectorLogList: [] as InspectorLog[],
  accendantLogList: [] as AccendantLog[],
})

onMounted(()=>{
  if (myStore.getUserInfo().type == 2) {
    request.get("/inspector-log-entity/getLogByUserId/"+myStore.getCurrentUserId()).then(res=>{
      pageInfo.inspectorLogList = res.data
      console.log(pageInfo.inspectorLogList)
    })
  } else {
    request.get("/accendant-log-entity/getAccendantLogByUserId/"+myStore.getCurrentUserId()).then(res=>{
      pageInfo.accendantLogList = res.data
      console.log(pageInfo.accendantLogList)
    })
  }
})

</script>

<style scoped>

</style>