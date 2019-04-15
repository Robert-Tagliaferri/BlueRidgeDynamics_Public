import Vue from 'vue'
import Router from 'vue-router'
import Example from './views/Example.vue'
import Pie from './views/Pie.vue'
import Histogram from './views/Histogram.vue'
import People from './views/People.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'example',
      component: Example
    },
    {
      path: '/pie',
      name: 'pie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Pie
    },
    {
      path: '/histogram',
      name: 'histogram',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Histogram
    },
    {
      path: '/people',
      name: 'people',
      component: People
    }
  ]
})
