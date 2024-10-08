import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TaskView from '../views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: TaskView,
      props: route => ({query:  route.query.q}),
    }
  ]
})

export default router
