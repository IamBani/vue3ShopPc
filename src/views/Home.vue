<template>
  <div class="home">
    <div class="container">
      <HomeCategory />
      <HomeBanner></HomeBanner>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HomeCategory from "./home/HomeCategory.vue"
import HomeBanner from "./home/HomeBanner.vue"


</script>
