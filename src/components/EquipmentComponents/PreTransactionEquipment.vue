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

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import request from "../../request/request.ts";
import {Antenna, Camera, InductionScreen, preTransactionGantryEquipment} from "../../utils/interface.ts";
import {CheckOne, CloseOne} from "@icon-park/vue-next"
import {ElMessage} from "element-plus";

//详情界面可见性
const detailVisible = ref(false)

const pageInfo = reactive({
  transactionEquipment: {} as preTransactionGantryEquipment[],
  currentEquipment: {} as preTransactionGantryEquipment,
  cameraList: {} as Camera[],
  antennas: {} as Antenna[],
  inductionScreens: {} as InductionScreen[],
  currentAntenna: {} as Antenna,
  currentCamera: {} as Camera,
  currentInductionScreen: {} as InductionScreen,
  editAntenna: {} as Antenna,
  editCamera: {} as Camera,
  editInductionScreen: {} as InductionScreen,
})

//预交易门架设备中子设备的类型的数量
const detailNum = ref(0)
//查看预交易门架设备详情
const goToDetail = (equipment: preTransactionGantryEquipment) => {
  detailNum.value = 0
  detailVisible.value = true
  pageInfo.currentEquipment = equipment
  pageInfo.antennas = reactive({} as Antenna[])
  pageInfo.cameraList = reactive({} as Camera[])
  pageInfo.inductionScreens = reactive({} as InductionScreen[])
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

onMounted(() => {
  request.get("/pre-transaction-gantry-equipment-entity/getAllTransactionEquipment").then(res => {
    pageInfo.transactionEquipment = res.data
  })
})

</script>


<style scoped>

</style>