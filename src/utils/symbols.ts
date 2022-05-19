import { InjectionKey } from "vue";
import type { SubFilterList } from "../type/subcategory";


export const subFilterKey: InjectionKey<Partial<SubFilterList>> =
  Symbol("subFilter");