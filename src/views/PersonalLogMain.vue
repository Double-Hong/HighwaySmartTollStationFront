<template>
  <h1 style="text-align: center">个人日志</h1>
  <el-button style="position: absolute;left: 4%;top: 5%" @click="back">返回</el-button>
  <div style="display: flex">
    <div style="position:fixed;top: 11%;left: 0;width: 12%;height: 89%;">
      <LogAside/>
    </div>
    <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%">
<!--      <PreTransactionEquipment v-if="myStore.contentVisible==1"/>-->
<!--      <LaneSmartDevice v-if="myStore.contentVisible==2"/>-->
<!--      <LaneInfrastructure v-if="myStore.contentVisible==3"/>-->
<!--      <Test v-if="myStore.contentVisible==4"/>-->
      <PersonalLog v-if="myStore.contentLogVisible==1" />
      <PersonalFaultLog v-if="myStore.contentLogVisible==2" />
      <PersonalMaintennaceLog v-if="myStore.contentLogVisible==3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../router";
import {store} from "../utils/store.ts";
import {onMounted} from "vue";
import LogAside from "../components/PersonalLog/LogAside.vue";
import PersonalLog from "../components/PersonalLog/PersonalLog.vue";
import PersonalFaultLog from "../components/PersonalLog/PersonalFaultLog.vue";
import PersonalMaintennaceLog from "../components/PersonalLog/PersonalMaintennaceLog.vue";

const myStore = store()



const back = () => {
  router.push({
    path: '/equipmentMain'
  })
}

onMounted(()=>{

})

</script>

<style scoped>

</style>