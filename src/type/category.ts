export interface List {
  id?: string;
  name: string;
  picture?: string;
  children?: List[];
  goods?: Goods[];
  [propName: string]: any;
}
export interface Goods {
  desc?: string;
  discount?: string;
  id?: string;
  name?: string;
  orderNum?: string | number;
  picture?: string;
  price?: string;
}
