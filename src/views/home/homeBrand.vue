<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <el-icon class="iconfont icon-angle-left prev"><arrow-left /></el-icon>
      <el-icon class="iconfont icon-angle-right next"><arrow-right /></el-icon>
    </template>
    <div class="box" ref="box">
      <ul class="list" >
        <li v-for="i in 10" :key="i">
          <RouterLink to="/">
            <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg" alt="">
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>


<script lang="ts" setup>
import HomePanel from './HomePanel.vue';
import { defineComponent } from 'vue'

</script>


<style lang="less" scoped>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  cursor: pointer;
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

</style>