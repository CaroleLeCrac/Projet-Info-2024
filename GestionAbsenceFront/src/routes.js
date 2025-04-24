import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/HomeView/HomeView.vue'
import SelectStudentModification from './pages/SelectStudentModification/SelectStudentModification.vue'
import GroupModification from './pages/GroupModification/GroupModification.vue'
import StudentModification from './pages/StudentModification/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification/SelectGroupModification.vue'
import SlotPage from './pages/Slot/SlotPage.vue'
import CallPage from './pages/Call/CallPage.vue'
import SummaryPage from './pages/Summary/SummaryPage.vue'
import CourseSummaryPage from './pages/CourseSummary/CourseSummaryPage.vue'
import StudentSummaryPage from './pages/StudentSummary/StudentSummaryPage.vue'
import CoursesManagementPage from './pages/CoursesManagement/CoursesManagementPage.vue'
import StudentsManagementPage from './pages/StudentsManagement/StudentsManagementPage.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/creneau/:profesionalSurname', name: 'Slot',component: SlotPage },
  { path: '/appel/:courseDate', name: 'CMCall', component: CallPage },
  { path: '/appel/:courseDate/:groupNumber', name: 'CallWithGroup', component: CallPage },
  { path: '/recapitulatifs', name: 'Summary', component: SummaryPage },
  { path: '/selection/etudiant', name: 'SelectStudentModification', component: SelectStudentModification },
  { path: '/selection/groupe', name: 'SelectGroupModification', component: SelectGroupModification },
  { path: '/modification/groupe/:id', name: 'GroupModification', component: GroupModification },
  { path: '/modification/etudiant/:id', name: 'StudentModification', component: StudentModification },
  { path: '/recapitulatifs/matiere/:id', name: 'CourseSummary', component: CourseSummaryPage },
  { path: '/recapitulatifs/etudiant/:id', name: 'StudentSummary', component: StudentSummaryPage },
  { path: '/gestion/cours', name: 'CoursesManagement', component: CoursesManagementPage },
  { path: '/gestion/etudiants', name: 'StudentsManagement', component: StudentsManagementPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})