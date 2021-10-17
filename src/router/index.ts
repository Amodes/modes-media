import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ImageView from "../components/Home/ImageView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Photography",
    component: ImageView,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../components/About/About.vue"),
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: () => import(/* webpackChunkName: "imprint" */ "../components/Imprint/Imprint.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Photography",
    component: ImageView,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
