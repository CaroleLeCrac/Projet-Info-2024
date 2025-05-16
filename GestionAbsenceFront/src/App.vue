<template>
  <NavigationBar />
  <Breadcrumb :steps="breadcrumbSteps" />
  <RouterView />
</template>


<script setup>
import Breadcrumb from './shared/components/Breadcrumb.vue';
import NavigationBar from './shared/components/NavigationBar.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

//Toutes les localisations possibles pour le fil d'Ariane :
const breadcrumbSteps = computed(() => {
  const name = route.name

  switch (name) {
    case 'Slot':
      return [
        { label: 'Accueil', to: null }
      ]

    case 'SelectGroupCall':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Groupe du créneau', to: null }
      ]

    case 'Call':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Groupe du créneau', to: `/${route.params.sessionType}/${route.params.courseName}/${route.params.date}/groupe` },
        { label: 'Appel', to: null }
      ]

    case 'Summary':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Récapitulatif des absences', to: null }
      ]

    case 'CourseSummary':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Récapitulatif des absences', to: '/recapitulatifs' },
        { label: 'Récap. matière', to: null }
      ]

    case 'StudentSummary':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Récapitulatif des absences', to: '/recapitulatifs' },
        { label: 'Récap. étudiant.e', to: null }
      ]

    case 'SelectStudentModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection étudiant.e à modifier', to: null }
      ]

    case 'StudentModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection étudiant.e à modifier', to: '/selection/etudiant' },
        { label: 'Modification d’un.e étudiant.e', to: null }
      ]

    case 'SelectGroupModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection groupe à modifier', to: null }
      ]

    case 'GroupModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection groupe à modifier', to: '/selection/groupe' },
        { label: 'Modification d’un groupe', to: null }
      ]

    /* Pour le bouton 1 du menu déroulant non utilisé
    case 'CoursesManagement':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Gestion des données des cours', to: null }
      ]
    */
    case 'StudentsManagement':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Gestion des données des étudiant.e.s', to: null }
      ]

    default:
      return []
  }
})
</script>