<template>
  <h1 style="text-align: center">子设备详情</h1>
  <el-select v-model="currentSelect" style="width: 10%;position: absolute;left: 1%" @change="selectChange"
             placeholder="选择设备类型" clearable>
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
  <MyTable v-if="tableVisible" :form-data="nowData" @submit="openLogDialog" @fix="openFixDialog"/>

  <el-dialog
      title="设备日志"
      width="90%"
      v-model="logDialogVisible"
      style="text-align: center"
  >
    <MyLogTable v-if="logDialogVisible" :form-data="nowLogData" @fix="openFixDialog"/>
  </el-dialog>

  <el-dialog
      title="维修"
      width="30%"
      v-model="fixDialogVisible"
      style="text-align: center"
  >
    <MyLogForm v-if="fixDialogVisible" :form-data="nowLogForm" @submit="makeSureFix"/>
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
import {
  awningLogFormData,
  awningLogTableData,
  cameraLogFormData,
  cameraLogTableData, carDetectorLogFormData,
  carDetectorLogTableData, entranceLogFormData,
  entranceLogTableData, etcLogFormData,
  etcLogTableData, exportLogFormData,
  exportLogTableData, inductionLogFormData,
  inductionLogTableData, intelLogFormData, intelLogTableData, laneWeighingLogFormData, laneWeighingLogTableData
} from "../FormComponent/logType.ts";
import MyLogTable from "../FormComponent/MyLogTable.vue";
import MyLogForm from "../FormComponent/MyLogForm.vue";
import {store} from "../../utils/store.ts";
import {ElMessage} from "element-plus";

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

let nowLogData = reactive({})

//通过currentSelect的值，请求对应的设备日志数据
const openLogDialog = (equipment: any) => {
  logDialogVisible.value = false
  console.log(equipment)
  if (currentSelect.value == 1) {
    request.get("/etc-antenna-log-entity/getEtcAntennaLogById/"+equipment["antennaId"]).then(res =>{
      etcLogTableData.data = res.data
      nowLogData = etcLogTableData
      logDialogVisible.value = true
    })
  } else if (currentSelect.value == 2) {
    request.get("/camera-log-entity/getCameraLogById/" + equipment["cameraId"]).then(res => {
      cameraLogTableData.data = res.data
      nowLogData = cameraLogTableData
      logDialogVisible.value = true
    })
  } else if (currentSelect.value == 3) {
    request.get("/induction-screen-log-entity/getInductionScreenLogById/" + equipment["inductionScreenId"]).then(res =>{
      inductionLogTableData.data = res.data
      nowLogData = inductionLogTableData
      logDialogVisible.value = true
    })
  } else if (currentSelect.value == 4) {
    request.get("/entrance-equipment-log-entity/getEntranceEquipmentLogById/" + equipment["entranceEquipmentId"]).then(res =>{
      entranceLogTableData.data = res.data
      nowLogData = entranceLogTableData
      logDialogVisible.value = true
    })
  } else if (currentSelect.value == 5) {
    console.log(equipment)
    request.get("/export-payment-equipment-log-entity/getExportPaymentEquipmentLogById/" + equipment["exportEquipmentId"]).then(res =>{
      exportLogTableData.data = res.data
      nowLogData = exportLogTableData
      logDialogVisible.value = true
    })
    } else if (currentSelect.value == 6) {
      request.get("/awning-light-log-entity/getAwningLogById/" + equipment["awningLightId"]).then(res =>{
        awningLogTableData.data = res.data
        nowLogData = awningLogTableData
        logDialogVisible.value = true
      })
    } else if (currentSelect.value == 7) {
      request.get("/car-detector-log-entity/getCarDetectorLogById/" + equipment["carDetectorId"]).then(res =>{
        carDetectorLogTableData.data = res.data
        nowLogData = carDetectorLogTableData
        logDialogVisible.value = true
      })
    } else if (currentSelect.value == 8) {
      request.get("/intel-board-log-entity/getIntelBoardLogById/"+equipment["ledBoardId"]).then(res =>{
        intelLogTableData.data = res.data
        nowLogData = intelLogTableData
        logDialogVisible.value = true
      })
    } else if (currentSelect.value == 9) {
      request.get("/lane-weighing-equipment-log-entity/getLaneWeighingEquipmentLogById/" + equipment["laneWeighingId"]).then(res =>{
        laneWeighingLogTableData.data = res.data
        nowLogData = laneWeighingLogTableData
        logDialogVisible.value = true
      })
    }
}

const myStore = store()

const fixDialogVisible = ref(false)

let nowLogForm = reactive({})

