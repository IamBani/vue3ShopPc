<template>
  <el-footer class="footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd>
            <svg-icon class="iconfont" iconName="zaixiankefu"></svg-icon>
            在线客服
          </dd>
          <dd>
            <svg-icon
              class="iconfont"
              iconName="gerenzhongxin-wentifankui"
            ></svg-icon>
            问题反馈
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>
            <svg-icon class="iconfont" iconName="weixin"></svg-icon> 公众号
          </dd>
          <dd><svg-icon class="iconfont" iconName="weibo"></svg-icon> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode">
            <qrcode :value="value" :size="size" level="H" />
          </dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">
            400-0000-000 <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <svg-icon class="iconfont" iconName="jiageyuce"></svg-icon>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <svg-icon class="iconfont" iconName="zanquan"></svg-icon>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <svg-icon class="iconfont" iconName="wwuliu-"></svg-icon>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </el-footer>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import qrcode from "qrcode.vue";
const value = ref("https://example.com");
const size = ref(92);
</script>


<style lang="less" scoped>
.footer {
  //  overflow: hidden;
  background-color: #f5f5f5;
  padding: 0;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        margin: 0 auto;
        margin-bottom: 5px;
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: @xtxColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: @xtxColor;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      .iconfont {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>