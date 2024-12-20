import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import SelectModificationStudent from './pages/SelectStudentModification/SelectStudentModification.vue'
import ListNames from './shared/components/ListNames.vue'

const routes = [
  { path: '/', component: ListNames },
  { path: '/modification', component: SelectModificationStudent }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})