<template>
  <div class="home">
    <div class="container">
      <HomeCategory />
      <HomeBanner></HomeBanner>
    </div>
     <HomeFresh></HomeFresh>
     <HomeHot></HomeHot>
     <HomeBrand></HomeBrand>
     <homeProduct></homeProduct>
     <HomeSpecial></HomeSpecial>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HomeCategory from "./home/HomeCategory.vue"
import HomeBanner from "./home/HomeBanner.vue"
import HomeFresh from './home/HomeFresh.vue'
import HomeHot from './home/HomeHot.vue'
import HomeBrand from './home/homeBrand.vue';
import homeProduct from './home/homeProduct.vue';
import HomeSpecial from './home/HomeSpecial.vue';

</script>
