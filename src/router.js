import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/`,
      name: 'hello-world',
      component: HelloWorld,
    },
  ],
})