const openFixDialog = (equipmentLog: any) => {
  fixDialogVisible.value = false
  if (currentSelect.value == 1) {
    etcLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    etcLogFormData.data.logType = "维修日志"
    etcLogFormData.data.state = "连接"
    etcLogFormData.data.description = ""
    etcLogFormData.data.writerName = myStore.getUserInfo().name
    etcLogFormData.data.writerId = myStore.getCurrentUserId()
    etcLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    etcLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = etcLogFormData
  } else if (currentSelect.value == 2) {
    cameraLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    cameraLogFormData.data.logType = "维修日志"
    cameraLogFormData.data.state = "连接"
    cameraLogFormData.data.description = ""
    cameraLogFormData.data.writerName = myStore.getUserInfo().name
    cameraLogFormData.data.writerId = myStore.getCurrentUserId()
    cameraLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    cameraLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = cameraLogFormData
    fixDialogVisible.value = true
  } else if (currentSelect.value == 3) {
    inductionLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    inductionLogFormData.data.logType = "维修日志"
    inductionLogFormData.data.state = "连接"
    inductionLogFormData.data.description = ""
    inductionLogFormData.data.writerName = myStore.getUserInfo().name
    inductionLogFormData.data.writerId = myStore.getCurrentUserId()
    inductionLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    inductionLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = inductionLogFormData
  } else if (currentSelect.value == 4) {
    entranceLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    entranceLogFormData.data.logType = "维修日志"
    entranceLogFormData.data.state = "连接"
    entranceLogFormData.data.description = ""
    entranceLogFormData.data.writerName = myStore.getUserInfo().name
    entranceLogFormData.data.writerId = myStore.getCurrentUserId()
    entranceLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    entranceLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = entranceLogFormData
  } else if (currentSelect.value == 5) {
    exportLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    exportLogFormData.data.logType = "维修日志"
    exportLogFormData.data.state = "连接"
    exportLogFormData.data.description = ""
    exportLogFormData.data.writerName = myStore.getUserInfo().name
    exportLogFormData.data.writerId = myStore.getCurrentUserId()
    exportLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    exportLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = exportLogFormData
  } else if (currentSelect.value == 6) {
    awningLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    awningLogFormData.data.logType = "维修日志"
    awningLogFormData.data.state = "连接"
    awningLogFormData.data.description = ""
    awningLogFormData.data.writerName = myStore.getUserInfo().name
    awningLogFormData.data.writerId = myStore.getCurrentUserId()
    awningLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    awningLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = awningLogFormData
    fixDialogVisible.value = true
  } else if (currentSelect.value == 7) {
    carDetectorLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    carDetectorLogFormData.data.logType = "维修日志"
    carDetectorLogFormData.data.state = "连接"
    carDetectorLogFormData.data.description = ""
    carDetectorLogFormData.data.writerName = myStore.getUserInfo().name
    carDetectorLogFormData.data.writerId = myStore.getCurrentUserId()
    carDetectorLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    carDetectorLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = carDetectorLogFormData
  } else if (currentSelect.value == 8) {
    intelLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    intelLogFormData.data.logType = "维修日志"
    intelLogFormData.data.state = "连接"
    intelLogFormData.data.description = ""
    intelLogFormData.data.writerName = myStore.getUserInfo().name
    intelLogFormData.data.writerId = myStore.getCurrentUserId()
    intelLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    intelLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = intelLogFormData
  } else if (currentSelect.value == 9) {
    laneWeighingLogFormData.data = JSON.parse(JSON.stringify(equipmentLog))
    laneWeighingLogFormData.data.logType = "维修日志"
    laneWeighingLogFormData.data.state = "连接"
    laneWeighingLogFormData.data.description = ""
    laneWeighingLogFormData.data.writerName = myStore.getUserInfo().name
    laneWeighingLogFormData.data.writerId = myStore.getCurrentUserId()
    laneWeighingLogFormData.data.logTime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    laneWeighingLogFormData.data.errorCode = equipmentLog.logId
    nowLogForm = laneWeighingLogFormData
  }
  fixDialogVisible.value = true
}

const makeSureFix = () => {
  if (currentSelect.value == 1) {
    request.post("/etc-antenna-log-entity/addEtcAntennaLog",etcLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 2) {
    request.post("/camera-log-entity/addCameraLog",cameraLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 3) {
    request.post("/induction-screen-log-entity/addInductionScreenLog",inductionLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 4) {
    request.post("/entrance-equipment-log-entity/addEntranceEquipmentLog",entranceLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 5) {
    request.post("/export-payment-equipment-log-entity/addExportPaymentEquipmentLog",exportLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 6) {
    request.post("/awning-light-log-entity/addAwningLog",awningLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 7) {
    request.post("/car-detector-log-entity/addCarDetectorLog",carDetectorLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 8) {
    request.post("/intel-board-log-entity/addIntelBoardLog",intelLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 9) {
    request.post("/lane-weighing-equipment-log-entity/addLaneWeighingEquipmentLog",laneWeighingLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 8) {
    request.post("/intel-board-log-entity/addIntelBoardLog",intelLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  } else if (currentSelect.value == 9) {
    request.post("/lane-weighing-equipment-log-entity/addLaneWeighingEquipmentLog",laneWeighingLogFormData.data).then(res =>{
      ElMessage.success("维修上报成功")
      fixDialogVisible.value = false
      logDialogVisible.value = false
    })
  }
}

onMounted(() => {

})

</script>


<style scoped>

</style>