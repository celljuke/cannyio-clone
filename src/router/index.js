import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import VueFire from 'vuefire'

Vue.use(Router)
Vue.use(VueFire)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
