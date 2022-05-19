 <template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <Breadcrumb :list="list"></Breadcrumb>
      <SubFilter></SubFilter>
      <!-- 筛选分区 -->
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


import {subFilterKey} from '@/utils/symbols'
import {SubFilterList} from '@/type/subcategory'
import {findSubFilter} from '@/http/api/SubCategory'
import { onMounted, provide, ref } from 'vue'
import {getHomeBanner} from '@/http/home'
import Breadcrumb,{Breadcrumb as Bread } from '@/components/Breadcrumb/index.vue'
import SubFilter from './SubCategory/SubFilter.vue'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
let list = ref<Bread[]>([])
const subFilter = ref<Partial<SubFilterList>>({})
const router = useRoute()
onBeforeRouteUpdate(to=>{
  getFindSubFilter(to.params.id as string)
})
const getFindSubFilter = async (id:string)=>{
  const { result } = await findSubFilter({id})
  subFilter.value = result
}
onMounted(()=>{
  getFindSubFilter(router.params.id as string)
})
provide(subFilterKey,subFilter)
</script>


<style>

</style>