<template>
  <el-radio-group v-model="stateSelect" style="position: absolute;right: 5%">
    <el-radio-button value="" size="large">全部</el-radio-button>
    <el-radio-button value="故障日志" size="large">故障日志</el-radio-button>
    <el-radio-button value="维修日志" size="large">维修日志</el-radio-button>
    <el-radio-button value="常规日志" size="large">常规日志</el-radio-button>
  </el-radio-group>
  <el-input v-model="search" style="position: absolute;left: 5%;width: 10%" placeholder="搜索"/>
  <br><br> <br><br>
  <el-table :data="dataFilter" stripe>
    <el-table-column v-for="item in formData.message" :prop="item.prop" :label="item.label"
                     :width="item.label === '日志日期' ? '200' : ''">
      <template v-if="item.unit != null" v-slot:default="{row}">
        {{ row[item.prop] }}{{ item.unit }}
      </template>
      <template v-if="item.name == 'state'" v-slot:default="{row}">
        <check-one v-if="row[item.prop]=='连接'"
                   theme="filled"
                   size="24" fill="#09eb49"/>
        <close-one v-else theme="filled" size="24" fill="#eb0909"/>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="{row}">
        <el-button @click="emit('fix',row)" v-if="myStore.getUserType() == 3 "
                   :disabled="row['logType'] != '故障日志' || row['state'] == '连接' || buttonClick == false" type="success" size="default">维修
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {CheckOne, CloseOne} from "@icon-park/vue-next";
import {store} from "../../utils/store.ts";
// 组件接收的props
const props = defineProps(['formData','buttonClick'])

const emit = defineEmits(['fix'])

const formData = reactive(props.formData)

const buttonClick = reactive(props.buttonClick)

const myStore = store()

const stateSelect = ref('')

const search = ref('')

const dataFilter = computed(() => {
  return formData.data.filter((item: any) => {
    return (item.logType == stateSelect.value || stateSelect.value == '')
        && (item[formData.message[0].prop].includes(search.value) || item[formData.message[1].prop].includes(search.value)
            || item[formData.message[2].prop].includes(search.value) || item[formData.message[3].prop].includes(search.value)
            || item["writerName"].includes(search.value) || item["description"].includes(search.value)
            || search.value == '')
  })

})

</script>

<style scoped>

</style>