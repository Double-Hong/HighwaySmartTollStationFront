<template>
  <h1 style="text-align: center">设备日志</h1>
  <el-button @click="openDialog" style="position: absolute;left: 10%;top: 5%">设置阈值</el-button>
  <el-dialog
      title="设备阈值"
      width="30%"
      v-model="visible"
      style="text-align: center"
  >
    <el-form label-width="150">
      <el-form-item label="摄像头焦距">
        <el-input-number v-model="pageInfo.editThresholds.focalLength" />
      </el-form-item>
      <el-form-item label="摄像头光圈">
        <el-input-number v-model="pageInfo.editThresholds.aperture" />
      </el-form-item>
      <el-form-item label="雨棚灯亮度">
        <el-input-number v-model="pageInfo.editThresholds.awningBrightness" />
      </el-form-item>
      <el-form-item label="车检器检测范围">
        <el-input-number v-model="pageInfo.editThresholds.carDetectorRange" />
      </el-form-item>
      <el-form-item label="入口设备卡片数量">
        <el-input-number v-model="pageInfo.editThresholds.cardNumber" />
      </el-form-item>
      <el-form-item label="ETC频率">
        <el-input-number v-model="pageInfo.editThresholds.etcFrequency" />
      </el-form-item>
      <el-form-item label="ETC读取距离">
        <el-input-number v-model="pageInfo.editThresholds.etcReadRange" />
      </el-form-item>
      <el-form-item label="ETC波束宽度">
        <el-input-number v-model="pageInfo.editThresholds.etcBeamWidth" />
      </el-form-item>
      <el-form-item label="出口收据纸数量">
        <el-input-number v-model="pageInfo.editThresholds.receiptNumber" />
      </el-form-item>
      <el-form-item label="出口扫描器状态">
        <el-input-number v-model="pageInfo.editThresholds.scannerState" />
      </el-form-item>
      <el-form-item label="诱导屏亮度">
        <el-input-number v-model="pageInfo.editThresholds.inductionBrightness" />
      </el-form-item>
      <el-form-item label="诱导屏对比度">
        <el-input-number v-model="pageInfo.editThresholds.inductionContrastRatio" />
      </el-form-item>
      <el-form-item label="诱导屏显示率">
        <el-input-number v-model="pageInfo.editThresholds.inductionDisplayRate" />
      </el-form-item>
      <el-form-item label="情报板亮度">
        <el-input-number v-model="pageInfo.editThresholds.intelBoardBrightness" />
      </el-form-item>
      <el-form-item label="情报板对比度">
        <el-input-number v-model="pageInfo.editThresholds.intelBoardContrastRatio" />
      </el-form-item>
      <el-form-item label="情报板显示率">
        <el-input-number v-model="pageInfo.editThresholds.intelBoardDisplayRate" />
      </el-form-item>
      <el-form-item label="称重设备状态">
        <el-input-number v-model="pageInfo.editThresholds.weighingMachineState" />
      </el-form-item>
      <el-form-item label="称重设备显示状态">
        <el-input-number v-model="pageInfo.editThresholds.weighingDisplayState" />
      </el-form-item>
      <el-button type="primary" @click="makeSure">确认</el-button>
    </el-form>

  </el-dialog>
  <el-descriptions border column="3">
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          摄像头焦距
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.focalLength }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          摄像头光圈
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.aperture }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          雨棚灯亮度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.awningBrightness }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          车检器检测范围
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.carDetectorRange }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          入口设备卡片数量
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.cardNumber }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          ETC频率
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.etcFrequency }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          ETC读取距离
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.etcReadRange }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          ETC波束宽度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.etcBeamWidth }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          出口收据纸数量
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.receiptNumber }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          出口扫描器状态
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.scannerState }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          诱导屏亮度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.inductionBrightness }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          诱导屏对比度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.inductionContrastRatio }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          诱导屏显示率
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.inductionDisplayRate }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          情报板亮度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.intelBoardBrightness }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          情报板对比度
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.intelBoardContrastRatio }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          情报板显示率
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.intelBoardDisplayRate }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          称重设备状态
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.weighingMachineState }}
        </div>
      </template>
    </el-descriptions-item>
    <el-descriptions-item>
      <template v-slot:label>
        <div style="text-align: center">
          称重设备显示状态
        </div>
      </template>
      <template v-slot:default>
        <div style="height: 100px;display: flex;justify-content: center;align-items: center">
          {{ pageInfo.thresholds.weighingDisplayState }}
        </div>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {DeviceThresholds} from "../../utils/interface.ts";
import request from "../../request/request.ts";

const pageInfo = reactive({
  thresholds: {} as DeviceThresholds,
  editThresholds: {} as DeviceThresholds
})

const visible = ref(false)

const openDialog = () => {
  pageInfo.editThresholds = JSON.parse(JSON.stringify(pageInfo.thresholds))
  visible.value = true
}

const makeSure = () =>{
  request.post("/device-thresholds-entity/update", pageInfo.editThresholds).then(res => {
    pageInfo.thresholds = pageInfo.editThresholds
    visible.value = false
  })
}

onMounted(() => {
  request.get("/device-thresholds-entity/get").then(res => {
    pageInfo.thresholds = res.data
  })
})

</script>

<style scoped>

</style>