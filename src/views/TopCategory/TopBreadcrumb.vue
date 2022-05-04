<template>
  <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: item.to }"  v-for="item in list" :key="item.title">{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import {Breadcrumb} from '../TopCategory.vue'
import { defineProps, PropType } from "vue";
defineProps({
  list:{
    type:Array as PropType<Breadcrumb[]>,
    required:true
  }
})
</script>

<style lang="less" scoped>
.breadcrumb{
  padding: 25px 10px;
}
</style>