import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/business/:id",
    name: "Business",
    component: () => import( /* webpackChunkName: "Business" */'../views/Business')
  }, {
    path: "/myzone",
    name: "Myzone",
    component: () => import(/* webpackChunkName: "myzone" */ '../views/Myzone')
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
