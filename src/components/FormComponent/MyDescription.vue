<script setup lang="ts">

import {reactive} from "vue";

const props = defineProps(['formData','ItsFatherName'])
const emit = defineEmits(['submit'])

const formData = reactive(props.formData)

</script>

<template>
<el-descriptions column="3" direction="vertical" border>
  <el-descriptions-item v-for="item in formData.message" :label="item.label">
    {{formData.data[item.name]}}
  </el-descriptions-item>
  <el-descriptions-item label="所属设备">
    {{props.ItsFatherName}}
  </el-descriptions-item>
</el-descriptions>
</template>

<style scoped>

</style>