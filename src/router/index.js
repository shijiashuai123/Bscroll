import Vue from 'vue'
import Router from 'vue-router'
import scroll from '@/components/scroll'
import home from '@/components/home'
import CommonScroll from '@/components/commonScroll'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/CommonScroll',
      name: 'CommonScroll',
      component: CommonScroll
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: scroll
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
