<script setup lang="ts">
import {store} from "../../utils/store.ts";

import {Devices, ProjectorTwo, MicroSlrCamera} from "@icon-park/vue-next";

const myStore = store()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 100%;height: 100%"
  >

    <el-menu-item index="1" @click="myStore.contentVisible=1">
      <devices theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp预交易门架设备</span>
    </el-menu-item>
    <el-menu-item index="2" @click="myStore.contentVisible=2">
      <projector-two theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp车道智能自助设备</span>
    </el-menu-item>
    <el-menu-item index="3" @click="myStore.contentVisible=3">
      <micro-slr-camera theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp车道基础设备</span>
    </el-menu-item>

  </el-menu>
</template>

<style scoped>

</style>