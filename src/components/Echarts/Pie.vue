<template>
  <div id="main" ref="myChart" style="width: 100%;height: 100%">
  </div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts';
import {onMounted, reactive, ref} from "vue";
import {store} from "../../utils/store.ts";
// 组件接收的props
const props = defineProps(['data'])
const myChart = ref()

const myStore = store()

onMounted(() => {
  console.log(myChart.value)
  const my = echarts.init(myChart.value)

  const option = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
    ]
  };

  console.log(111)
  const myData = props.data
  console.log(myData)
  let data = {
    data: [],
    logTime: [],
    aperture: [],
    focalLength: [],
    parameters: [
      {
        parameter: [],
      }
    ],
  }

  if (myStore.chartInfo.currentType == 1) {
    option.series[1] = {name: '读取距离', type: 'line', stack: 'Total', data: []}
    option.series[2] = {name: '波束宽度', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '工作频率'
    option.series[1].name = '读取距离'
    option.series[2].name = '波束宽度'
    option.legend.data = ['工作频率', '读取距离', '波束宽度']
    data.parameters[1] = {parameter: []}
    data.parameters[2] = {parameter: []}
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].readRange
      data.parameters[1].parameter[j] = myData[j].beamWidth
      data.parameters[2].parameter[j] = myData[j].beamWidth
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 3 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  } else if (myStore.chartInfo.currentType == 2) {
    option.series[1] = {name: '焦距', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '光圈'
    option.series[1].name = '焦距'
    option.legend.data = ['光圈', '焦距']
    data.parameters[1] = {parameter: []}

    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].aperture
      data.parameters[1].parameter[j] = myData[j].focalLength
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 2 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 3){
    option.series[1] = {name: '对比度', type: 'line', stack: 'Total', data: []}
    option.series[2] = {name: '波束宽度', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '对比度'
    option.series[1].name = '显示率'
    option.series[2].name = '亮度'
    option.legend.data = ['对比度', '显示率', '亮度']
    data.parameters[1] = {parameter: []}
    data.parameters[2] = {parameter: []}
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].contrastRatio
      data.parameters[1].parameter[j] = myData[j].displayRate
      data.parameters[2].parameter[j] = myData[j].brightness
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 3 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 4){
    option.series[0].name = '机器内卡片数量'
    option.legend.data = ['机器内卡片数量']
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].cardNumber
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 1 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 5){
    option.series[1] = {name: '焦距', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '打印收据的纸的数量'
    option.series[1].name = '收费扫描器的状态'
    option.legend.data = ['打印收据的纸的数量', '收费扫描器的状态']
    data.parameters[1] = {parameter: []}
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].receiptNumber
      data.parameters[1].parameter[j] = myData[j].scannerState
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 2 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 6){
    option.series[0].name = '亮度'
    option.legend.data = ['亮度']
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].brightness
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 1 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }else if(myStore.chartInfo.currentType == 7){
    option.series[0].name = '检测范围'
    option.legend.data = ['检测范围']
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].detectionRange
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 1 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 8){
    option.series[1] = {name: '对比度', type: 'line', stack: 'Total', data: []}
    option.series[2] = {name: '波束宽度', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '对比度'
    option.series[1].name = '显示率'
    option.series[2].name = '亮度'
    option.legend.data = ['对比度', '显示率', '亮度']
    data.parameters[1] = {parameter: []}
    data.parameters[2] = {parameter: []}
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].contrastRatio
      data.parameters[1].parameter[j] = myData[j].displayRate
      data.parameters[2].parameter[j] = myData[j].brightness
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 3 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  else if (myStore.chartInfo.currentType == 9){
    option.series[1] = {name: '焦距', type: 'line', stack: 'Total', data: []}
    option.series[0].name = '称重器状态'
    option.series[1].name = '称重显示器状态'
    option.legend.data = ['称重器状态', '称重显示器状态']
    data.parameters[1] = {parameter: []}
    for (let j = myData.length-1; j >= 0; j--) {
      data.parameters[0].parameter[j] = myData[j].weighingMachineState
      data.parameters[1].parameter[j] = myData[j].displayState
    }
    for (let j = myData.length-1; j >= 0; j--) {
      data.logTime[j] = myData[j].logTime
    }
    for (let i = 0 ; i < 2 ; i++){
      option.series[i].data = data.parameters[i].parameter
    }
  }
  console.log("parameters")
  console.log(data.parameters)
  option.title.text = props.data[0].equipmentName
  option.xAxis.data = data.logTime

  // for (let i = 0; i < myData.length; i++) {
  //   data.logTime[i] = myData[i].logTime
  //   data.aperture[i] = myData[i].aperture
  //   data.focalLength[i] = myData[i].focalLength
  // }
  //
  //
  // option.series[0].data = data.aperture
  // option.series[1].data = data.focalLength

  // option.series[0].data = data
  option && my.setOption(option);

})

</script>


<style scoped>

</style>