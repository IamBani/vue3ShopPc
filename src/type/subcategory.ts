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
