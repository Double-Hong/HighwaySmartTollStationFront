<script setup lang="ts">
import {store} from "../../utils/store.ts";

import {Devices, ProjectorTwo, MicroSlrCamera, WaterfallsH, Vial, Log} from "@icon-park/vue-next";
import {ElMessage} from 'element-plus'
import {ref} from "vue";
import request from "../../request/request.ts";

const myStore = store()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const dialogVisible = ref(false)

const fullscreenLoading = ref(false)
const openFullScreen = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
    ElMessage.success('设备状态已记录')
  }, 3000)
  request.get("/user-info-entity/recordDevice").then(res => {
    if (res.data != 1) {
      ElMessage.error('设备状态记录失败')
    }
  })
}
</script>

<template>
  <el-menu
      :default-active="myStore.contentDeviceVisible.toString()"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 100%;height: 100%"
  >

    <el-menu-item index="1" @click="myStore.contentDeviceVisible=1">
      <devices theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp预交易门架设备</span>
    </el-menu-item>
    <el-menu-item index="2" @click="myStore.contentDeviceVisible=2">
      <projector-two theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp车道智能自助设备</span>
    </el-menu-item>
    <el-menu-item index="3" @click="myStore.contentDeviceVisible=3">
      <micro-slr-camera theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp车道基础设备</span>
    </el-menu-item>
    <el-menu-item v-if="myStore.getUserType() == 1" index="6" @click="myStore.contentDeviceVisible=6">
      <vial theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp设备阈值</span>
    </el-menu-item>
    <el-menu-item index="5" @click="myStore.contentDeviceVisible=5">
      <waterfalls-h theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp子设备详情</span>
    </el-menu-item>
    <el-menu-item index="7" v-if="myStore.getUserType() == 1">
      <el-button
          type="primary"
          @click="openFullScreen"
          element-loading-text="系统正在记录设备状态..."
          v-loading.fullscreen.lock="fullscreenLoading"
      >
        记录设备状态
      </el-button>
    </el-menu-item>

  </el-menu>
</template>

<style scoped>

</style>