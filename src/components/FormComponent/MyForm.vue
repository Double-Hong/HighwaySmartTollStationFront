<script setup lang="ts">

import {reactive} from "vue";
import {store} from "../../utils/store.ts";
// 组件接收的props
const props = defineProps(['formData','ItsFatherName'])
// 组件接收函数
const emit = defineEmits(['submit'])

const myStore = store()

const formData = reactive(props.formData)

</script>

<template>
  <el-form :model="formData.data" label-width="100">
    <el-form-item v-for="(item, index) in formData.message" :label="item.label" :key="index">
      <el-input-number :disabled="myStore.getUserType()!=1" v-if="item.type == 'number'" v-model="formData.data[item.name]"></el-input-number>
      <el-input  v-else v-model="formData.data[item.name]" :disabled="(item.name=='equipmentIp'||item.name == 'installationDate'||item.name == 'state')&&(myStore.getUserType()!=1)"></el-input>
    </el-form-item>
    <el-form-item label="所属设备">
      <el-input v-model="props.ItsFatherName" disabled></el-input>
    </el-form-item>
    <br>
    <el-button type="primary" @click="emit('submit',formData.data)">确认</el-button>
  </el-form>

</template>

<style scoped>

</style>