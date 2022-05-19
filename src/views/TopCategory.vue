<template>
  <div class="top-category">
    <div class="container">
      <TopBreadcrumb :list="list"></TopBreadcrumb>
      <TopCarousel :banner="banner"></TopCarousel>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Banner {
  id: string;
  hrefUrl: string;
  imgUrl: string;
  type: string;
}
export interface Breadcrumb {
  title: string;
  to?: string;
}
interface Children {
  id: string;
  picture: string;
  name: string;
  goods?:Goods
}

import { ref } from "vue";
import { getHomeBanner } from "@/http/home";
import { getCategory } from "@/http/api/category";
import TopBreadcrumb from "@/components/Breadcrumb/index.vue";
import TopCarousel from "./TopCategory/TopCarousel.vue";
import GoodsItem from "./TopCategory/GoodsItem.vue";
import { useRoute } from "vue-router";
import { Goods } from "@/type/category";
const router = useRoute();
let banner = ref<Banner[]>([]);
let list = ref<Breadcrumb[]>([]);
let children = ref<Children[]>([]);
let subList = ref<Children[]>([]);

getHomeBanner().then((res) => {
  banner.value = res.result;
});
getCategory({ id: router.params.id }).then((res) => {
  list.value = [{ title: "首页", to: "/" }, { title: res.result.name }];
  children.value = res.result.children;
  subList.value = res.result.children;
});
</script>


<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
 .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>