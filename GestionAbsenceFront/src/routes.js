import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView/HomeView.vue'
import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import GroupModification from './pages/GroupModification/GroupModification.vue'
import StudentModification from './pages/StudentModification/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'
import SlotPage from './pages/Slot/SlotPage.vue'
import CallPage from './pages/Call/CallPage.vue'


const routes = [
  { path: '/', component: HomeView },
  { path: '/creneau', component: SlotPage },
  { path: '/appel', component: CallPage },
  { path: '/récapitulatifs', component: SummaryPage },
  { path: '/modificationEtudiant', component: SelectStudentModification },
  { path: '/modificationGroupe', component: SelectGroupModification},
  { path: '/modification/groupe', component : GroupModification},
  { path: '/modification/etudiant', component : StudentModification}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})