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
    <h1 style="text-align: center">车道基础设备</h1>
    <el-input v-model="searchParent" placeholder="请输入关键字" style="width: 10%;position: absolute;left: 10%;top: 7%"
              clearable/>
    <el-select placeholder="筛选设备状态" style="position: absolute;width: 10%;left: 21%;top: 7%" v-model="stateSelectParent">
      <el-option style="color: #ff5300" label="全部" value=""/>
      <el-option style="color: #ff5300" label="连接" value="连接"/>
      <el-option style="color: #ff5300" label="未连接" value="未连接"/>
    </el-select>
    <div style="width: 100%;display: flex;flex-flow: row wrap;">
      <div v-for="item in laneInfrastructureFilter"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <el-button @click="openEditParent(item)" style="position: absolute;top: 3%;right: 1%"
                     v-if="myStore.getUserInfo().type==1">
            <editor theme="filled" size="24" fill="#000000"/>
          </el-button>
          <h2>{{ item.laneInfrastructureName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteDialog(item)">删除</el-button>
        </el-card>
        <br>
      </div>
    </div>
  </div>

  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentLaneInfrastructures.laneInfrastructureName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>
    <div v-if="detailNum==0">
      <br>
      <h1 style="text-align: center">该预交易门架设备中尚未添加其他设备</h1>
    </div>
    <div v-else>

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
            <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(1)">删除</el-button>
          </el-card>
          <br>
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
            <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(2)">删除</el-button>
          </el-card>
          <br>
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
            <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(3)">删除</el-button>
          </el-card>
          <br>
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
            <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteChildDialog(4)">删除</el-button>
          </el-card>
          <br>
        </div>

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
    <el-button v-if="myStore.getUserType()!=3" type="info">上报故障</el-button>
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
        <el-input v-model="pageInfo.editLaneInfrastructures.laneInfrastructureName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-date-picker v-model="pageInfo.editLaneInfrastructures.installationDate"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="pageInfo.editLaneInfrastructures.equipmentIp"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editLaneInfrastructures.state" disabled/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditParent" type="primary">确定</el-button>
    <el-button @click="editParentVisible=false" type="danger">取消</el-button>
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
        <el-input v-model="pageInfo.addLaneInfrastructure.laneInfrastructureName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-date-picker v-model="pageInfo.addLaneInfrastructure.installationDate"/>
      </el-form-item>
      <el-form-item label="设备IP">
        <el-input v-model="pageInfo.addLaneInfrastructure.equipmentIp"/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAdd">添加</el-button>
  </el-dialog>

  <!--  确定删除对话框-->
  <el-dialog
      title="删除设备"
      v-model="deleteParentVisible"
      style="text-align: center"
      width="30%"
  >
    <h2 style="color: #d21632">确认删除？</h2>
    <h1>{{ pageInfo.currentLaneInfrastructures.laneInfrastructureName }}</h1>
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
      <el-option label="雨棚灯" value="1"/>
      <el-option label="车检器" value="2"/>
      <el-option label="情报板" value="3"/>
      <el-option label="车道称重设备" value="4"/>
    </el-select>
    <br><br>
    <div v-if="addChildSelect == 1">
      <h2>添加雨棚灯</h2>
      <div v-if="pageInfo.currentAwningLight.awningLightId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addAwningLight.awningLightName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addAwningLight.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addAwningLight.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addAwningLight.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="灯具类型">
            <el-select v-model="pageInfo.addAwningLight.fixtureType">
              <el-option label="类型1" value="类型1"/>
              <el-option label="类型2" value="类型2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="亮度">
            <el-input-number max="100" min="0" v-model="pageInfo.addAwningLight.brightness"/>
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentLaneInfrastructures.laneInfrastructureName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddAwningLight">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该车道基础设备已有雨棚灯，1个车道基础设备仅能拥有1个雨棚灯</h3>
    </div>
    <div v-if="addChildSelect == 2">
      <h2>添加车检器</h2>
      <div v-if="pageInfo.currentCarDetector.carDetectorId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addCarDetector.carDetectorName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addCarDetector.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addCarDetector.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addCarDetector.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="检测方式">
            <el-select v-model="pageInfo.addCarDetector.detectionMethod">
              <el-option label="电感" value="电感"/>
              <el-option label="红外线" value="红外线"/>
              <el-option label="摄像头" value="摄像头"/>
            </el-select>
          </el-form-item>
          <el-form-item label="检测范围">
            <el-input-number v-model="pageInfo.addCarDetector.detectionRange" min="0" max="100"/>
            米
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentLaneInfrastructures.laneInfrastructureName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddCarDetector">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该车道基础设备已有车检器，1个车道基础设备仅能拥有1个车检器</h3>
    </div>
    <div v-if="addChildSelect == 3">
      <h2>添加情报板</h2>
      <div v-if="pageInfo.currentIntelBoard.ledBoardId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addIntelBoard.ledBoardName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addIntelBoard.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addIntelBoard.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addIntelBoard.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="显示率">
            <el-input-number max="100" min="0" v-model="pageInfo.addIntelBoard.displayRate"/>
          </el-form-item>
          <el-form-item label="亮度">
            <el-input-number v-model="pageInfo.addIntelBoard.brightness" min="0" max="100"/>
          </el-form-item>
          <el-form-item label="对比度">
            <el-input-number v-model="pageInfo.addIntelBoard.contrastRatio" min="0" max="100"/>
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentLaneInfrastructures.laneInfrastructureName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddIntelBoard">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该车道基础设备已有情报板，1个车道基础设备仅能拥有1个情报板</h3>
    </div>
    <div v-if="addChildSelect == 4">
      <h2>添加车道称重设备</h2>
      <div v-if="pageInfo.currentLaneWeighingEquipment.laneWeighingId == null">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addLaneWeighingEquipment.laneWeighingName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addLaneWeighingEquipment.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addLaneWeighingEquipment.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addLaneWeighingEquipment.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="称重器状态">
            <el-input-number max="100" min="0" v-model="pageInfo.addLaneWeighingEquipment.weighingMachineState"/>
            %
          </el-form-item>
          <el-form-item label="亮度">
            <el-input-number v-model="pageInfo.addLaneWeighingEquipment.displayState" min="0" max="100"/>
            %
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentLaneInfrastructures.laneInfrastructureName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddLaneWeighingEquipment">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该车道基础设备已有车道称重设备，1个车道基础设备仅能拥有1个车道称重设备</h3>
    </div>
  </el-dialog>

  <!--  删除子设备-->
  <el-dialog
      title="删除子设备"
      v-model="deleteChildVisible"
      width="30%"
      style="text-align: center"
  >
    <template v-slot:title>
      {{
        currentType == 1 ? '删除雨棚灯' : currentType == 2 ? '删除车检器' : currentType == 3 ? '删除情报板' : '删除车道称重设备'
      }}
    </template>
    <h2>确认删除?</h2>
    <h1 v-if="currentType==1" style="color: #d21632">{{ pageInfo.currentAwningLight.awningLightName }}</h1>
    <h1 v-else-if="currentType==2" style="color: #d21632">{{ pageInfo.currentCarDetector.carDetectorName }}</h1>
    <h1 v-else-if="currentType==3" style="color:#d21632;">{{ pageInfo.currentIntelBoard.ledBoardName }}</h1>
    <h1 v-else-if="currentType==4" style="color: #d21632">{{pageInfo.currentLaneWeighingEquipment.laneWeighingName}}</h1>
    <br>
    <el-button type="primary" @click="makeSureDeleteChild">确定</el-button>
    <el-button @click="deleteChildVisible=false">取消</el-button>
  </el-dialog>


</template>

<script setup lang="ts">
import {CheckOne, CloseOne, Editor} from "@icon-park/vue-next";
import {computed, onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {
  AwningLight,
  CarDetector,
  IntelBoard,
  LaneInfrastructure,
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
  laneInfrastructures: [] as LaneInfrastructure[],
  addLaneInfrastructure: {} as LaneInfrastructure,
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
  addAwningLight: {} as AwningLight,
  addCarDetector: {} as CarDetector,
  addIntelBoard: {} as IntelBoard,
  addLaneWeighingEquipment: {} as LaneWeighingEquipment
})

/**
 * 查看子设备
 */

//车道基础设备中子设备的类型的数量
const detailNum = ref(0)

const goToDetail = (laneInfrastructure: LaneInfrastructure) => {
  detailNum.value = 0
  detailVisible.value = true
  pageInfo.currentLaneInfrastructures = laneInfrastructure
  pageInfo.currentAwningLight = reactive({} as AwningLight)
  pageInfo.currentCarDetector = reactive({} as CarDetector)
  pageInfo.currentIntelBoard = reactive({} as IntelBoard)
  pageInfo.currentLaneWeighingEquipment = reactive({} as LaneWeighingEquipment)
  request.get("/lane-infrastructure-entity/getLaneInfrastructureDetailById/" + laneInfrastructure.laneInfrastructureId).then(res => {
    if (res.data.data.awningLightEntity) {
      pageInfo.currentAwningLight = res.data.data.awningLightEntity
      detailNum.value++
    }
    if (res.data.data.carDetectorEntity) {
      pageInfo.currentCarDetector = res.data.data.carDetectorEntity
      detailNum.value++
    }
    if (res.data.data.intelBoardEntity) {
      pageInfo.currentIntelBoard = res.data.data.intelBoardEntity
      detailNum.value++
    }
    if (res.data.data.laneWeighingEquipmentEntity) {
      pageInfo.currentLaneWeighingEquipment = res.data.data.laneWeighingEquipmentEntity
      detailNum.value++
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
const openEditParent = (item: LaneInfrastructure) => {
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

//添加父设备
const addEquipmentVisible = ref(false)
//打开添加父设备对话框
const openAddParentDialog = () => {
  pageInfo.addLaneInfrastructure = reactive({} as LaneInfrastructure)
  addEquipmentVisible.value = true
}

const makeSureAdd = () => {
  request.post("/lane-infrastructure-entity/addLaneInfrastructure", pageInfo.addLaneInfrastructure).then(res => {
    pageInfo.laneInfrastructures = res.data
    ElMessage.success("添加成功")
    addEquipmentVisible.value = false
  })
}

//删除父设备

const deleteParentVisible = ref(false)
const openDeleteDialog = (item: LaneInfrastructure) => {
  pageInfo.currentLaneInfrastructures = JSON.parse(JSON.stringify(item))
  deleteParentVisible.value = true
}

const makeSureDeleteParent = () => {
  request.get("/lane-infrastructure-entity/deleteLaneInfrastructure/" + pageInfo.currentLaneInfrastructures.laneInfrastructureId).then(res => {
    pageInfo.laneInfrastructures = res.data
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
  pageInfo.addAwningLight = {} as AwningLight
  pageInfo.addCarDetector = {} as CarDetector
  pageInfo.addIntelBoard = {} as IntelBoard
  pageInfo.addLaneWeighingEquipment = {} as LaneWeighingEquipment
}

//确认添加雨棚灯
const makeSureAddAwningLight = () => {
  pageInfo.addAwningLight.laneInfrastructureId = pageInfo.currentLaneInfrastructures.laneInfrastructureId
  request.post("/awning-light-entity/addAwningLight", pageInfo.addAwningLight).then(res => {
    addChildVisible.value = false
    pageInfo.currentAwningLight = res.data
    ElMessage.success("添加成功")
    detailNum.value++
  })
}

//确认添加车辆检测器
const makeSureAddCarDetector = () => {
  pageInfo.addCarDetector.laneInfrastructureId = pageInfo.currentLaneInfrastructures.laneInfrastructureId
  request.post("/car-detector-entity/addCarDetector", pageInfo.addCarDetector).then(res => {
    addChildVisible.value = false
    pageInfo.currentCarDetector = res.data
    ElMessage.success("添加成功")
    detailNum.value++
  })
}

//确认添加情报板
const makeSureAddIntelBoard = () => {
  pageInfo.addIntelBoard.laneInfrastructureId = pageInfo.currentLaneInfrastructures.laneInfrastructureId
  request.post("/intel-board-entity/addIntelBoard", pageInfo.addIntelBoard).then(res => {
    addChildVisible.value = false
    pageInfo.currentIntelBoard = res.data
    ElMessage.success("添加成功")
    detailNum.value++
  })
}

//确认添加车道称重设备
const makeSureAddLaneWeighingEquipment = () => {
  pageInfo.addLaneWeighingEquipment.laneInfrastructureId = pageInfo.currentLaneInfrastructures.laneInfrastructureId
  request.post("/lane-weighing-equipment-entity/addLaneWeighingEquipment", pageInfo.addLaneWeighingEquipment).then(res => {
    addChildVisible.value = false
    pageInfo.currentLaneWeighingEquipment = res.data
    ElMessage.success("添加成功")
    detailNum.value++
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
  if (currentType.value == 1){
    request.get("/awning-light-entity/deleteAwningLight/"+pageInfo.currentAwningLight.awningLightId).then(res=>{
      ElMessage.success("删除成功")
      pageInfo.currentAwningLight = {} as AwningLight
    })
  }
  else if (currentType.value == 2){
    request.get("/car-detector-entity/deleteCarDetector/"+pageInfo.currentCarDetector.carDetectorId).then(res=>{
      ElMessage.success("删除成功")
      pageInfo.currentCarDetector = {} as CarDetector
    })
  }
  else if (currentType.value == 3){
    request.get("/intel-board-entity/deleteIntelBoard/"+pageInfo.currentIntelBoard.ledBoardId).then(res=>{
      ElMessage.success("删除成功")
      pageInfo.currentIntelBoard = {} as IntelBoard
    })
  }
  else {
    request.get("/lane-weighing-equipment-entity/deleteLaneWeighingEquipment/"+pageInfo.currentLaneWeighingEquipment.laneWeighingId).then(res =>{
      ElMessage.success("删除成功")
      pageInfo.currentLaneWeighingEquipment = {} as LaneWeighingEquipment
    })
  }
}

/**
 * 查询与筛选
 */

//父设备查询与筛选
const searchParent = ref('')
const stateSelectParent = ref('')

const laneInfrastructureFilter = computed(() => {
  return pageInfo.laneInfrastructures.filter((item) => {
    return (item.laneInfrastructureName.includes(searchParent.value) || item.equipmentIp.includes(searchParent.value))
        && (item.state==stateSelectParent.value || stateSelectParent.value=='')
  })
})

onMounted(() => {
  request.get("/lane-infrastructure-entity/getAllLaneInfrastructure").then(res => {
    pageInfo.laneInfrastructures = res.data
  })
})


</script>

<style scoped>
.el-card{
  width: 95%;left: 2.5%;position: relative;
}
</style>