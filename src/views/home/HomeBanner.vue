<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <el-image
          style="width: 100%; height: 100%"
          :src="item.imgUrl"
          fit="fill"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import { getHomeBanner } from "@/http/home";
import { ref } from "vue";

interface Banner {
  id: string;
  hrefUrl: string;
  imgUrl: string;
  type: string;
}
let banner = ref<Banner[]>([]);
const getBanner = async () => {
  const { result } = await getHomeBanner();
  banner.value = result;
};
getBanner()
</script>
<style lang="less" scoped>
.home-banner{
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 90;
    ::v-deep .el-carousel__arrow--left{
      left: 265px;
    }
}
</style>
