<template>
  <el-table :data="formData.data" stripe>
    <el-table-column v-for="item in formData.message" :prop="item.prop" :label="item.label" :width="item.label === '日志日期' ? '200' : ''">
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
        <el-button @click="emit('fix',row)" v-if="myStore.getUserType() == 3" :disabled="row['logType'] != '故障日志' || row['state'] == '连接' " type="success" size="default">维修</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {CheckOne, CloseOne} from "@icon-park/vue-next";
import {store} from "../../utils/store.ts";
// 组件接收的props
const props = defineProps(['formData'])

const emit = defineEmits(['fix'])

const formData = reactive(props.formData)

const myStore = store()

const stateSelect = ref('')

const search = ref('')
</script>

<style scoped>

</style>