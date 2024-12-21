import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import ListNames from './shared/components/ListNames.vue'
import GroupModification from './pages/GroupModification/GroupModification.vue'
import StudentModification from './pages/StudentModification/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'


const routes = [
  { path: '/', component: ListNames },
  { path: '/select/modification/student', component: SelectStudentModification },
  { path: '/select/modification/group', component: SelectGroupModification},
  { path: '/modification/group', component : GroupModification},
  { path: '/modification/student', component : StudentModification}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})