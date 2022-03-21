<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">{{
        item.name
      }}</RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface List {
  id?: string;
  name: string;
  picture?: string;
  children?: List[];
  goods?:Goods[];
  [propName : string ] : any
}
interface Goods{
    desc?:string;
    discount?: string;
    id?:string
    name?: string;
    orderNum?: string | number;
    picture?: string;
    price?:string;
}
import { defineComponent, ref } from "vue";
import { getCategory } from "@/http/nav";

let list = ref<List[]>([
  {
    name: "居家",
  },
  { name: "美食" },
  { name: "服饰" },
  { name: "母婴" },
  { name: "个护" },
  { name: "严选" },
  { name: "数码" },
  { name: "运动" },
  { name: "杂货" },
]);
getCategory()
  .then((res) => {
    const { result } = res;
    list.value = result;
  })
  .catch((err:any) => {
    console.log(err);
  });

const show = (item:List) => {
  const category = list.value.find(category=>category.id === item.id)
  if(category){
      category.open = true
  }
};
const hide = (item:List) => {
  const category = list.value.find(category=>category.id === item.id)
  if(category){
      category.open = false
  }
};
</script>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    //   > .layer {
    //     height: 132px;
    //     opacity: 1;
    //   }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  &.open {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
