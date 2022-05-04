<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="isMsgLogin">
        <span @click="isMsgLogin = false"
          ><el-icon><user /></el-icon> 使用账号登录</span
        >
      </a>
      <a href="javascript:;" v-else>
        <span @click="isMsgLogin = true"
          ><el-icon><chat-line-square /></el-icon> 使用短信登录</span
        >
      </a>
    </div>
    <div class="form">
      <template v-if="!isMsgLogin">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :size="size"
          :rules="rules"
        >
          <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名">
              <template #prepend>
                <el-icon><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prepend>
                <el-icon><unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form
          :size="size"
          ref="ruleFormRefCode"
          :model="ruleFormCode"
          :rules="rulesCode"
        >
          <el-form-item prop="mobile">
            <el-input
              v-model="ruleFormCode.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="8">
              <el-col :span="15">
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
      </template>

      <div class="form-item">
        <div class="agree">
          <el-checkbox v-model="isAgree" size="large" class="checkbox" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface RuleForm {
  username?: string;
  password?: string;
  mobile?: string;
  code?: string;
}

interface UserInfo {
  id: number;
  account: string;
  mobile: string;
  token: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
}

import { onUnmounted, reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useIntervalFn } from "@vueuse/core";
import { userMobileLogin, userLogin, getUserCode } from "@/http/api/login";
import { useRouter } from "vue-router";
import userInfoStore from "@/stores/user";

const router = useRouter();
let isMsgLogin = ref<boolean>(false);
let isAgree = ref<boolean>(false);
let disabled = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleFormRefCode = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "xiaotuxian001",
  password: "123456",
});
const ruleFormCode = reactive<RuleForm>({
  mobile: "",
  code: "",
});
const size = ref("large");
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern: /^[a-zA-Z]\w{5,19}$/,
      message: "字母开头且6-20个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { pattern: /^\w{6,24}$/, message: "密码是6-24个字符", trigger: "blur" },
  ],
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
let data = ref<Partial<UserInfo>>({});
watch(data, (newValue) => {
  console.log(newValue);
  const user = userInfoStore();
  const { id, account, avatar, mobile, nickname, token } = newValue;
  user.setProfile({
    id,
    account,
    avatar,
    mobile,
    nickname,
    token,
  });
  router.push("/");
});
const login = async () => {
  if (!isAgree.value) {
    ElMessage({
      type: "error",
      message: "请勾选协议",
    });
    return;
  }
  try {
    if (isMsgLogin.value) {
      ruleFormRefCode.value?.validate(async (valid: boolean) => {
        if (valid) {
          let { code, mobile } = ruleFormCode;
          const { result } = await userMobileLogin({
            mobile,
            code,
          });
          data.value = result;
        } 
      });
    } else {
      ruleFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
          let { username, password } = ruleForm;
          const { result } = await userLogin({
            account: username,
            password,
          });
          data.value = result;
        }
      });
    }
  } catch (error: any) {
    ElMessage({
      type: "error",
      message: error.response.data.message || "登录失败",
    });
  }
};

const send = async () => {
  let flag = false;
  try {
    ruleFormRefCode.value?.validateField("mobile", async (isValid: boolean) => {
      if (isValid) {
        await getUserCode({
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
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 22px;
    }
    .agree {
      display: flex;
      align-items: center;
      .checkbox {
        margin-right: 3px;
      }
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>