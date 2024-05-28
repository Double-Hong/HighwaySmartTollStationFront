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

    <el-menu-item index="1" @click="myStore.contentLogVisible=1">
      <devices theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp个人日志</span>
    </el-menu-item>
    <el-menu-item index="2" v-if="myStore.getUserInfo().type==2" @click="myStore.contentLogVisible=2">
      <projector-two theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp故障日志</span>
    </el-menu-item>
    <el-menu-item index="3" v-if="myStore.getUserInfo().type==3" @click="myStore.contentLogVisible=3">
      <projector-two theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span>&nbsp维修日志</span>
    </el-menu-item>


    <!--    <el-menu-item index="4" @click="myStore.contentVisible=4">-->
    <!--      <span>&nbspTest</span>-->
    <!--    </el-menu-item>-->

  </el-menu>
</template>

<style scoped>

</style>