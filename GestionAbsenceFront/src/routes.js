import { createRouter, createWebHistory } from 'vue-router'

import SelectStudentModification from './pages/SelectStudentModification.vue'
import GroupModification from './pages/GroupModification.vue'
import StudentModification from './pages/StudentModification.vue'
import SelectGroupModification from './pages/SelectGroupModification.vue'
import SlotPage from './pages/SlotPage.vue'
import CallPage from './pages/CallPage.vue'
import SummaryPage from './pages/SummaryPage.vue'
import CourseSummaryPage from './pages/CourseSummaryPage.vue'
import StudentSummaryPage from './pages/StudentSummaryPage.vue'
import CoursesManagementPage from './pages/CoursesManagementPage.vue'
import StudentsManagementPage from './pages/StudentsManagementPage.vue'
import SelectGroupForCall from './pages/SelectGroupForCall.vue'

const routes = [
  { path: '/', name: 'Slot', component: SlotPage },
  { path: '/:sessionType/:courseName/groupe', name: 'SelectGroupCall', component: SelectGroupForCall },
  { path: '/:sessionType/:courseName/:groupId/:groupName/appel', name: 'Call', component: CallPage },
  { path: '/recapitulatifs', name: 'Summary', component: SummaryPage },
  { path: '/selection/etudiant', name: 'SelectStudentModification', component: SelectStudentModification },
  { path: '/selection/groupe', name: 'SelectGroupModification', component: SelectGroupModification },
  { path: '/modification/groupe/:groupId', name: 'GroupModification', component: GroupModification },
  { path: '/modification/etudiant/:studentId', name: 'StudentModification', component: StudentModification },
  { path: '/recapitulatifs/matiere//:courseName/:courseId', name: 'CourseSummary', component: CourseSummaryPage },
  { path: '/recapitulatifs/etudiant/:studentId', name: 'StudentSummary', component: StudentSummaryPage },
  /*Pour le bouton 1 du menu déroulant non utilisé
  { path: '/gestion/cours', name: 'CoursesManagement', component: CoursesManagementPage },*/
  { path: '/gestion/etudiants', name: 'StudentsManagement', component: StudentsManagementPage }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})