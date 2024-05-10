<template>
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>
  <div v-if="!detailVisible">
    <h1 style="text-align: center">车道智能自助设备</h1>
    <div style="width: 100%;display: flex">
      <div v-for="item in pageInfo.laneSmartDevices"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.laneSmartDeviceName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
        </el-card>

      </div>
    </div>

  </div>
  <!--  详情界面-->
  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentDevices.laneSmartDeviceName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>

    <h1 v-if="!flag1" style="text-align: center">该设备尚未关联入口设备，请尽快添加</h1>
    <h1 v-if="!flag2" style="text-align: center">该设备尚未关联出口设备，请尽快添加</h1>
    <div v-if="flag1&&flag2" style="display: flex;flex-flow: row wrap;">
      <div style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="pageInfo.entranceEquipment.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.entranceEquipment.entranceName }}</h2>
          <p>安装日期:{{ pageInfo.entranceEquipment.installationDate }}</p>
          <p>IP地址:{{ pageInfo.entranceEquipment.equipmentIp }}</p>
          <el-button @click="goToEntranceDetail">详情</el-button>
        </el-card>
      </div>
      <div style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="pageInfo.exportPaymentEquipment.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.exportPaymentEquipment.exportName }}</h2>
          <p>安装日期:{{ pageInfo.exportPaymentEquipment.installationDate }}</p>
          <p>IP地址:{{ pageInfo.exportPaymentEquipment.equipmentIp }}</p>
          <el-button @click="goToExportDetail">详情</el-button>
        </el-card>
      </div>
    </div>
  </div>

  <el-dialog
      width="50%"
      v-model="childDialogVisible"
      style="text-align: center"
  >
    <template v-slot:header>
      <div v-if="currentType==1">
        {{ pageInfo.entranceEquipment.entranceName }}
      </div>
      <div v-else>
        {{ pageInfo.exportPaymentEquipment.exportName }}
      </div>
    </template>
    <div v-if="currentType==1">
      <el-descriptions
          direction="vertical"
          :column="3"
          border
      >
        <el-descriptions-item label="设备名称">{{ pageInfo.entranceEquipment.entranceName }}</el-descriptions-item>
        <el-descriptions-item label="设备IP">{{ pageInfo.entranceEquipment.equipmentIp }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">{{ pageInfo.entranceEquipment.state }}</el-descriptions-item>
        <el-descriptions-item label="安装日期">{{ pageInfo.entranceEquipment.installationDate }}</el-descriptions-item>
        <el-descriptions-item label="卡片数量">{{ pageInfo.entranceEquipment.cardNumber }}</el-descriptions-item>
        <el-descriptions-item label="所属设备">{{ pageInfo.currentDevices.laneSmartDeviceName }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-else>
      <el-descriptions
          direction="vertical"
          :column="3"
          border
      >
        <el-descriptions-item label="设备名称">{{ pageInfo.exportPaymentEquipment.exportName }}</el-descriptions-item>
        <el-descriptions-item label="设备IP">{{ pageInfo.exportPaymentEquipment.equipmentIp }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">{{ pageInfo.exportPaymentEquipment.state }}</el-descriptions-item>
        <el-descriptions-item label="安装日期">{{
            pageInfo.exportPaymentEquipment.installationDate
          }}
        </el-descriptions-item>
        <el-descriptions-item label="收据纸数量">{{
            pageInfo.exportPaymentEquipment.receiptNumber
          }}
        </el-descriptions-item>
        <el-descriptions-item label="扫描器状态">{{
            pageInfo.exportPaymentEquipment.scannerState
          }}
        </el-descriptions-item>
        <el-descriptions-item label="所属设备">{{ pageInfo.currentDevices.laneSmartDeviceName }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <br>
    <el-button type="primary" @click="openEditChild">修改</el-button>
  </el-dialog>

  <el-dialog
      title="修改"
      width="30%"
      top="10vh"
      v-model="editChildVisible"
      style="text-align: center"
  >

    <el-form v-if="currentType == 1" label-width="100">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editEntranceEquipment.entranceName"/>
      </el-form-item>
      <el-form-item label="IP地址" >
        <el-input disabled v-model="pageInfo.editEntranceEquipment.equipmentIp"/>
      </el-form-item>
      <el-form-item label="安装日期" >
        <el-input disabled v-model="pageInfo.editEntranceEquipment.installationDate"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="pageInfo.editEntranceEquipment.state"/>
      </el-form-item>
      <el-form-item label="卡片数量" >
        <el-input-number min="0" max="500" v-model="pageInfo.editEntranceEquipment.cardNumber"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentDevices.laneSmartDeviceName"/>
      </el-form-item>
    </el-form>

    <el-form v-else label-width="100">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editExportPaymentEquipment.exportName"/>
      </el-form-item>
      <el-form-item label="IP地址" >
        <el-input disabled v-model="pageInfo.editExportPaymentEquipment.equipmentIp"/>
      </el-form-item>
      <el-form-item label="安装日期" >
        <el-input disabled v-model="pageInfo.editExportPaymentEquipment.installationDate"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="pageInfo.editExportPaymentEquipment.state"/>
      </el-form-item>
      <el-form-item label="收据纸数量" >
        <el-input-number min="0" max="500" v-model="pageInfo.editExportPaymentEquipment.receiptNumber"/>
      </el-form-item>
      <el-form-item label="扫描器状态">
        <el-input v-model="pageInfo.editExportPaymentEquipment.scannerState"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentDevices.laneSmartDeviceName"/>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="makeSureEdit">确定</el-button>
    <el-button type="danger" @click="editChildVisible=false">取消</el-button>
  </el-dialog>

</template>

<script setup lang="ts">
import {CheckOne, CloseOne} from "@icon-park/vue-next";
import {onMounted, reactive, ref} from "vue";
import {EntranceEquipment, ExportPaymentEquipment, LaneSmartDevice} from "../../utils/interface.ts";
import request from "../../request/request.ts";
import {ElMessage} from "element-plus";

const detailVisible = ref(false)
const pageInfo = reactive({
  laneSmartDevices: {} as LaneSmartDevice[],
  currentDevices: {} as LaneSmartDevice,
  exportPaymentEquipment: {} as ExportPaymentEquipment,
  entranceEquipment: {} as EntranceEquipment,
  editExportPaymentEquipment: {} as ExportPaymentEquipment,
  editEntranceEquipment: {} as EntranceEquipment,
})

//标识该智能自助设备是否有出口和入口设备
const flag1 = ref(false)
const flag2 = ref(false)

const goToDetail = (laneSmartDevice: LaneSmartDevice) => {
  detailVisible.value = true
  pageInfo.currentDevices = laneSmartDevice
  pageInfo.entranceEquipment = reactive({} as EntranceEquipment)
  pageInfo.exportPaymentEquipment = reactive({} as ExportPaymentEquipment)
  flag1.value = false
  flag2.value = false
  request.get("/lane-smart-device-entity/getSmartDeviceDetailById/" + pageInfo.currentDevices.laneSmartDeviceId).then(res => {
    if (res.data.data.entranceEquipmentEntity != null) {
      pageInfo.entranceEquipment = res.data.data.entranceEquipmentEntity
      flag1.value = true
    }
    if (res.data.data.exportPaymentEquipmentEntity != null) {
      pageInfo.exportPaymentEquipment = res.data.data.exportPaymentEquipmentEntity
      flag2.value = true
    }
  })
}

//查看子设备详情对话框可见性
const childDialogVisible = ref(false)

//当前子设备类型，1为入口，2为出口
const currentType = ref(1)

//查看入口详情
const goToEntranceDetail = () => {
  childDialogVisible.value = true
  console.log("查看入口详情")
  currentType.value = 1
}

//查看出口详情
const goToExportDetail = () => {
  childDialogVisible.value = true
  console.log("查看出口详情")
  currentType.value = 2
}

//修改

//修改子设备对话框可见性
const editChildVisible = ref(false)

const openEditChild = () => {
  editChildVisible.value = true
  pageInfo.editEntranceEquipment = JSON.parse(JSON.stringify(pageInfo.entranceEquipment))
  pageInfo.editExportPaymentEquipment = JSON.parse(JSON.stringify(pageInfo.exportPaymentEquipment))
}

const makeSureEdit=()=>{
  editChildVisible.value = false
  if (currentType.value == 1){
    request.post("/entrance-equipment-entity/updateEntranceEquipment",pageInfo.editEntranceEquipment).then(res=>{
      pageInfo.entranceEquipment = JSON.parse(JSON.stringify(pageInfo.editEntranceEquipment))
      ElMessage.success("修改成功")
    })
  }
  else {
    request.post("/export-payment-equipment-entity/updateExportPaymentEquipment",pageInfo.editExportPaymentEquipment).then(res =>{
      pageInfo.exportPaymentEquipment = JSON.parse(JSON.stringify(pageInfo.editExportPaymentEquipment))
      ElMessage.success("修改成功")
    })
  }
}

onMounted(() => {
  request.get("/lane-smart-device-entity/getAllLaneSmartDevice").then(res => {
    pageInfo.laneSmartDevices = res.data
  })
})

</script>

<style scoped>

</style>