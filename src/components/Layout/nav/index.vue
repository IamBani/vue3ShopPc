<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink :style="logoName" to="/">小兔鲜</RouterLink></h1>
      <appHeaderNav></appHeaderNav>
      <div class="search">
        <el-icon class="icon-search">
          <search />
        </el-icon>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a class="curr" href="#"> 
          <svg-icon
            iconName="gouwuchekong"
            class="iconfont icon-cart"
          ></svg-icon
          ><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import appHeaderNav from "./nav-header/app-header-nav.vue";

import logo from "@/assets/images/logo.png";
import { nextTick, ref, unref, watch, watchEffect } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";

const logoName = ref({background:`url(${logo}) no-repeat center 18px / contain `});
</script>


<style lang="less" scoped>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      // background: v-bind(logoName); //生产环境不显示 有bug
    }
  }
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    display: flex;
    align-items: center;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
      outline: none;
      border: none;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart {
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>