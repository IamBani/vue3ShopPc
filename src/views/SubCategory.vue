 <template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :list="list"></Breadcrumb>
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 筛选分区 -->
      <div class="goods-list">
        <!-- 排序 -->
       <SubSort @sort-change="sortChange"></SubSort>
        <!-- 商品列表 -->
        <ul class="list">
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
         <InfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
     </div>
     
      <!-- 商品分区 -->
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
export interface Items{
  id: string,
  picture: string,
  name: string,
  price: number,
  desc: string,
  discount: number,
  joinCount: number,
  oldPrice:number
}
export interface GoodsList{
    items:Items[]
}

import {subFilterKey} from '@/utils/symbols'
import {SubFilterList,SortParams,Obj} from '@/type/subcategory'
import {findSubFilter,findSubCategoryGoods} from '@/http/api/SubCategory'
import { onMounted, provide, ref } from 'vue'
import {getHomeBanner} from '@/http/home'
import Breadcrumb,{Breadcrumb as Bread } from '@/components/Breadcrumb/index.vue'
import SubFilter from './SubCategory/SubFilter.vue'
import SubSort from './SubCategory/SubSort.vue'
import GoodsItem from './SubCategory/GoodsItem.vue'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
let list = ref<Bread[]>([])
let subFilter = ref<Partial<SubFilterList>>({})
const router = useRoute()
let loading = ref(false)
let finished = ref(false)
const goodsList = ref<Items[]>([]);
onBeforeRouteUpdate(to=>{
  getFindSubFilter(to.params.id as string)
})
const getFindSubFilter = async (id:string)=>{
  const { result } = await findSubFilter({ id })
  subFilter.value = result
}
onMounted(()=>{
  getFindSubFilter(router.params.id as string)
})
let reqParams = {
      page: 1,
      pageSize: 20,
    };
const getData = async () => {
  loading.value = true;
  const { result } = await findSubCategoryGoods(reqParams);
  if (result.items.length) { 
    goodsList.value.push(...result.items);
       reqParams.page++;
  } else {
      finished.value = true;
  }
   loading.value = false;
}
const sortChange = (sortParams:SortParams) => {
  console.log(sortParams);
  finished.value = false
  reqParams = { ...reqParams, ...sortParams }
  reqParams.page = 1
  goodsList.value = []
}
const filterChange = (params:Obj) => {
    finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...params };
      reqParams.page = 1;
      goodsList.value = [];
}
provide(subFilterKey,subFilter)
</script>


<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>