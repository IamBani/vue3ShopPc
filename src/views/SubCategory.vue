<template>
  <div class="top-category">
    <div class="container">

      <SubCarousel :banner="banner"></SubCarousel>
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
import { ref } from 'vue'
import {getHomeBanner} from '@/http/home'
import SubCarousel from './SubCategory/index.vue'
let banner = ref<Banner[]>([])
getHomeBanner().then(res=>{
  banner.value = res.result
})
</script>


<style>

</style>