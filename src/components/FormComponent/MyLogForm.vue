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
      <el-input-number v-if="item.type == 'number'" v-model="formData.data[item.prop]"></el-input-number>
      <el-date-picker v-else-if="item.type == 'datetime'" v-model="formData.data[item.prop]" type="datetime" />
      <el-select  v-else-if="item.type == 'logType'" v-model="formData.data[item.prop]" disabled  >
        <el-option label="故障" value="故障日志" />
        <el-option label="维修" value="维修日志" />
        <el-option label="常规" value="常规日志" />
      </el-select>
      <el-input  v-else-if="item.type == 'textarea'" v-model="formData.data[item.prop]" type="textarea"/>
      <el-input  v-else v-model="formData.data[item.prop]" :disabled="(item.name == 'installationDate' || item.name == 'writerName' || item.name == 'state')&&(myStore.getUserType()!=1)"></el-input>
    </el-form-item>
<!--    <el-form-item label="所属设备">-->
<!--      <el-input v-model="props.ItsFatherName" disabled></el-input>-->
<!--    </el-form-item>-->
    <br>
    <el-button type="primary" @click="emit('submit',formData.data)">确认</el-button>
  </el-form>

</template>

<style scoped>

</style>