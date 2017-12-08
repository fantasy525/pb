import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tcmsleep from '@/pages/tcmsleep'
import Emotion from '@/pages/emotion'
import Syndrome from '@/pages/syndrome'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Result from '@/pages/result'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/tcmsleep',
      name: 'tcmsleep',
      component: Tcmsleep
    }, {
      path: '/emotion',
      name: 'emotion',
      component: Emotion
    },
    {
      path: '/syndrome',
      name: 'syndrome',
      component: Syndrome
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/result',
      name: 'result',
      component: Result
    }
  ]
})
