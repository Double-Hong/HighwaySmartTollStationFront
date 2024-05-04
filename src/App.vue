<script setup lang="ts">

import {store} from "./utils/store.ts";

if (sessionStorage.getItem("userInfoId")){
  store().setCurrentUserId(JSON.parse(sessionStorage.getItem("userInfoId")))
}
if (sessionStorage.getItem("userInfo")){
  store().setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")))
}



window.addEventListener('beforeunload',()=>{
  sessionStorage.setItem("userInfoId",JSON.stringify(store().getCurrentUserId()))
  sessionStorage.setItem("userInfo",JSON.stringify(store().getUserInfo()))
})

</script>

<template>

  <router-view />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
