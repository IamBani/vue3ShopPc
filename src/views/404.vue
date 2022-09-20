<template>
   <el-result title="404" subTitle="抱歉，请求错误">
      <template v-slot:icon>
        <el-image class="err-404" :src="src"></el-image>
      </template>
      <template v-slot:extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        <el-button @click="$router.back()">返回上一级</el-button>
      </template>
    </el-result>
</template>

<script lang="ts" setup>
import src from '@/assets/images/404.png'
import { defineComponent } from 'vue'

</script>


<style lang="less" scoped>
.err-404 {
  width: 700px;
  height: 600px;
}

</style>