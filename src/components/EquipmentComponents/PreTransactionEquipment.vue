<template>
  <!--提示-->
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>
  <!--  总览界面-->
  <div v-if="!detailVisible">
    <h1 style="text-align: center">预交易门架设备</h1>
    <div style="display: flex;width: 100%">
      <div v-for="item in pageInfo.transactionEquipment"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.transactionName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
        </el-card>

      </div>
    </div>
  </div>

  <!--  详情界面-->
  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentEquipment.transactionName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>

    <div style="display: flex;flex-flow: row wrap;">
      <!--    诱导屏-->
      <div style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="pageInfo.antenna.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.antenna.antennaName }}</h2>
          <p>安装日期:{{ pageInfo.antenna.installationDate }}</p>
          <p>IP地址:{{ pageInfo.antenna.equipmentIp }}</p>
          <el-button>详情</el-button>
        </el-card>
      </div>
      <!--    摄像头-->
      <div v-for="item in pageInfo.cameraList" style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.cameraName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button>详情</el-button>
        </el-card>
      </div>
      <!--    ETC天线-->
      <div style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="pageInfo.inductionScreen.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled" size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.inductionScreen.inductionScreenName }}</h2>
          <p>安装日期:{{ pageInfo.inductionScreen.installationDate }}</p>
          <p>IP地址:{{ pageInfo.inductionScreen.equipmentIp }}</p>
          <el-button>详情</el-button>
        </el-card>
      </div>

    </div>

  </div>


</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {Antenna, Camera, InductionScreen, preTransactionGantryEquipment} from "../../utils/interface.ts";
import {CheckOne, CloseOne} from "@icon-park/vue-next"

//详情界面可见性
const detailVisible = ref(false)

const pageInfo = reactive({
  transactionEquipment: {} as preTransactionGantryEquipment[],
  currentEquipment: {} as preTransactionGantryEquipment,
  cameraList: {} as Camera[],
  antenna: {} as Antenna,
  inductionScreen: {} as InductionScreen,
})
//查看预交易门架设备详情
const goToDetail = (equipment: preTransactionGantryEquipment) => {
  detailVisible.value = true
  pageInfo.currentEquipment = equipment
  pageInfo.antenna = reactive({} as Antenna)
  pageInfo.cameraList = reactive({} as Camera[])
  pageInfo.inductionScreen = reactive({} as InductionScreen)
  console.log(pageInfo.inductionScreen.inductionScreenName)
  request.get("/pre-transaction-gantry-equipment-entity/getTransactionDetailById/" + equipment.transactionId).then(res => {
    console.log(res.data)
    if (res.data.data.cameraEntities.length != 0)
      pageInfo.cameraList = res.data.data.cameraEntities
    if (res.data.data.etcAntennaEntity != null)
      pageInfo.antenna = res.data.data.etcAntennaEntity
    if (res.data.data.inductionScreenEntity != null)
      pageInfo.inductionScreen = res.data.data.inductionScreenEntity
  })
}

onMounted(() => {
  request.get("/pre-transaction-gantry-equipment-entity/getAllTransactionEquipment").then(res => {
    pageInfo.transactionEquipment = res.data
  })
})

</script>


<style scoped>

</style>