<template>
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{'active':sortParams.sortField == null}" @click="changeSort(null)">默认排序</a>
      <a href="javascript:;" :class="{'active':sortParams.sortField === 'publishTime'}" @click="changeSort('publishTime')">最新商品</a>
      <a href="javascript:;" :class="{'active':sortParams.sortField == 'orderNum'}" @click="changeSort('orderNum')">最高人气</a>
      <a href="javascript:;" :class="{'active':sortParams.sortField == 'evaluateNum'}" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{'active':sortParams.sortField === 'price' && sortParams.sortMethod === 'asc'}" />
        <i class="arrow down" :class="{'active':sortParams.sortField === 'price' && sortParams.sortMethod === 'desc'}"  />
      </a>
    </div>
    <div class="check">
      <el-checkbox v-model="sortParams.inventory">仅显示有货商品</el-checkbox>
      <el-checkbox v-model="sortParams.onlyDiscount">仅显示特惠商品</el-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
interface SortParams{
  sortField: null | string,
  sortMethod: null | string,
  inventory: boolean,
  onlyDiscount: boolean,
}
const sortParams = reactive<SortParams>({
  sortField: null,
  sortMethod: null,
  inventory: false,
  onlyDiscount: false,
});

const changeSort = (sortField:string | null) => {
    if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
            sortParams.sortMethod = 'desc'
        } else {
            sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' :'desc'
        }
    } else {
        if(sortParams.sortField === sortField)return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
    }
}
</script>


<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>