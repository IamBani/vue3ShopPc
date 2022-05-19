<template>
  <div class="sub-filter">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="p in item.properties" :key="p.id">
          {{ p.name }}
        </a>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { SaleProperties } from "@/type/subcategory";
import { subFilterKey } from "@/utils/symbols";
import {inject, ref, watch } from "vue";
const subFilter = inject(subFilterKey, { saleProperties: [] });
const list = ref< Partial<SaleProperties>[]>([]);

watch(subFilter, (sub) => {
  let saleProperties = sub.saleProperties || [];
  list.value = [
    { id: "brands", name: "品牌", properties: subFilter?.brands },
    ...saleProperties,
  ];
});

</script>


<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
