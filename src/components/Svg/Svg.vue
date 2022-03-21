<template>
  <svg class="svg-icon" :class="[iconClass]">
    <use :xlink:href="`#icon-${iconName}`" />
  </svg>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconClass: {
      type: String
    }
  },
  setup () {
    const req = require.context('@/assets/svg', false, /\.svg$/)
    const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
    try {
      importAll(req)
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<style lang="less" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}

</style>
