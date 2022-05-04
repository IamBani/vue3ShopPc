<template>
   <el-carousel height="500px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <el-image
            style="width: 100%; height: 100%"
            :src="item.imgUrl"
            fit="fill"
          />
        </el-carousel-item>
      </el-carousel>
</template>

<script lang="ts" setup>
import {Banner} from '../TopCategory.vue'
import { defineProps,PropType } from 'vue'
defineProps({
    banner:{
        type:Array as PropType<Banner[]>,
        required:true
    }
})
</script>


<style>

</style>