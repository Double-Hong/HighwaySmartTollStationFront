<template>
  <div id="main" ref="myChart" style="width: 100%;height: 100%">
  </div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

const myChart = ref()

onMounted(()=>{
  console.log(myChart.value)
  const my = echarts.init(myChart.value)

  const option = {
    title: {
      text: '设备状态图',
      link:'http://localhost:5173/equipmentMain',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [99, 98, 99, 91, 95, 96, 97],
        type: 'line'
      }
    ]
  };

  option && my.setOption(option);
})

</script>


<style scoped>

</style>