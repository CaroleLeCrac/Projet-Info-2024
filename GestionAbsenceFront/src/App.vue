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

const breadcrumbSteps = computed(() => {
  const name = route.name

  switch (name) {
    case 'HomeView':
      return [{ label: 'Accueil', to: null }]

    case 'Slot':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Choix du créneau', to: null }
      ]

    case 'CMCall':
    case 'CallWithGroup':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Choix du créneau', to: `/creneau/${route.params.profesionalSurname}` },
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
        { label: 'Récap. étudiant', to: null }
      ]

    case 'SelectStudentModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection étudiant à modifier', to: null }
      ]

    case 'StudentModification':
      return [
        { label: 'Accueil', to: '/' },
        { label: 'Sélection étudiant à modifier', to: '/selection/etudiant' },
        { label: 'Modification d’un étudiant', to: null }
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

    default:
      return []
  }
})
</script>