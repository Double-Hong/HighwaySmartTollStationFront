<template>
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>
  <div v-if="myStore.getUserInfo().type==1" style="position: absolute;top:7%;left: 1%;width: 10%">
    <el-button v-if="!detailVisible" type="success" @click="openAddParentDialog">新增设备</el-button>
    <el-button v-else type="success" @click="openAddChildDialog" style="position: absolute;left: 20%">新增子设备</el-button>
  </div>
  <div v-if="!detailVisible">
    <h1 style="text-align: center">车道智能自助设备</h1>
    <el-input v-model="searchParent" placeholder="请输入关键字" style="width: 10%;position: absolute;left: 10%;top: 7%"
              clearable/>
    <el-select placeholder="筛选设备状态" style="position: absolute;width: 10%;left: 21%;top: 7%" v-model="stateSelectParent">
      <el-option style="color: #ff5300" label="全部" value=""/>
      <el-option style="color: #ff5300" label="连接" value="连接"/>
      <el-option style="color: #ff5300" label="未连接" value="未连接"/>
    </el-select>
    <div style="width: 100%;display: flex;flex-flow: row wrap;">
      <div v-for="item in laneSmartFilter"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <el-button @click="openEditParent(item)" style="position: absolute;top: 3%;right: 1%"
                     v-if="myStore.getUserInfo().type==1">
            <editor theme="filled" size="24" fill="#000000"/>
          </el-button>
          <h2>{{ item.laneSmartDeviceName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteDialog(item)">删除</el-button>
        </el-card>
        <br>
      </div>
    </div>

  </div>
  <!--  详情界面-->
  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentDevice.laneSmartDeviceName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>

    <h1 v-if="!flag1" style="text-align: center">该设备尚未关联入口设备，请尽快添加</h1>
    <h1 v-if="!flag2" style="text-align: center">该设备尚未关联出口设备，请尽快添加</h1>
    <div style="display: flex;flex-flow: row wrap;">
      <div v-if="flag1" style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card style="width: 95%;left: 2.5%;position: relative">
          <check-one v-if="pageInfo.entranceEquipment.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.entranceEquipment.entranceName }}</h2>
          <p>安装日期:{{ pageInfo.entranceEquipment.installationDate }}</p>
          <p>IP地址:{{ pageInfo.entranceEquipment.equipmentIp }}</p>
          <el-button @click="goToEntranceDetail">详情</el-button>
          <el-button type="info">设备日志</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(1)">删除</el-button>
        </el-card>
      </div>
      <div v-if="flag2" style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card style="width: 95%;left: 2.5%;position: relative">
          <check-one v-if="pageInfo.exportPaymentEquipment.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ pageInfo.exportPaymentEquipment.exportName }}</h2>
          <p>安装日期:{{ pageInfo.exportPaymentEquipment.installationDate }}</p>
          <p>IP地址:{{ pageInfo.exportPaymentEquipment.equipmentIp }}</p>
          <el-button @click="goToExportDetail">详情</el-button>
          <el-button type="info">设备日志</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(2)">删除</el-button>
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
        <el-descriptions-item label="所属设备">{{ pageInfo.currentDevice.laneSmartDeviceName }}</el-descriptions-item>
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
        <el-descriptions-item label="所属设备">{{ pageInfo.currentDevice.laneSmartDeviceName }}</el-descriptions-item>
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
      <el-form-item label="IP地址">
        <el-input :disabled="myStore.getUserType()!=1" v-model="pageInfo.editEntranceEquipment.equipmentIp"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input :disabled="myStore.getUserType()!=1" v-model="pageInfo.editEntranceEquipment.installationDate"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editEntranceEquipment.state"/>
      </el-form-item>
      <el-form-item label="卡片数量">
        <el-input-number min="0" max="500" v-model="pageInfo.editEntranceEquipment.cardNumber"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentDevice.laneSmartDeviceName"/>
      </el-form-item>
    </el-form>

    <el-form v-else label-width="100">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editExportPaymentEquipment.exportName"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input :disabled="myStore.getUserType()!=1" v-model="pageInfo.editExportPaymentEquipment.equipmentIp"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input :disabled="myStore.getUserType()!=1" v-model="pageInfo.editExportPaymentEquipment.installationDate"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editExportPaymentEquipment.state"/>
      </el-form-item>
      <el-form-item label="收据纸数量">
        <el-input-number min="0" max="500" v-model="pageInfo.editExportPaymentEquipment.receiptNumber"/>
      </el-form-item>
      <el-form-item label="扫描器状态">
        <el-select v-model="pageInfo.editExportPaymentEquipment.scannerState">
          <el-option label="正常" value="正常"/>
          <el-option label="故障" value="故障"/>
        </el-select>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentDevice.laneSmartDeviceName"/>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="makeSureEdit">确定</el-button>
    <el-button type="danger" @click="editChildVisible=false">取消</el-button>
  </el-dialog>

  <!--  新增设备对话框-->
  <el-dialog
      title="添加设备"
      v-model="addEquipmentVisible"
      width="40%"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="设备名称">
        <el-input v-model="pageInfo.addLaneSmart.laneSmartDeviceName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-date-picker v-model="pageInfo.addLaneSmart.installationDate"/>
      </el-form-item>
      <el-form-item label="设备IP">
        <el-input v-model="pageInfo.addLaneSmart.equipmentIp"/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAdd">添加</el-button>
  </el-dialog>

  <!--  修改父设备对话框-->
  <el-dialog
      v-model="editParentVisible"
      width="30%"
      :title="pageInfo.currentDevice.laneSmartDeviceName"
      style="text-align: center"
  >
    <el-form label-width="75px">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editLaneSmartDevice.laneSmartDeviceName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-date-picker v-model="pageInfo.editLaneSmartDevice.installationDate"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="pageInfo.editLaneSmartDevice.equipmentIp"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editLaneSmartDevice.state" disabled/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditParent" type="primary">确定</el-button>
    <el-button @click="editParentVisible=false" type="danger">取消</el-button>
  </el-dialog>

  <!--  确定删除对话框-->
  <el-dialog
      title="删除设备"
      v-model="deleteParentVisible"
      style="text-align: center"
      width="30%"
  >

    <h2 style="color: #d21632">确认删除？</h2>
    <h1>{{ pageInfo.currentDevice.laneSmartDeviceName }}</h1>
    <br>
    <el-button type="primary" @click="makeSureDeleteParent">确定</el-button>
    <el-button @click="deleteParentVisible=false">取消</el-button>
  </el-dialog>

  <!--  新增子设备-->
  <el-dialog
      title="新增子设备"
      v-model="addChildVisible"
      width="50%"
      style="text-align: center"
  >
    <el-select v-model="addChildSelect" style="width: 50%" placeholder="选择添加设备类型">
      <el-option label="入口设备" value="1"/>
      <el-option label="出口设备" value="2"/>
    </el-select>
    <br><br>
    <div v-if="addChildSelect==1">
      <h2>添加入口设备</h2>
      <div v-if="pageInfo.entranceEquipment.entranceEquipmentId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addEntranceEquipment.entranceName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addEntranceEquipment.installationDate"/>
          </el-form-item>
          <el-form-item label="卡片数量">
            <el-input-number v-model="pageInfo.addEntranceEquipment.cardNumber"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addEntranceEquipment.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addEntranceEquipment.equipmentIp"/>
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentDevice.laneSmartDeviceName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddEntrance">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 v-else style="color: #d21632">该车道智能自助设备已有入口设备，1个车道智能自助设备仅能拥有1个入口设备</h3>
    </div>

    <div v-else-if="addChildSelect == 2">
      <h2>添加出口设备</h2>
      <div v-if="pageInfo.exportPaymentEquipment.exportEquipmentId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addExportPaymentEquipment.exportName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addExportPaymentEquipment.installationDate"/>
          </el-form-item>
          <el-form-item label="收据纸数量">
            <el-input-number v-model="pageInfo.addExportPaymentEquipment.receiptNumber"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addExportPaymentEquipment.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="扫描器状态">
            <el-select v-model="pageInfo.addExportPaymentEquipment.scannerState">
              <el-option label="正常" value="正常"/>
              <el-option label="故障" value="故障"/>
            </el-select>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addExportPaymentEquipment.equipmentIp"/>
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentDevice.laneSmartDeviceName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddExport">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 v-else style="color: #d21632">该车道智能自助设备已有出口设备，1个车道智能自助设备仅能拥有1个出口设备</h3>
    </div>

  </el-dialog>

  <el-dialog
      title="删除子设备"
      v-model="deleteChildVisible"
      style="text-align: center"
      width="30%"
  >
    <template v-slot:title>
      {{ currentType == 1 ? '删除入口设备' : '删除出口设备' }}
    </template>
    <h2>确认删除?</h2>
    <h1 v-if="currentType==1" style="color: #d21632">{{ pageInfo.entranceEquipment.entranceName }}</h1>
    <h1 v-else style="color: #d21632">{{ pageInfo.exportPaymentEquipment.exportName }}</h1>
    <br>
    <el-button type="primary" @click="makeSureDeleteChild">确定</el-button>
    <el-button @click="deleteChildVisible=false">取消</el-button>
  </el-dialog>

</template>

<script setup lang="ts">
import {CheckOne, CloseOne, Editor} from "@icon-park/vue-next";
import {computed, onMounted, reactive, ref} from "vue";
import {
  EntranceEquipment,
  ExportPaymentEquipment,
  LaneSmartDevice,
  preTransactionGantryEquipment
} from "../../utils/interface.ts";
import request from "../../request/request.ts";
import {ElMessage} from "element-plus";
import {store} from "../../utils/store.ts";
import MyForm from "../FormComponent/MyForm.vue";
import {addEntranceEquipmentData} from "../FormComponent/type.ts";

const detailVisible = ref(false)
const pageInfo = reactive({
  laneSmartDevices: [] as LaneSmartDevice[],
  addLaneSmart: {} as LaneSmartDevice,
  editLaneSmartDevice: {} as LaneSmartDevice,
  currentDevice: {} as LaneSmartDevice,
  exportPaymentEquipment: {} as ExportPaymentEquipment,
  entranceEquipment: {} as EntranceEquipment,
  editExportPaymentEquipment: {} as ExportPaymentEquipment,
  editEntranceEquipment: {} as EntranceEquipment,
  addEntranceEquipment: {} as EntranceEquipment,
  addExportPaymentEquipment: {} as ExportPaymentEquipment,

})

const myStore = store()
//标识该智能自助设备是否有出口和入口设备
const flag1 = ref(false)
const flag2 = ref(false)

const goToDetail = (laneSmartDevice: LaneSmartDevice) => {
  detailVisible.value = true
  pageInfo.currentDevice = laneSmartDevice
  pageInfo.entranceEquipment = reactive({} as EntranceEquipment)
  pageInfo.exportPaymentEquipment = reactive({} as ExportPaymentEquipment)
  flag1.value = false
  flag2.value = false
  request.get("/lane-smart-device-entity/getSmartDeviceDetailById/" + pageInfo.currentDevice.laneSmartDeviceId).then(res => {
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
  currentType.value = 1
}

//查看出口详情
const goToExportDetail = () => {
  childDialogVisible.value = true
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

const makeSureEdit = () => {
  editChildVisible.value = false
  if (currentType.value == 1) {
    request.post("/entrance-equipment-entity/updateEntranceEquipment", pageInfo.editEntranceEquipment).then(res => {
      pageInfo.entranceEquipment = JSON.parse(JSON.stringify(pageInfo.editEntranceEquipment))
      ElMessage.success("修改成功")
    })
  } else {
    request.post("/export-payment-equipment-entity/updateExportPaymentEquipment", pageInfo.editExportPaymentEquipment).then(res => {
      pageInfo.exportPaymentEquipment = JSON.parse(JSON.stringify(pageInfo.editExportPaymentEquipment))
      ElMessage.success("修改成功")
    })
  }
}

const editParentVisible = ref(false)

//打开修改父设备对话框
const openEditParent = (item: LaneSmartDevice) => {
  pageInfo.editLaneSmartDevice = JSON.parse(JSON.stringify(item))
  pageInfo.currentDevice = JSON.parse(JSON.stringify(item))
  editParentVisible.value = true
}

//确认修改父设备
const makeSureEditParent = () => {
  request.post("/lane-smart-device-entity/updateLaneSmartDevice", pageInfo.editLaneSmartDevice).then(res => {
    pageInfo.laneSmartDevices = res.data
    ElMessage.success("修改成功")
  })
  editParentVisible.value = false
}

//添加父设备

const addEquipmentVisible = ref(false)
//打开添加父设备对话框
const openAddParentDialog = () => {
  pageInfo.addLaneSmart = reactive({} as LaneSmartDevice)
  addEquipmentVisible.value = true
}

const makeSureAdd = () => {
  request.post("/lane-smart-device-entity/addLaneSmartDevice", pageInfo.addLaneSmart).then(res => {
    pageInfo.laneSmartDevices = res.data
    ElMessage.success("添加成功")
    addEquipmentVisible.value = false
  })
}

//删除父设备

const deleteParentVisible = ref(false)

const openDeleteDialog = (item: LaneSmartDevice) => {
  pageInfo.currentDevice = JSON.parse(JSON.stringify(item))
  deleteParentVisible.value = true
}

const makeSureDeleteParent = () => {
  request.get("/lane-smart-device-entity/deleteLaneSmartDevice/" + pageInfo.currentDevice.laneSmartDeviceId).then(res => {
    pageInfo.laneSmartDevices = res.data
    ElMessage.success("删除成功")
    deleteParentVisible.value = false
  })
}

/**
 * 新增子设备
 */

//新增子设备对话框可见性
const addChildVisible = ref(false)
//新增子设备，选择新增哪个子设备
const addChildSelect = ref('')

//打开新增子设备对话框
const openAddChildDialog = () => {
  addChildVisible.value = true
  addChildSelect.value = ''
  pageInfo.addEntranceEquipment = reactive({} as EntranceEquipment)
  pageInfo.addExportPaymentEquipment = reactive({} as ExportPaymentEquipment)
}

//确认添加入口设备
const makeSureAddEntrance = () => {
  pageInfo.addEntranceEquipment.laneSmartDeviceId = pageInfo.currentDevice.laneSmartDeviceId
  request.post("/entrance-equipment-entity/addEntranceEquipment/" + pageInfo.currentDevice.laneSmartDeviceId, pageInfo.addEntranceEquipment).then(res => {
    ElMessage.success("添加成功")
    refreshDetail()
  })
}

//确认添加出口设备
const makeSureAddExport = () => {
  pageInfo.addExportPaymentEquipment.laneSmartDeviceId = pageInfo.currentDevice.laneSmartDeviceId
  request.post("/export-payment-equipment-entity/addExportPaymentEquipment/" + pageInfo.currentDevice.laneSmartDeviceId, pageInfo.addExportPaymentEquipment).then(res => {
    ElMessage.success("添加成功")
    refreshDetail()
  })
}

/**
 * 删除子设备
 */

const deleteChildVisible = ref(false)

const openDeleteChildDialog = (type: number) => {
  deleteChildVisible.value = true
  currentType.value = type
}

const makeSureDeleteChild = () => {
  deleteChildVisible.value = false
  if (currentType.value == 1) {
    request.get("/entrance-equipment-entity/deleteEntranceEquipment/" + pageInfo.entranceEquipment.entranceEquipmentId).then(res => {
      ElMessage.success("删除成功")
      refreshDetail()
    })
  } else {
    request.get("/export-payment-equipment-entity/deleteExportPaymentEquipment/" + pageInfo.exportPaymentEquipment.exportEquipmentId).then(res => {
      ElMessage.success("删除成功")
      refreshDetail()
    })
  }
}

//刷新设备详情界面
const refreshDetail = () => {
  pageInfo.entranceEquipment = reactive({} as EntranceEquipment)
  pageInfo.exportPaymentEquipment = reactive({} as ExportPaymentEquipment)
  flag1.value = false
  flag2.value = false
  request.get("/lane-smart-device-entity/getSmartDeviceDetailById/" + pageInfo.currentDevice.laneSmartDeviceId).then(res => {
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

/**
 * 查询与筛选
 */

//父设备查询与筛选
const searchParent = ref('')
const stateSelectParent = ref('')

const laneSmartFilter = computed(() => {
  return pageInfo.laneSmartDevices.filter((item) => {
    return (item.laneSmartDeviceName.includes(searchParent.value) || item.equipmentIp.includes(searchParent.value))
        && (item.state==stateSelectParent.value || stateSelectParent.value=='')
  })
})

onMounted(() => {
  request.get("/lane-smart-device-entity/getAllLaneSmartDevice").then(res => {
    pageInfo.laneSmartDevices = res.data
  })
})

</script>

<style scoped>
.el-card{
  width: 95%;left: 2.5%;position: relative;
}
</style>