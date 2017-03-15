import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import PostDetail from '@/views/post-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post-detail/:postId',
      name: 'PostDetail',
      component: PostDetail
    }
  ]
})
