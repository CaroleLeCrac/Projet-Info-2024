import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import ListNames from './shared/components/ListNames.vue'
import GroupModification from './pages/GroupModification/GroupModification.vue'
import StudentModification from './pages/StudentModification/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'


const routes = [
  { path: '/', component: ListNames },
  { path: '/modificationEtudiant', component: SelectStudentModification },
  { path: '/modificationGroupe', component: SelectGroupModification},
  { path: '/modification/groupe', component : GroupModification},
  { path: '/modification/etudiant', component : StudentModification}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})