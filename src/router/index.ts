import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('../components/Layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/category/:id",
        component: () => import("@/views/TopCategory.vue"),
      },
      {
        path: "/category/sub/:id",
        component: () => import("@/views/SubCategory.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
