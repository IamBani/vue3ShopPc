<template>
  <LoginHerder>欢迎登录</LoginHerder>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
          href="javascript:;"
          >账户登录</a
        >
        <a
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          href="javascript:;"
          >扫码登录</a
        >
      </nav>
      <div v-if="activeName === 'account'">
          <LoginForm></LoginForm>
      </div>
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <!-- <img src="@/assets/images/qrcode.jpg" alt="" /> -->
        <qrcode :value="value" :size="size"></qrcode>
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFoot />
</template>

<script lang="ts" setup>

type ActiveName = "account" | "qrcode";
import { ref } from "vue";
import qrcode from 'qrcode.vue';
import LoginHerder from "./login/LoginHerder.vue";
import LoginFoot from "./login/LoginFoot.vue";
import LoginForm from './login/LoginForm.vue';

let activeName = ref<ActiveName>("account");
const value = ref('https://example.com')
const size = ref(200)

</script>

<style scoped lang='less'>
.login-section {
  background: url(~@/assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
