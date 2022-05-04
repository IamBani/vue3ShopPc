<template>
  <div>
    <div class="user-info">
      <img
        src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50"
        alt=""
      />
      <p>Hi，Tom 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <el-form
          :size="size"
          ref="ruleFormRefCode"
          :model="ruleFormCode"
          :rules="rulesCode"
          class="form"
        >
          <el-form-item prop="mobile">
            <el-input
              v-model="ruleFormCode.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="11">
              <el-col :span="16">
                <el-input
                  v-model="ruleFormCode.code"
                  placeholder="请输入验证码"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" :disabled="disabled" @click="send">{{
                  sendCode
                }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
  </div>
</template>

<script lang="ts" setup>
interface RuleForm {
  username?: string;
  password?: string;
  mobile?: string;
  code?: string;
}

import { ref,reactive,onUnmounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {ElMessage} from 'element-plus'
import { useIntervalFn } from "@vueuse/core";
import {getUserSocialCode} from '@/http/api/login'
const ruleFormCode = reactive<RuleForm>({
  mobile: "",
  code: "",
});
const rulesCode = reactive<FormRules>({
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "手机号格式错误",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { pattern: /^\d{6}$/, message: "验证码是6个数字", trigger: "blur" },
  ],
});

let sendCode = ref<string | number>("发送验证码");
const size = ref("large");
let disabled = ref(false);
const ruleFormRefCode = ref<FormInstance>();
const send = async () => {
  let flag = false;
  try {
    ruleFormRefCode.value?.validateField("mobile", async (isValid: boolean) => {
      if (isValid) {
        await getUserSocialCode({
          mobile: ruleFormCode.mobile,
        });
        ElMessage({ type: "success", message: "发送成功" });
        sendCode.value = 60;
        disabled.value = true;
        resume();
      } else {
        flag = true;
      }
    });
    if (flag) return;
  } catch (error) {
    console.log(error);
  }
};
const { pause, resume } = useIntervalFn(() => {
  if (typeof sendCode.value === "number") {
    sendCode.value -= 1;
    if (sendCode.value <= 0) {
      pause();
      sendCode.value = "发送验证码";
      disabled.value = false;
    }
  }
}, 1000);
onUnmounted(() => {
  pause();
});
</script>


<style lang="less" scoped>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .form{
      width: 700px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     margin: 0 auto;
     ::v-deep .el-form-item{
         width: 320px;
     }
  }
</style>