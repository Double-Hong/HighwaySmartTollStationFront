<template>
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>
  <div v-if="myStore.getUserInfo().type==1" style="position: absolute;top:7%;left: 1%">
    <el-button type="success">新增设备</el-button>
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
          <el-button @click="openEditParent(item)" style="position: absolute;top: 3%;right: 1%" v-if="myStore.getUserInfo().type==1">
            <editor theme="filled" size="24" fill="#000000"/>
          </el-button>
          <h2>{{ item.laneInfrastructureName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger">删除</el-button>
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
          <el-button type="info">设备日志</el-button>
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
          <el-button @click="goToCarDetectorDetail">详情</el-button>
          <el-button type="info">设备日志</el-button>
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
          <el-button @click="goToIntelBoardDetail">详情</el-button>
          <el-button type="info">设备日志</el-button>
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
          <el-button @click="goToLaneWeighingEquipmentDetail">详情</el-button>
          <el-button type="info">设备日志</el-button>
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
      <div v-if="currentType==2">
        {{ pageInfo.currentCarDetector.carDetectorName }}
      </div>
      <div v-if="currentType==3">
        {{ pageInfo.currentIntelBoard.ledBoardName }}
      </div>
      <div v-if="currentType==4">
        {{ pageInfo.currentLaneWeighingEquipment.laneWeighingName }}
      </div>
    </template>
    <MyDescription v-if="childDialogVisible" :form-data="descriptionData"
                   :ItsFatherName="pageInfo.currentLaneWeighingEquipment.laneWeighingName"/>
    <br>
    <el-button type="primary" @click="editChildVisible = true">修改</el-button>
  </el-dialog>

  <el-dialog
      v-model="editChildVisible"
      width="30%"
      style="text-align: center"
      top="10vh"
  >
    <template v-slot:header>
      <div v-if="currentType==1">
        {{ pageInfo.currentAwningLight.awningLightName }}
      </div>
      <div v-if="currentType==2">
        {{ pageInfo.currentCarDetector.carDetectorName }}
      </div>
      <div v-if="currentType==3">
        {{ pageInfo.currentIntelBoard.ledBoardName }}
      </div>
      <div v-if="currentType==4">
        {{ pageInfo.currentLaneWeighingEquipment.laneWeighingName }}
      </div>
    </template>
    <MyForm v-if="editChildVisible" :form-data="editData"
            :ItsFatherName="pageInfo.currentLaneWeighingEquipment.laneWeighingName"
            @submit="makeSureEdit"/>
  </el-dialog>

  <!--  修改父设备对话框-->
  <el-dialog
      v-model="editParentVisible"
      width="30%"
      :title="pageInfo.currentLaneInfrastructures.laneInfrastructureName"
      style="text-align: center"
  >
    <el-form label-width="75px">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editLaneInfrastructures.laneInfrastructureName" />
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input v-model="pageInfo.editLaneInfrastructures.installationDate" disabled/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="pageInfo.editLaneInfrastructures.equipmentIp" />
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editLaneInfrastructures.state" disabled/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditParent" type="primary">确定</el-button>
    <el-button @click="editParentVisible=false" type="danger">取消</el-button>
  </el-dialog>

</template>

<script setup lang="ts">
import {CheckOne, CloseOne, Editor} from "@icon-park/vue-next";
import {onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {
  AwningLight,
  CarDetector,
  IntelBoard,
  LaneInfrastructure, LaneSmartDevice,
  LaneWeighingEquipment
} from "../../utils/interface.ts";
import MyForm from "../FormComponent/MyForm.vue";
import {
  awningLightData,
  carDetectorData,
  editAwningLightData,
  editCarDetectorData, editIntelBoardData, editLaneWeighingEquipmentData, intelBoardData, laneWeighingEquipmentData
} from "../FormComponent/type.ts";
import MyDescription from "../FormComponent/MyDescription.vue";
import {ElMessage} from "element-plus";
import {store} from "../../utils/store.ts";

const myStore = store()

const detailVisible = ref(false)
const pageInfo = reactive({
  laneInfrastructures: {} as LaneInfrastructure[],
  editLaneInfrastructures: {} as LaneInfrastructure,
  currentLaneInfrastructures: {} as LaneInfrastructure,
  currentAwningLight: {} as AwningLight,
  currentCarDetector: {} as CarDetector,
  currentIntelBoard: {} as IntelBoard,
  currentLaneWeighingEquipment: {} as LaneWeighingEquipment,
  editAwningLight: {} as AwningLight,
  editCarDetector: {} as CarDetector,
  editIntelBoard: {} as IntelBoard,
  editLaneWeighingEquipment: {} as LaneWeighingEquipment,
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
const currentType = ref(1)

//查看雨棚灯详情
const goToAwningLightDetail = () => {
  reset()
  childDialogVisible.value = true
  currentType.value = 1
  pageInfo.editAwningLight = JSON.parse(JSON.stringify(pageInfo.currentAwningLight))
  awningLightData.data = pageInfo.currentAwningLight
  descriptionData = awningLightData
  editAwningLightData.data = pageInfo.editAwningLight
  editData = editAwningLightData
  console.log(descriptionData)
}

//查看车辆检测器详情
const goToCarDetectorDetail = () => {
  reset()
  childDialogVisible.value = true
  currentType.value = 2
  pageInfo.editCarDetector = JSON.parse(JSON.stringify(pageInfo.currentCarDetector))
  carDetectorData.data = pageInfo.currentCarDetector
  descriptionData = carDetectorData
  editCarDetectorData.data = pageInfo.editCarDetector
  editData = editCarDetectorData
  console.log(descriptionData)
}

//查看情报板详情
const goToIntelBoardDetail = () => {
  reset()
  childDialogVisible.value = true
  currentType.value = 3
  pageInfo.editIntelBoard = JSON.parse(JSON.stringify(pageInfo.currentIntelBoard))
  intelBoardData.data = pageInfo.currentIntelBoard
  descriptionData = intelBoardData
  editIntelBoardData.data = pageInfo.editIntelBoard
  editData = editIntelBoardData
}

//查看车道称重设备详情
const goToLaneWeighingEquipmentDetail = () => {
  reset()
  childDialogVisible.value = true
  currentType.value = 4
  pageInfo.editLaneWeighingEquipment = JSON.parse(JSON.stringify(pageInfo.currentLaneWeighingEquipment))
  laneWeighingEquipmentData.data = pageInfo.currentLaneWeighingEquipment
  descriptionData = laneWeighingEquipmentData
  editLaneWeighingEquipmentData.data = pageInfo.editLaneWeighingEquipment
  editData = editLaneWeighingEquipmentData
}

//描述列表显示的内容
let descriptionData = reactive({})
//修改对话框展示的内容
let editData = reactive({})

const reset = () => {
  descriptionData = reactive({})
  editData = reactive({})
}


//修改

const editChildVisible = ref(false)

const makeSureEdit = () => {
  editChildVisible.value = false
  if (currentType.value == 1) {
    request.post("/awning-light-entity/updateAwningLight", pageInfo.editAwningLight).then(res => {
      pageInfo.currentAwningLight = JSON.parse(JSON.stringify(pageInfo.editAwningLight))
      awningLightData.data = pageInfo.currentAwningLight
      ElMessage.success("修改成功")
    })
  }
  if (currentType.value == 2) {
    request.post("/car-detector-entity/updateCarDetector", pageInfo.editCarDetector).then(res => {
      pageInfo.currentCarDetector = JSON.parse(JSON.stringify(pageInfo.editCarDetector))
      carDetectorData.data = pageInfo.currentCarDetector
      ElMessage.success("修改成功")
    })
  }
  if (currentType.value == 3) {
    request.post("/intel-board-entity/updateIntelBoard", pageInfo.editIntelBoard).then(res => {
      pageInfo.currentIntelBoard = JSON.parse(JSON.stringify(pageInfo.editIntelBoard))
      intelBoardData.data = pageInfo.currentIntelBoard
      ElMessage.success("修改成功")
    })
  }
  if (currentType.value == 4) {
    request.post("/lane-weighing-equipment-entity/updateLaneWeighingEquipment", pageInfo.editLaneWeighingEquipment).then(res => {
      pageInfo.currentLaneWeighingEquipment = JSON.parse(JSON.stringify(pageInfo.editLaneWeighingEquipment))
      laneWeighingEquipmentData.data = pageInfo.currentLaneWeighingEquipment
      ElMessage.success("修改成功")
    })
  }
}

const editParentVisible = ref(false)

//打开修改父设备对话框
const openEditParent = (item : LaneInfrastructure) => {
  pageInfo.editLaneInfrastructures = JSON.parse(JSON.stringify(item))
  pageInfo.currentLaneInfrastructures = JSON.parse(JSON.stringify(item))
  editParentVisible.value = true
}

//确认修改父设备
const makeSureEditParent = () => {
  request.post("/lane-infrastructure-entity/updateLaneInfrastructure", pageInfo.editLaneInfrastructures).then(res => {
    pageInfo.laneInfrastructures = res.data
    ElMessage.success("修改成功")
  })
  editParentVisible.value = false
}

onMounted(() => {
  request.get("/lane-infrastructure-entity/getAllLaneInfrastructure").then(res => {
    pageInfo.laneInfrastructures = res.data
  })
})


</script>

<style scoped>

</style>