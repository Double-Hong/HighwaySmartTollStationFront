<template>
  <h1 style="text-align: center">子设备详情</h1>
  <el-select v-model="currentSelect" style="width: 10%;position: absolute;left: 1%" @change="selectChange" placeholder="选择设备类型" clearable>
    <el-option label="ETC天线" value="1"/>
    <el-option label="摄像机" value="2"/>
    <el-option label="诱导屏" value="3"/>
    <el-option label="入口设备" value="4"/>
    <el-option label="出口设备" value="5"/>
    <el-option label="雨棚灯" value="6"/>
    <el-option label="车检器" value="7"/>
    <el-option label="情报板" value="8"/>
    <el-option label="车道称重设备" value="9"/>
  </el-select>
  <MyTable v-if="tableVisible" :form-data="nowData" @submit="openLogDialog" />

  <el-dialog
      title="设备日志"
      width="70%"
      v-model="logDialogVisible"
      style="text-align: center"
  >

    hhh
  </el-dialog>
</template>

<script setup lang="ts">
import MyTable from "../FormComponent/MyTable.vue";
import {onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {
  Antenna,
  AwningLight,
  Camera, CarDetector,
  EntranceEquipment,
  ExportPaymentEquipment,
  InductionScreen, IntelBoard, LaneWeighingEquipment
} from "../../utils/interface.ts";
import {
  AwingLightTableData,
  cameraTableData, carDetectorTableData,
  EntranceTableData,
  etcTableData,
  ExportTableData,
  InductionScreenTableData, laneWeighingTableData, ledBoardTableData
} from "../FormComponent/type.ts";

const pageInfo = reactive({
  cameraList: [] as Camera[],
  etcList: [] as Antenna[],
  InductionScreenList: [] as InductionScreen[],
  EntranceList: [] as EntranceEquipment[],
  ExportList: [] as ExportPaymentEquipment[],
  AwningList: [] as AwningLight[],
  CarDetectorList: [] as CarDetector[],
  IntelBoardList: [] as IntelBoard[],
  LaneWeighingList: [] as LaneWeighingEquipment[]

})

let nowData = reactive({})

const tableVisible = ref(false)

const currentSelect = ref('')

/**
 * 选择设备类型时，根据选择的设备类型，请求对应的设备数据
 */
const selectChange = () => {
  tableVisible.value = false
  if (currentSelect.value == 1) {
    request.get("/etc-antenna-entity/getAllAntenna").then(res => {
      pageInfo.etcList = res.data
      etcTableData.data = pageInfo.etcList
      nowData = etcTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 2) {
    request.get("/camera-entity/getAllCamera").then(res => {
      pageInfo.cameraList = res.data
      cameraTableData.data = pageInfo.cameraList
      nowData = cameraTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 3) {
    request.get("/induction-screen-entity/getAllInductionScreen").then(res => {
      pageInfo.InductionScreenList = res.data
      InductionScreenTableData.data = pageInfo.InductionScreenList
      nowData = InductionScreenTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 4) {
    request.get("/entrance-equipment-entity/getAllEntranceEquipment").then(res => {
      pageInfo.EntranceList = res.data
      EntranceTableData.data = pageInfo.EntranceList
      nowData = EntranceTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 5) {
    request.get("/export-payment-equipment-entity/getAllExportPaymentEquipment").then(res => {
      pageInfo.ExportList = res.data
      ExportTableData.data = pageInfo.ExportList
      nowData = ExportTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 6) {
    request.get("/awning-light-entity/getAllAwningLight").then(res => {
      pageInfo.AwningList = res.data
      AwingLightTableData.data = pageInfo.AwningList
      nowData = AwingLightTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 7) {
    request.get("/car-detector-entity/getAllCarDetector").then(res => {
      pageInfo.CarDetectorList = res.data
      carDetectorTableData.data = pageInfo.CarDetectorList
      nowData = carDetectorTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 8) {
    request.get("/intel-board-entity/getAllIntelBoard").then(res => {
      pageInfo.IntelBoardList = res.data
      ledBoardTableData.data = pageInfo.IntelBoardList
      nowData = ledBoardTableData
      tableVisible.value = true
    })
  } else if (currentSelect.value == 9) {
    request.get("/lane-weighing-equipment-entity/getAllLaneWeighingEquipment").then(res => {
      pageInfo.LaneWeighingList = res.data
      laneWeighingTableData.data = pageInfo.LaneWeighingList
      nowData = laneWeighingTableData
      tableVisible.value = true
    })
  }
}

/**
 * 查看设备日志
 */
const logDialogVisible = ref(false)

const openLogDialog = () => {
  logDialogVisible.value = true
}

onMounted(() => {

})

</script>


<style scoped>

</style>