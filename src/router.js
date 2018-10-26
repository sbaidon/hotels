import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Confirmation from "./views/Confirmation.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/hotel/:id",
      name: "hotel-detail",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Hotel.vue"),
      props: true
    },
    {
      path: "/hotel/:hotelId/room/:roomId",
      name: "confirmation",
      component: Confirmation,
      props: true
    },
    {
      path: "/admin",
      name: "admin",
      component: () =>
        import(/* webpackChunkName: "confirmation" */ "./views/Admin.vue"),
      props: true
    }
  ]
});
