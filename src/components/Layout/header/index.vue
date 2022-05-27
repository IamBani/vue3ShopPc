<template>
  <el-header class="header">
    <nav class="app-topnav">
      <div class="container">
        <ul>
          <template v-if="profile.token">
            <li>
              <a href="javascript:;"
                ><i class="iconfont icon-user"></i>{{profile.account}}</a
              >
            </li>
            <li><a @click="logout" href="javascript:;">退出登录</a></li>
          </template>
          <template v-else>
            <li><RouterLink to="/login">请先登录</RouterLink></li>
            <li><a href="javascript:;">免费注册</a></li>
          </template>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
          <li>
            <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
          </li>
        </ul>
      </div>
    </nav>
  </el-header>
</template>

<script lang="ts" setup>
import userStore from "@/stores/user";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
const user = userStore();
const router = useRouter()
const profile = user.getUser;
const logout =()=>{
  user.setProfile({})
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header {
  padding: 0;
  .app-topnav {
    background: #333;
    ul {
      display: flex;
      height: var(--el-header-height);
      justify-content: flex-end;
      align-items: center;
      li {
        a {
          padding: 0 15px;
          color: #cdcdcd;
          line-height: 1;
          display: inline-block;
          i {
            font-size: 14px;
            margin-right: 2px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
        ~ li {
          a {
            border-left: 2px solid #666;
          }
        }
      }
    }
  }
}
</style>
