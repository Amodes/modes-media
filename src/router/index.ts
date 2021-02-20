import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
