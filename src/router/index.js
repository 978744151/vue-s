import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/home.vue'
import category from '../components/home/category.vue'
import cart from '../components/home/cart.vue'
import user from '../components/home/user.vue'
import search from '../components/search/search.vue'
import searchlist from '../components/search/searchlist'
import product from '../components/product/product'
Vue.use(Router)
export default new Router({
  routes: [
    { path: "/cart", component: cart },
    { path: "/home", component: Home },
    { path: "/category", component: category },
    { path: "/user", component: user },
    { path: "/search", component: search },
    { path: "/searchlist", component: searchlist },
    { path: "/product", component: product},
    { path: "/", redirect: "/home" },
  ]
})
