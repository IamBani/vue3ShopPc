import { getCategory } from "@/http/nav";
import { defineStore } from "pinia";
import { topCategory } from "@/utils/const";
import { List } from "@/type/category";

interface Category{
  list:List[]
}
export const useCategory = defineStore("category", {
  state: (): Category => {
    return {
      list: topCategory.map((item: string) => ({ name: item })),
    };
  },
  actions: {
    async getList() {
      const res = await getCategory();
      res?.result.forEach((element: any) => {
        element.open = false;
      });
      this.list = res.result;
    },
  },
  getters: {
    retList(): List[] {
      return this.list;
    },
  },
});
