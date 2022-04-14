<template>
  <el-container direction="vertical">
    <Header></Header>
    <Nav></Nav>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import Header from "@/components/Layout/header/index.vue";
import Footer from "@/components/Layout/footer/index.vue";
import Nav from "./nav/index.vue";
</script>

<style scoped lang="less">
.main {
  background-color: #f5f5f5;
  padding: 0;
}
</style>
