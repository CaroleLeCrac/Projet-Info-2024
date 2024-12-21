import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView/HomeView.vue'
import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import SlotPage from './pages/Slot/SlotPage.vue'
import CallPage from './pages/Call/CallPage.vue'
import SummaryPage from './pages/Summary/SummaryPage.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/creneau', component: SlotPage },
  { path: '/appel', component: CallPage },
  { path: '/récapitulatifs', component: SummaryPage },
  { path: '/modificationEtudiant', component: SelectStudentModification },
  { path: '/modificationGroupe', component: SelectGroupModification }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})