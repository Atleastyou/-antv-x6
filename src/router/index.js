import { createRouter, createWebHistory } from 'vue-router'

const _import = filepath => () => import('../views/' + filepath + '.vue');

const routes = [
  {
    path: '/',
    name: 'index',
    component: _import('Index')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
