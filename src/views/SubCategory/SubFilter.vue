<template>
  <div class="sub-filter">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="item.activeId === '' ? 'active' : ''"
          @click="changeBrand(item, '')"
          >全部</a
        >
        <a
          href="javascript:;"
          v-for="p in item.properties"
          :key="p.id"
          @click="changeBrand(item, p)"
        >
          <span :class="item.activeId === p.id ? 'active' : ''">{{
            p.name
          }}</span>
        </a>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { SaleProperties, Properties, Obj } from "@/type/subcategory";
import { subFilterKey } from "@/utils/symbols";
import { inject, ref, watch, defineEmits } from "vue";
const subFilter = inject(subFilterKey, { saleProperties: [] });
const list = ref<Partial<SaleProperties>[]>([]);
const emit = defineEmits<{ (e: "filterChange", params:Obj): void }>();
watch(subFilter, (sub) => {
  let saleProperties = sub.saleProperties || [];
  list.value = [
    { id: "", name: "品牌", properties: sub?.brands },
    ...saleProperties,
  ];
  list.value.forEach((item) => {
    item.activeId = "";
  });
});
const changeBrand = (item: Partial<SaleProperties>, p: string | Properties) => {
  const id = typeof p === "string" ? p : p.id;
  if (item.activeId === id) return;
  item.activeId = typeof p === "string" ? p : p.id;
  emit('filterChange',getFilterParams())
};
const getFilterParams = () => {
  const obj = { brandId: null, attrs: [] } as Obj;
  // 品牌
  obj.brandId = list.value[0].activeId;
  // 销售属性
  for (let i = 1; i < list.value.length; i++) {
    let id = list.value[i].activeId;
    const prop = list.value[i].properties?.find((item) => {
      return item.id === id;
    });
    obj.attrs?.push({
      groupName: list.value[i].name,
      propertyName: prop?.name,
    });
  }
  // 参考数据：{brandId:'',attrs:[{groupName:'',propertyName:''},...]}
  if (obj.attrs?.length === 0) obj.attrs = null;
  return obj;
};
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
        & > span.active,
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
