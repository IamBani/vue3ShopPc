<template>
  <RouterLink :to="path" class="xtx-more">
    <slot><span>查看全部</span></slot> 
    <el-icon class="iconfont icon-angle-right"><arrow-right /></el-icon>
  </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
    path: {
      type: String,
      default: "/",
    },
})

</script>


<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>
