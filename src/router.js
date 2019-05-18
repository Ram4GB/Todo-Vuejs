import Vue from "vue";
import Router from "vue-router";
import VueSource from "vue-resource";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
Vue.use(Router);
Vue.use(VueSource);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Homepage
    },
    {
      path: "/about",
      component: About
    },
    {
      name: "edit",
      path: "/edit/:id",
      component: Edit
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});
