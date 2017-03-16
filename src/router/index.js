import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import PostDetail from '@/views/post-detail'
import CallBack from '@/views/callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/callback',
      name: 'CallBack',
      component: CallBack
    }
  ]
})
