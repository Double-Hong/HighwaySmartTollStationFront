<template>
  <el-radio-group v-model="stateSelect" style="position: absolute;right: 5%">
    <el-radio-button value="" size="large">全部</el-radio-button>
    <el-radio-button value="连接" size="large">连接</el-radio-button>
    <el-radio-button value="未连接" size="large">未连接</el-radio-button>
  </el-radio-group>
  <el-input v-model="search" style="position: absolute;right: 25%;width: 10%" placeholder="搜索"/>
  <br><br>
  <el-table :data="dataFilter" stripe>
    <el-table-column v-for="item in formData.message" :prop="item.prop" :label="item.label">
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
    <el-table-column width="150px" label="操作">
      <template #default="{row}">
        <!--        <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>-->
        <el-button type="info" size="default" @click="emit('submit')">日志</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {CheckOne, CloseOne} from "@icon-park/vue-next";
// 组件接收的props
const props = defineProps(['formData'])

const formData = reactive(props.formData)

// 组件接收函数
const emit = defineEmits(['submit'])

const stateSelect = ref('')

const search = ref('')

const dataFilter = computed(() => {
  return formData.data.filter((item: any) => {
    return (item.state == stateSelect.value || stateSelect.value == '')
        && (item[formData.message[0].prop].includes(search.value) || item[formData.message[1].prop].includes(search.value)
            || item[formData.message[2].prop].includes(search.value) || item[formData.message[3].prop].includes(search.value)
            || search.value == '')
  })

})
</script>

<style scoped>

</style>