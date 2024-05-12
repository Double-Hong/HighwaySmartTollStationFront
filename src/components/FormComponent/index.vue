<script setup lang="ts">

import {reactive} from "vue";
// 组件接收的props
const props = defineProps(['formData'])
// 组件接收函数
const emit = defineEmits(['submit'])


const formData = reactive(props.formData)

// console.log(formData)

</script>

<template>
  <el-form :model="formData.data" label-width="100">
    <el-form-item v-for="(item, index) in formData.message" :label="item.label" :key="index">
      <el-input-number v-if="item.type == 'number'" v-model="formData.data[item.name]"></el-input-number>
      <el-input v-else v-model="formData.data[item.name]" :disabled="item.name=='equipmentIp'||item.name == 'installationDate'||item.name == 'state'"></el-input>
    </el-form-item>
    <br>
    <el-form-item>
      <el-button style="margin-left: 45%;" type="primary" @click="emit('submit',formData.data)">submit</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>