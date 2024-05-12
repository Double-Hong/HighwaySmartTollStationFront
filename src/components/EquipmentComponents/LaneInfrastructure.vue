<template>
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>

  <div v-if="!detailVisible">
    <h1 style="text-align: center">车道基础设备</h1>
    <div style="width: 100%;display: flex;flex-flow: row wrap;">
      <div v-for="item in pageInfo.laneInfrastructures"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.laneInfrastructureName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
        </el-card>
      </div>
    </div>
  </div>

  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentLaneInfrastructures.laneInfrastructureName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>
    <div style="display: flex;flex-flow: row wrap">
      <div style="text-align: center;width: 33.3%;position: relative">
        <el-card>
          <check-one v-if="pageInfo.currentAwningLight.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.currentAwningLight.awningLightName }}</h2>
          <p>安装日期:{{ pageInfo.currentAwningLight.installationDate }}</p>
          <p>IP地址:{{ pageInfo.currentAwningLight.equipmentIp }}</p>
          <el-button @click="goToAwningLightDetail">详情</el-button>
        </el-card>
      </div>
      <div style="text-align: center;width: 33.3%;position: relative">
        <el-card>
          <check-one v-if="pageInfo.currentCarDetector.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.currentCarDetector.carDetectorName }}</h2>
          <p>安装日期:{{ pageInfo.currentCarDetector.installationDate }}</p>
          <p>IP地址:{{ pageInfo.currentCarDetector.equipmentIp }}</p>
          <el-button @click="">详情</el-button>
        </el-card>
      </div>
      <div style="text-align: center;width: 33.3%;position: relative">
        <el-card>
          <check-one v-if="pageInfo.currentIntelBoard.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.currentIntelBoard.ledBoardName }}</h2>
          <p>安装日期:{{ pageInfo.currentIntelBoard.installationDate }}</p>
          <p>IP地址:{{ pageInfo.currentIntelBoard.equipmentIp }}</p>
          <el-button @click="">详情</el-button>
        </el-card>
      </div>
      <div style="text-align: center;width: 33.3%;position: relative">
        <el-card>
          <check-one v-if="pageInfo.currentLaneWeighingEquipment.state=='连接'"
                     style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.currentLaneWeighingEquipment.laneWeighingName }}</h2>
          <p>安装日期:{{ pageInfo.currentLaneWeighingEquipment.installationDate }}</p>
          <p>IP地址:{{ pageInfo.currentLaneWeighingEquipment.equipmentIp }}</p>
          <el-button @click="">详情</el-button>
        </el-card>
      </div>

    </div>
  </div>

  <el-dialog
      v-model="childDialogVisible"
      width="50%"
      style="text-align: center"
  >
    <template v-slot:header>
      <div v-if="currentType==1">
        {{ pageInfo.currentAwningLight.awningLightName }}
      </div>
    </template>
    <MyDescription :form-data="dataTest" :ItsFatherName="pageInfo.currentLaneWeighingEquipment.laneWeighingName"/>
    <br>
    <el-button type="primary" @click="editChildVisible = true">修改</el-button>
  </el-dialog>

  <el-dialog
      v-model="editChildVisible"
      width="30%"
      style="text-align: center"
      top="10vh"
  >
    <index :form-data="awningLightData" @submit="test"/>
  </el-dialog>

</template>

<script setup lang="ts">
import {CheckOne, CloseOne} from "@icon-park/vue-next";
import {onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {
  AwningLight,
  CarDetector,
  IntelBoard,
  LaneInfrastructure,
  LaneWeighingEquipment
} from "../../utils/interface.ts";
import Index from "../FormComponent/index.vue";
import {formDataType} from "../FormComponent/type.ts";
import MyDescription from "../FormComponent/MyDescription.vue";

const detailVisible = ref(false)
const pageInfo = reactive({
  laneInfrastructures: {} as LaneInfrastructure[],
  currentLaneInfrastructures: {} as LaneInfrastructure,
  currentAwningLight: {} as AwningLight,
  currentCarDetector: {} as CarDetector,
  currentIntelBoard: {} as IntelBoard,
  currentLaneWeighingEquipment: {} as LaneWeighingEquipment,
})

//查看子设备

const goToDetail = (laneInfrastructure: LaneInfrastructure) => {
  detailVisible.value = true
  pageInfo.currentLaneInfrastructures = laneInfrastructure
  pageInfo.currentAwningLight = reactive({} as AwningLight)
  pageInfo.currentCarDetector = reactive({} as CarDetector)
  pageInfo.currentIntelBoard = reactive({} as IntelBoard)
  pageInfo.currentLaneWeighingEquipment = reactive({} as LaneWeighingEquipment)
  request.get("/lane-infrastructure-entity/getLaneInfrastructureDetailById/" + laneInfrastructure.laneInfrastructureId).then(res => {
    if (res.data.data.awningLightEntity) {
      pageInfo.currentAwningLight = res.data.data.awningLightEntity
    }
    if (res.data.data.carDetectorEntity) {
      pageInfo.currentCarDetector = res.data.data.carDetectorEntity
    }
    if (res.data.data.intelBoardEntity) {
      pageInfo.currentIntelBoard = res.data.data.intelBoardEntity
    }
    if (res.data.data.laneWeighingEquipmentEntity) {
      pageInfo.currentLaneWeighingEquipment = res.data.data.laneWeighingEquipmentEntity
    }
  })
}

const childDialogVisible = ref(false)
const currentType= ref(1)

const goToAwningLightDetail = () => {
  childDialogVisible.value = true
  currentType.value = 1
  awningLightData.data = pageInfo.currentAwningLight
  dataTest = awningLightData
}

let dataTest = reactive({})

const test = (data:AwningLight)=>{
  console.log(data)
}

const awningLightData: formDataType<AwningLight> = reactive({
  data: {} as AwningLight,
  message: [
    {
      label: "名称", name: "awningLightName", type: ""
    },
    {
      label: "安装日期", name: "installationDate", type: ""
    },
    {
      label: "亮度", name: "brightness", type: "number"
    },
    {
      label: "状态", name: "state", type: ""
    },
    {
      label: "灯具类型", name: "fixtureType", type: ""
    },
    {
      label: "IP地址", name: "equipmentIp", type: ""
    },
  ]
})


//修改

const editChildVisible = ref(false)

onMounted(() => {
  request.get("/lane-infrastructure-entity/getAllLaneInfrastructure").then(res => {
    pageInfo.laneInfrastructures = res.data
  })
})


</script>

<style scoped>

</style>