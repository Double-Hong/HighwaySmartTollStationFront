<template>
  <el-button @click="myStore.contentDeviceVisible = 5" style="position: absolute;left: 10%;top: 0;z-index: 2000">返回</el-button>
  <Pie v-if="chartVisible" :data="data" />
</template>

<script setup lang="ts">
import Pie from "../Echarts/Pie.vue";
import {onMounted, ref} from "vue";
import {store} from "../../utils/store.ts";
import request from "../../request/request.ts";
let data = [

]

const myStore = store()

const currentChartType = myStore.chartInfo.currentType

const currentId = myStore.chartInfo.currentId

const chartVisible = ref(false)

onMounted(()=>{
  chartVisible.value = false
  if (currentChartType == 1){
    request.get("/etc-antenna-log-entity/getEtcAntennaLogById/"+currentId).then(res=>{
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 2) {
    request.get("/camera-log-entity/getCameraLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 3) {
    request.get("/induction-screen-log-entity/getInductionScreenLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 4) {
    request.get("/entrance-equipment-log-entity/getEntranceEquipmentLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 5) {
    request.get("/export-payment-equipment-log-entity/getExportPaymentEquipmentLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 6) {
    request.get("/awning-light-log-entity/getAwningLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 7) {
    request.get("/car-detector-log-entity/getCarDetectorLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 8) {
    request.get("/intel-board-log-entity/getIntelBoardLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }else if (currentChartType == 9) {
    request.get("/lane-weighing-equipment-log-entity/getLaneWeighingEquipmentLogById/" + currentId).then(res => {
      console.log(res.data)
      data = res.data
      chartVisible.value = true
    })
  }
})

</script>


<style scoped>

</style>