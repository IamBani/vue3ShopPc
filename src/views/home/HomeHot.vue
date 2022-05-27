<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div style="position: relative; height: 426px" ref="target">
      <ul ref="pannel" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.alt" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script lang="ts" setup>
import { useLazyData } from "@/hooks";

import { getHomeHot } from "@/http/home";
import { computed, ref,unref } from "vue";
import HomePanel from "./HomePanel.vue";
interface goodsList {
  id: string;
  picture: string;
  title: string;
  alt: string;
}
const { target, result:goods } = useLazyData<goodsList>(getHomeHot);

</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
