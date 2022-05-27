<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <el-icon @click="toggle(-1)"  :class="{disabled:index===0}" class="iconfont icon-angle-left prev"
        ><arrow-left
      /></el-icon>
      <el-icon @click="toggle(1)"  :class="{disabled:index===1}" class="iconfont icon-angle-right next"
        ><arrow-right
      /></el-icon>
    </template>
    <div ref="target" class="box">
      <ul
        v-if="brands.length"
        class="list"
        :style="{ transform: `translateX(${-index * 1240}px)` }"
      >
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script lang="ts" setup>
import HomePanel from './HomePanel.vue'
import { ref } from 'vue'
import { useLazyData } from '@/hooks'
import { getHomeBrand } from '@/http/home'
let { target, result: brands } = useLazyData(() => getHomeBrand({limit: 10}))
const index = ref(0)
const toggle = (step: number) => {
  const newIndex = index.value + step
  if (newIndex < 0 || newIndex > 1) return
  index.value = newIndex
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5;
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
