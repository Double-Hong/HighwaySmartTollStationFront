<template>
  <!--提示-->
  <div style="position: absolute;right: 1%;top: 8%;display: flex">
    <check-one theme="filled" size="24" fill="#09eb49"/>
    <span>设备正常</span>
    <close-one theme="filled" size="24" fill="#eb0909"/>
    <span>设备异常</span>
  </div>
  <div v-if="myStore.getUserInfo().type==1" style="position: absolute;top:7%;left: 1%;width: 10%">
    <el-button v-if="!detailVisible" type="success" @click="openAddParentDialog">新增设备</el-button>
    <el-button v-else type="success" @click="openAddChildDialog" style="position: absolute;left: 20%">新增子设备
    </el-button>
  </div>
  <!--  总览界面-->
  <div v-if="!detailVisible">
    <h1 style="text-align: center">预交易门架设备</h1>
    <el-input v-model="searchParent" placeholder="请输入关键字" style="width: 10%;position: absolute;left: 10%;top: 7%"
              clearable/>
    <el-select placeholder="筛选设备状态" style="position: absolute;width: 10%;left: 21%;top: 7%" v-model="stateSelectParent">
      <el-option style="color: #ff5300" label="全部" value=""/>
      <el-option style="color: #ff5300" label="连接" value="连接"/>
      <el-option style="color: #ff5300" label="未连接" value="未连接"/>
    </el-select>
    <div style="display: flex;flex-flow: row wrap;width: 100%">
      <div v-for="item in preTransactionFilter"
           style="position: relative;width: 33.3%;height: 100%;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled" size="24"
                     fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <el-button @click="openEditParent(item)" style="position: absolute;top: 3%;right: 1%"
                     v-if="myStore.getUserInfo().type==1">
            <editor theme="filled" size="24" fill="#000000"/>
          </el-button>

          <h2>{{ item.transactionName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button type="primary" @click="goToDetail(item)">详细信息</el-button>
          <el-button v-if="myStore.getUserInfo().type==1" type="danger" @click="openDeleteDialog(item)">删除</el-button>
        </el-card>

      </div>
    </div>
  </div>

  <!--  详情界面-->
  <div v-else>
    <h1 style="text-align: center">{{ pageInfo.currentEquipment.transactionName }}</h1>
    <el-button style="position: absolute;top: 1%;left: 1%" @click="detailVisible = false">返回</el-button>

    <div v-if="detailNum==0">
      <br>
      <h1 style="text-align: center">该预交易门架设备中尚未添加其他设备</h1>
    </div>

    <div v-else style="display: flex;flex-flow: row wrap;">
      <!--    ETC天线-->
      <div v-for="item in pageInfo.antennas" style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%" theme="filled"
                     size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.antennaName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button @click="goToAntennaDetail(item)">详情</el-button>
          <el-button type="info">设备日志</el-button>
          <el-button type="danger" @click="openDeleteChildDialog(1)">删除</el-button>

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
          <el-button @click="goToCameraDetail(item)">详情</el-button>
          <el-button @click="deviceLogVisible=true" type="info">设备日志</el-button>
          <el-button type="danger" @click="openDeleteCameraDialog(item)">删除</el-button>
        </el-card>
      </div>
      <!--    诱导屏-->
      <div v-for="item in pageInfo.inductionScreens"
           style="width: 33%;height: 100%;position: relative;text-align: center">
        <el-card>
          <check-one v-if="item.state=='连接'" style="position: absolute;left: 5%;top: 5%"
                     theme="filled" size="24" fill="#09eb49"/>
          <close-one v-else style="position: absolute;left: 5%;top: 5%" theme="filled" size="24" fill="#eb0909"/>
          <h2>{{ item.inductionScreenName }}</h2>
          <p>安装日期:{{ item.installationDate }}</p>
          <p>IP地址:{{ item.equipmentIp }}</p>
          <el-button @click="goToInductionScreenDetail(item)">详情</el-button>
          <el-button type="info">设备日志</el-button>
          <el-button type="danger" @click="openDeleteChildDialog(3)">删除</el-button>

        </el-card>
      </div>
    </div>
  </div>

  <!--  子设备详情界面对话框-->
  <el-dialog
      v-model="childDetailVisible"
      width="50%"
      style="text-align: center"
  >
    <template v-slot:header>
      <div v-if="currentType== 1 ">
        {{ pageInfo.currentAntenna.antennaName }}
      </div>
      <div v-else-if="currentType==2">
        {{ pageInfo.currentCamera.cameraName }}
      </div>
      <div v-else>
        {{ pageInfo.currentInductionScreen.inductionScreenName }}
      </div>
    </template>
    <el-descriptions
        direction="vertical"
        :column="3"
        border
    >
      <el-descriptions-item label="安装时间">
        <div v-if="currentType == 1">
          {{ pageInfo.currentAntenna.installationDate }}
        </div>
        <div v-else-if="currentType == 2">
          {{ pageInfo.currentCamera.installationDate }}
        </div>
        <div v-else>
          {{ pageInfo.currentInductionScreen.installationDate }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="IP地址">
        <div v-if="currentType == 1">
          {{ pageInfo.currentAntenna.equipmentIp }}
        </div>
        <div v-else-if="currentType == 2">
          {{ pageInfo.currentCamera.equipmentIp }}
        </div>
        <div v-else>
          {{ pageInfo.currentInductionScreen.equipmentIp }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <div v-if="currentType == 1">
          {{ pageInfo.currentAntenna.state }}
        </div>
        <div v-else-if="currentType == 2">
          {{ pageInfo.currentCamera.state }}
        </div>
        <div v-else>
          {{ pageInfo.currentInductionScreen.state }}
        </div>
      </el-descriptions-item>
      <div v-if="currentType == 1">
        <el-descriptions-item label="频率">
          {{ pageInfo.currentAntenna.frequency }}GHz
        </el-descriptions-item>
        <el-descriptions-item label="读取范围">
          {{ pageInfo.currentAntenna.readRange }}米
        </el-descriptions-item>
        <el-descriptions-item label="波束宽度">
          {{ pageInfo.currentAntenna.beamWidth }}度
        </el-descriptions-item>
      </div>

      <div v-else-if="currentType == 2">
        <el-descriptions-item label="焦距">
          {{ pageInfo.currentCamera.focalLength }}毫米
        </el-descriptions-item>
        <el-descriptions-item label="光圈">
          {{ pageInfo.currentCamera.aperture }}F
        </el-descriptions-item>
      </div>

      <div v-else>
        <el-descriptions-item label="亮度">
          {{ pageInfo.currentInductionScreen.brightness }}
        </el-descriptions-item>
        <el-descriptions-item label="对比度">
          {{ pageInfo.currentInductionScreen.contrastRatio }}%
        </el-descriptions-item>
        <el-descriptions-item label="显示率">
          {{ pageInfo.currentInductionScreen.displayRate }}%
        </el-descriptions-item>
      </div>
      <el-descriptions-item label="所属设备">
        {{ pageInfo.currentEquipment.transactionName }}
      </el-descriptions-item>
    </el-descriptions>
    <br>
    <el-button type="primary" @click="openEditChild">修改</el-button>
    <el-button type="info">上报故障</el-button>
  </el-dialog>
  <!--  修改对话框-->
  <el-dialog
      title="修改"
      v-model="editChildVisible"
      style="text-align: center"
      width="30%"
      top="10vh"
  >

    <el-form label-width="100" v-if="currentType==1">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editAntenna.antennaName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input disabled v-model="pageInfo.editAntenna.installationDate"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input disabled v-model="pageInfo.editAntenna.equipmentIp"/>
      </el-form-item>
      <el-form-item label="频率(GHz)">
        <el-input v-model="pageInfo.editAntenna.frequency"/>
      </el-form-item>
      <el-form-item label="波束宽度(度)">
        <el-input-number min="0" max="360" v-model="pageInfo.editAntenna.beamWidth"/>
      </el-form-item>
      <el-form-item label="读取范围(米)">
        <el-input v-model="pageInfo.editAntenna.readRange"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentEquipment.transactionName"/>
      </el-form-item>
    </el-form>

    <el-form label-width="100" v-else-if="currentType==2">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editCamera.cameraName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input disabled v-model="pageInfo.editCamera.installationDate"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input disabled v-model="pageInfo.editCamera.equipmentIp"/>
      </el-form-item>
      <el-form-item label="焦距(毫米)">
        <el-input v-model="pageInfo.editCamera.focalLength"/>
      </el-form-item>
      <el-form-item label="光圈(F)">
        <el-input v-model="pageInfo.editCamera.aperture"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentEquipment.transactionName"/>
      </el-form-item>
    </el-form>

    <el-form label-width="100" v-else>
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editInductionScreen.inductionScreenName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input disabled v-model="pageInfo.editInductionScreen.installationDate"/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input disabled v-model="pageInfo.editInductionScreen.equipmentIp"/>
      </el-form-item>
      <el-form-item label="亮度">
        <el-input-number min="0" max="100" v-model="pageInfo.editInductionScreen.brightness"/>
      </el-form-item>
      <el-form-item label="对比度(%)">
        <el-input-number min="0" max="100" v-model="pageInfo.editInductionScreen.contrastRatio"/>
      </el-form-item>
      <el-form-item label="显示率(%)">
        <el-input-number min="0" max="100" v-model="pageInfo.editInductionScreen.displayRate"/>
      </el-form-item>
      <el-form-item label="所属设备">
        <el-input disabled v-model="pageInfo.currentEquipment.transactionName"/>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="makeSureEdit">确定</el-button>
    <el-button type="danger" @click="editChildVisible=false">取消</el-button>
  </el-dialog>

  <!--  设备日志对话框-->

  <el-dialog
      title="设备日志"
      v-model="deviceLogVisible"
      width="50%"
      style="text-align: center"
  >
    <h2>故障日志</h2>
    <el-table :data="testData">
      <el-table-column prop="time" label="上报时间"/>
      <el-table-column prop="people" label="上报人"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="state" label="状态"/>
    </el-table>
    <h2>维修日志</h2>
    <el-table :data="testData2">
      <el-table-column prop="time" label="维修时间"/>
      <el-table-column prop="people" label="维修人人"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="result" label="维修结果"/>
      <el-table-column prop="state" label="状态"/>
    </el-table>
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
        <el-input v-model="pageInfo.addTransactionEquipment.transactionName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-date-picker v-model="pageInfo.addTransactionEquipment.installationDate"/>
      </el-form-item>
      <el-form-item label="设备IP">
        <el-input v-model="pageInfo.addTransactionEquipment.equipmentIp"/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAdd">添加</el-button>
  </el-dialog>


  <!--  修改父设备对话框-->
  <el-dialog
      v-model="editParentVisible"
      width="30%"
      :title="pageInfo.currentEquipment.transactionName"
      style="text-align: center"
  >
    <el-form label-width="75px">
      <el-form-item label="名称">
        <el-input v-model="pageInfo.editTransactionEquipment.transactionName"/>
      </el-form-item>
      <el-form-item label="安装日期">
        <el-input v-model="pageInfo.editTransactionEquipment.installationDate" disabled/>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="pageInfo.editTransactionEquipment.equipmentIp"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="pageInfo.editTransactionEquipment.state" disabled/>
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
    <h1>{{ pageInfo.currentEquipment.transactionName }}</h1>
    <br>
    <el-button type="primary" @click="makeSureDeleteParent">确定</el-button>
    <el-button @click="deleteParentVisible=false">取消</el-button>
  </el-dialog>

  <!--  新增子设备对话框-->
  <el-dialog
      title="添加子设备"
      v-model="addChildVisible"
      width="50%"
      style="text-align: center"
  >
    <el-select v-model="addChildSelect" style="width: 50%" placeholder="选择添加设备类型">
      <el-option label="ETC天线" value="1"/>
      <el-option label="摄像头" value="2"/>
      <el-option label="诱导屏" value="3"/>
    </el-select>
    <br><br>
    <div v-if="addChildSelect == 1">
      <h2>添加ETC天线</h2>
      <div v-if="pageInfo.antennas.length == 0">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addAntenna.antennaName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addAntenna.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addAntenna.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addAntenna.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="波束宽度">
            <el-input-number min="0" max="80" v-model="pageInfo.addAntenna.beamWidth"/>
            度
          </el-form-item>
          <el-form-item label="读取距离">
            <el-input-number max="200" min="0" v-model="pageInfo.addAntenna.readRange"/>
            米
          </el-form-item>
          <el-form-item label="工作频率">
            <el-input-number max="10" min="0" v-model="pageInfo.addAntenna.frequency"/>
            GHz
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentEquipment.transactionName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddAntenna">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该预交易门架设备已有ETC天线，1个预交易门架设备仅能拥有一个ETC天线</h3>
    </div>
    <div v-if="addChildSelect == 2">
      <h2>添加摄像头</h2>
      <el-form label-width="100px">
        <el-form-item label="设备名称">
          <el-input v-model="pageInfo.addCamera.cameraName"/>
        </el-form-item>
        <el-form-item label="安装日期">
          <el-date-picker v-model="pageInfo.addCamera.installationDate"/>
        </el-form-item>
        <el-form-item label="设备IP">
          <el-input v-model="pageInfo.addCamera.equipmentIp"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="pageInfo.addCamera.state">
            <el-option label="连接" value="连接"/>
            <el-option label="未连接" value="未连接"/>
          </el-select>
        </el-form-item>
        <el-form-item label="焦距">
          <el-input-number min="0" max="200" v-model="pageInfo.addCamera.focalLength"/>
          mm
        </el-form-item>
        <el-form-item label="光圈">
          <el-input-number max="20" min="0" v-model="pageInfo.addCamera.aperture"/>
          f
        </el-form-item>
        <el-form-item label="所属设备">
          <el-input v-model="pageInfo.currentEquipment.transactionName" disabled/>
        </el-form-item>
        <el-button type="primary" @click="makeSureAddCamera">确定</el-button>
        <el-button type="danger" @click="addChildVisible=false">取消</el-button>
      </el-form>
    </div>
    <div v-if="addChildSelect == 3">
      <h2>添加诱导屏</h2>
      <div v-if="pageInfo.inductionScreens.length == 0">
        <el-form label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="pageInfo.addInductionScreen.inductionScreenName"/>
          </el-form-item>
          <el-form-item label="安装日期">
            <el-date-picker v-model="pageInfo.addInductionScreen.installationDate"/>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="pageInfo.addInductionScreen.equipmentIp"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="pageInfo.addInductionScreen.state">
              <el-option label="连接" value="连接"/>
              <el-option label="未连接" value="未连接"/>
            </el-select>
          </el-form-item>
          <el-form-item label="亮度">
            <el-input-number min="0" max="100" v-model="pageInfo.addInductionScreen.brightness"/>
          </el-form-item>
          <el-form-item label="对比度">
            <el-input-number max="100" min="0" v-model="pageInfo.addInductionScreen.contrastRatio"/>
          </el-form-item>
          <el-form-item label="显示率">
            <el-input-number max="100" min="0" v-model="pageInfo.addInductionScreen.displayRate"/>
          </el-form-item>
          <el-form-item label="所属设备">
            <el-input v-model="pageInfo.currentEquipment.transactionName" disabled/>
          </el-form-item>
          <el-button type="primary" @click="makeSureAddInductionScreen">确定</el-button>
          <el-button type="danger" @click="addChildVisible=false">取消</el-button>
        </el-form>
      </div>
      <h3 style="color: #d21632" v-else>该预交易门架设备已有诱导屏，1个预交易门架设备仅能拥有一个诱导屏</h3>
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
        currentType == 1 ? '删除ETC天线' : currentType == 2 ? '删除摄像头' : '删除诱导屏'
      }}
    </template>
    <h2>确认删除?</h2>
    <h1 v-if="currentType==1" style="color: #d21632">{{ pageInfo.antennas[0].antennaName }}</h1>
    <h1 v-else-if="currentType==2" style="color: #d21632">{{ pageInfo.currentCamera.cameraName }}</h1>
    <h1 v-else-if="currentType==3" style="color:#d21632;">{{ pageInfo.inductionScreens[0].inductionScreenName }}</h1>

    <br>
    <el-button type="primary" @click="makeSureDeleteChild">确定</el-button>
    <el-button @click="deleteChildVisible=false">取消</el-button>
  </el-dialog>

</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {
  Antenna,
  Camera,
  InductionScreen,
  preTransactionGantryEquipment
} from "../../utils/interface.ts";
import {CheckOne, CloseOne, Editor} from "@icon-park/vue-next"
import {ElMessage} from "element-plus";
import {store} from "../../utils/store.ts";


const myStore = store()
//详情界面可见性
const detailVisible = ref(false)

const pageInfo = reactive({
  transactionEquipment: [] as preTransactionGantryEquipment[],
  editTransactionEquipment: {} as preTransactionGantryEquipment,
  currentEquipment: {} as preTransactionGantryEquipment,
  cameraList: [] as Camera[],
  antennas: [] as Antenna[],
  inductionScreens: [] as InductionScreen[],
  currentAntenna: {} as Antenna,
  currentCamera: {} as Camera,
  currentInductionScreen: {} as InductionScreen,
  editAntenna: {} as Antenna,
  editCamera: {} as Camera,
  editInductionScreen: {} as InductionScreen,
  // 添加
  addTransactionEquipment: {} as preTransactionGantryEquipment,
  addCamera: {} as Camera,
  addAntenna: {} as Antenna,
  addInductionScreen: {} as InductionScreen,
})

//预交易门架设备中子设备的类型的数量
const detailNum = ref(0)
//查看预交易门架设备详情
const goToDetail = (equipment: preTransactionGantryEquipment) => {
  detailNum.value = 0
  detailVisible.value = true
  pageInfo.currentEquipment = equipment
  pageInfo.antennas = reactive([] as Antenna[])
  pageInfo.cameraList = reactive([] as Camera[])
  pageInfo.inductionScreens = reactive([] as InductionScreen[])
  request.get("/pre-transaction-gantry-equipment-entity/getTransactionDetailById/" + equipment.transactionId).then(res => {
    console.log(res.data)
    if (res.data.data.cameraEntities.length != 0) {
      pageInfo.cameraList = res.data.data.cameraEntities
      detailNum.value++
    }
    if (res.data.data.etcAntennaEntities.length != 0) {
      pageInfo.antennas = res.data.data.etcAntennaEntities
      detailNum.value++
    }
    if (res.data.data.inductionScreenEntities.length != 0) {
      pageInfo.inductionScreens = res.data.data.inductionScreenEntities
      detailNum.value++
    }
  })
}
//
// //查看子设备详情，并根据子设备类型跳转到不同的详情界面
// const goToChildDetail = (equipment: Antenna | Camera | InductionScreen) => {
//   console.log("antennaName" in equipment ? equipment.antennaName : "cameraName" in equipment ? equipment.cameraName : equipment.inductionScreenName)
//
// }

//子设备详情界面可见性
const childDetailVisible = ref(false)
//当前子设备类型,1为ETC天线，2为摄像头，3为诱导屏
const currentType = ref(1)
//查看ETC天线详情
const goToAntennaDetail = (antenna: Antenna) => {
  request.get("/etc-antenna-entity/getAntenna/" + antenna.antennaId).then(res => {
    pageInfo.currentAntenna = res.data
    childDetailVisible.value = true
    currentType.value = 1
  })
}

//查看摄像头详情
const goToCameraDetail = (camera: Camera) => {
  request.get("/camera-entity/getCamera/" + camera.cameraId).then(res => {
    pageInfo.currentCamera = res.data
    childDetailVisible.value = true
    currentType.value = 2
  })
}

//查看诱导屏详情
const goToInductionScreenDetail = (inductionScreen: InductionScreen) => {
  request.get("/induction-screen-entity/getInductionScreen/" + inductionScreen.inductionScreenId).then(res => {
    pageInfo.currentInductionScreen = res.data
    childDetailVisible.value = true
    currentType.value = 3
  })
}

//修改

//修改子设备对话框可见性
const editChildVisible = ref(false)
const openEditChild = () => {
  editChildVisible.value = true
  pageInfo.editAntenna = JSON.parse(JSON.stringify(pageInfo.currentAntenna))
  pageInfo.editCamera = JSON.parse(JSON.stringify(pageInfo.currentCamera))
  pageInfo.editInductionScreen = JSON.parse(JSON.stringify(pageInfo.currentInductionScreen))
}

//确认修改
const makeSureEdit = () => {
  editChildVisible.value = false
  if (currentType.value == 1) {
    pageInfo.currentAntenna = JSON.parse(JSON.stringify(pageInfo.editAntenna))
    request.post("/etc-antenna-entity/updateAntenna", pageInfo.editAntenna).then(res => {
      pageInfo.antennas = res.data
      ElMessage.success("修改成功")
    })
  } else if (currentType.value == 2) {
    pageInfo.currentCamera = JSON.parse(JSON.stringify(pageInfo.editCamera))
    request.post("/camera-entity/updateCamera", pageInfo.editCamera).then(res => {
      pageInfo.cameraList = res.data
      ElMessage.success("修改成功")
    })
  } else {
    pageInfo.currentInductionScreen = JSON.parse(JSON.stringify(pageInfo.editInductionScreen))
    request.post("/induction-screen-entity/updateInductionScreen", pageInfo.editInductionScreen).then(res => {
      pageInfo.inductionScreens = res.data
      ElMessage.success("修改成功")
    })
  }
}

//修改父设备对话框可见性
const editParentVisible = ref(false)

//打开修改父设备对话框
const openEditParent = (item: preTransactionGantryEquipment) => {
  pageInfo.editTransactionEquipment = JSON.parse(JSON.stringify(item))
  pageInfo.currentEquipment = JSON.parse(JSON.stringify(item))
  editParentVisible.value = true
}

//确认修改父设备
const makeSureEditParent = () => {
  request.post("/pre-transaction-gantry-equipment-entity/updateTransactionDetail", pageInfo.editTransactionEquipment).then(res => {
    pageInfo.transactionEquipment = res.data
    ElMessage.success("修改成功")
  })

  editParentVisible.value = false
}

//添加父设备
const addEquipmentVisible = ref(false)

const openAddParentDialog = () => {
  pageInfo.addTransactionEquipment = reactive({} as preTransactionGantryEquipment)
  addEquipmentVisible.value = true
}


//新增设备
const makeSureAdd = () => {
  request.post("/pre-transaction-gantry-equipment-entity/addTransactionDetail", pageInfo.addTransactionEquipment).then(res => {
    pageInfo.transactionEquipment = res.data
    ElMessage.success("添加成功")
    addEquipmentVisible.value = false
  })
}

//删除父设备

const deleteParentVisible = ref(false)

const openDeleteDialog = (item: preTransactionGantryEquipment) => {
  pageInfo.currentEquipment = JSON.parse(JSON.stringify(item))
  deleteParentVisible.value = true
}

const makeSureDeleteParent = () => {
  request.get("/pre-transaction-gantry-equipment-entity/deleteTransactionDetail/" + pageInfo.currentEquipment.transactionId).then(res => {
    pageInfo.transactionEquipment = res.data
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
  pageInfo.addCamera = {} as Camera
  pageInfo.addAntenna = {} as Antenna
  pageInfo.addInductionScreen = {} as InductionScreen
}

//确认新增ETC天线
const makeSureAddAntenna = () => {
  pageInfo.addAntenna.transactionId = pageInfo.currentEquipment.transactionId
  request.post("/etc-antenna-entity/addAntenna", pageInfo.addAntenna).then(res => {
    pageInfo.antennas[0] = res.data
    ElMessage.success("添加成功")
    addChildVisible.value = false
    detailNum.value++
  })
}

//确认新增摄像头
const makeSureAddCamera = () => {
  pageInfo.addCamera.transactionId = pageInfo.currentEquipment.transactionId
  request.post("/camera-entity/addCamera", pageInfo.addCamera).then(res => {
    pageInfo.cameraList[0] = res.data
    ElMessage.success("添加成功")
    addChildVisible.value = false
    detailNum.value++
  })
}

//确认新增诱导屏
const makeSureAddInductionScreen = () => {
  pageInfo.addInductionScreen.transactionId = pageInfo.currentEquipment.transactionId
  request.post("/induction-screen-entity/addInductionScreen", pageInfo.addInductionScreen).then(res => {
    pageInfo.inductionScreens[0] = res.data
    ElMessage.success("添加成功")
    addChildVisible.value = false
    detailNum.value++
  })
}

/**
 * 删除子设备
 */

//删除子设备对话框可见性
const deleteChildVisible = ref(false)

const openDeleteChildDialog = (type: number) => {
  deleteChildVisible.value = true
  currentType.value = type
}
//因为摄像头有多个，所以需要记录当前删除的是哪个摄像头
const openDeleteCameraDialog = (camera: Camera) => {
  pageInfo.currentCamera = camera
  deleteChildVisible.value = true
  currentType.value = 2
}

const makeSureDeleteChild = () => {
  deleteChildVisible.value = false
  if (currentType.value == 1) {
    request.get("/etc-antenna-entity/deleteAntenna/" + pageInfo.antennas[0].antennaId).then(res => {
      deleteChildVisible.value = false
      pageInfo.antennas = [] as Antenna[]
      ElMessage.success("删除成功")
      detailNum.value--
    })
  } else if (currentType.value == 2) {
    request.get("/camera-entity/deleteCamera/" + pageInfo.currentCamera.cameraId + "," + pageInfo.currentEquipment.transactionId).then(res => {
      pageInfo.cameraList = res.data
      ElMessage.success("删除成功")
      deleteChildVisible.value = false
      detailNum.value--
    })
  } else {
    request.get("/induction-screen-entity/deleteInductionScreen/" + pageInfo.inductionScreens[0].inductionScreenId).then(res => {
      pageInfo.inductionScreens = [] as InductionScreen[]
      ElMessage.success("删除成功")
      deleteChildVisible.value = false
      detailNum.value--
    })
  }
}

/**
 * 查询与筛选
 */

//父设备查询与筛选
const searchParent = ref('')
const stateSelectParent = ref('')

const preTransactionFilter = computed(() => {
  return pageInfo.transactionEquipment.filter((item) => {
    return (item.transactionName.includes(searchParent.value) || item.equipmentIp.includes(searchParent.value))
        && (item.state==stateSelectParent.value || stateSelectParent.value=='')
  })
})


//查看设备日志
const deviceLogVisible = ref(false)

const testData = [
  {
    time: "2024-5-10",
    people: "wyx",
    description: "镜头花了",
    state: "已维修",
  }
]

const testData2 = [
  {
    time: "2024-5-11",
    people: "yh",
    description: "换了个镜头",
    result: "修好了",
    state: "已维修",
  }
]


onMounted(() => {
  request.get("/pre-transaction-gantry-equipment-entity/getAllTransactionEquipment").then(res => {
    pageInfo.transactionEquipment = res.data
    console.log(pageInfo.transactionEquipment)
  })
})

</script>


<style scoped>

</style>