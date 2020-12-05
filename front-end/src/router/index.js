import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Manage from "../views/Manage.vue";
import AddNew from "../views/Add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage
  },
  {
    path: "/add",
    name: "Add",
    component: AddNew
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
