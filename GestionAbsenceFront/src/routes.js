import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import ModificationStudent from './pages/ModificationStudent.vue'
import ListNames from './ListNames.vue'

const routes = [
  { path: '/', component: ListNames },
  { path: '/modification', component: ModificationStudent }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})