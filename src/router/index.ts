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
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/login/callback",
    name: "loginCallback",
    component: () => import("@/views/login/LoginCallBack.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
