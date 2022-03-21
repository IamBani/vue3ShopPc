<template>
  <div class="home">
    {{age}}  <el-icon :size="20" color="red">
      <edit />
    </el-icon>
    <el-button type="primary">Primary</el-button>
    <test />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import test from "@/components/test"
const age = ref(278)
console.log(this)
 console.log(process.env)

</script>
