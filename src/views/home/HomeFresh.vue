<template>
    <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" />
        <el-icon><arrow-right /></el-icon>
      </template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script lang="ts" setup>
import { getHomeFresh } from '@/http/home'
import { defineComponent, ref } from 'vue'
import HomePanel from './HomePanel.vue'

interface Goods{
  id:string,
  picture:string,
  name:string,
  price:string,
  desc?:string
}
let goods = ref<Goods[]>([])
const getGoods =async ()=>{
  const {result} = await getHomeFresh()
  goods.value = result
}
getGoods()
</script>


<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>