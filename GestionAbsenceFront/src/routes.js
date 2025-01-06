import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView/HomeView.vue'
import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import GroupModification from './pages/GroupModification/GroupModification.vue'
import StudentModification from './pages/StudentModification/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'
import SlotPage from './pages/Slot/SlotPage.vue'
import CallPage from './pages/Call/CallPage.vue'
import SummaryPage from './pages/Summary/SummaryPage.vue'
import CourseSummaryPage from './pages/CourseSummary/CourseSummaryPage.vue'
import StudentSummaryPage from './pages/StudentSummaryPage/StudentSummaryPage.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:profesional/creneau', 
    name: 'ProfesionalSlotPage',
    component: SlotPage },
  { path: '/:profesional/:course/appel', 
    name: 'CourseCallPage',
    component: CallPage },
  { path: '/récapitulatifs', component: SummaryPage },
  { path: '/modificationEtudiant', component: SelectStudentModification },
  { path: '/modificationGroupe', component: SelectGroupModification},
  { path: '/modification/groupe/:id', component : GroupModification},
  { path: '/modification/etudiant/:id', component : StudentModification},
  {
    path: '/récapitulatifs/matiere/:course',
    name: 'CourseSummaryPage', // Assurez-vous que le nom de la route est bien "CourseSummaryPage"
    component: CourseSummaryPage
  },
  {
    path: '/récapitulatifs/etudiant/:student',
    name: 'StudentSummaryPage',
    component: StudentSummaryPage
  }
  
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})