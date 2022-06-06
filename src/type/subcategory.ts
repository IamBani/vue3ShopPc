export interface Categories {
  id: string;
  name: string;
}
export interface Brands extends Categories {
  nameEn: string;
  logo: string;
}
export type Properties = Categories;
export interface SaleProperties extends Categories {
  properties: Properties[];
  [propname: string]: any;
}
export interface SubFilterList {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  categories: Categories[];
  brands: Brands[];
  saleProperties: SaleProperties[];
}

export interface SortParams {
  sortField: null | string;
  sortMethod: null | string;
  inventory: boolean;
  onlyDiscount: boolean;
}

export interface Obj {
  brandId: null | string;
  attrs: Attrs[] | null;
}

interface Attrs {
  groupName: string | undefined;
  propertyName: string | undefined;
}