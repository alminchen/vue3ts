import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, {
    path: "/business/:id",
    name: "Business",
    component: () => import( /* webpackChunkName: "Business" */'../views/Business.vue')
  }, {
    path: "/myzone",
    name: "Myzone",
    component: () => import(/* webpackChunkName: "myzone" */ '../views/myzone.vue')
  },
  {
    path: "/order",
    name: "Order",
    component: () => import(/* webpackChunkName: "order" */ "../views/Order")
  },
  {
    path: "/search/:keyword",
    name: "Search",
    component: () => import(/* webpackChunkName: "search" */ "../views/Search")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
