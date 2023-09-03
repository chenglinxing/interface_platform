import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  { 
    redirect:"/",
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "",
    component: () => import("@/components/layout/index.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
