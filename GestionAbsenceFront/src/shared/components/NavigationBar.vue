<!--Composant de la barre de navigation-->
<template>
  <nav class="navigation-bar">
    <RouterLink to="/" class="title-navigation-bar">Gestion des Absences MIASHS</RouterLink>
    <div class="navigation-router-link">
      <RouterLink to="/recapitulatifs" class="summary-navigation">Voir le récapitulatif des absences</RouterLink>
      <RouterLink to="/selection/etudiant" class="modification-navigation">Modifier étudiant.e</RouterLink>
      <RouterLink to="/selection/groupe" class="modification-navigation">Modifier groupe</RouterLink>
      <RouterLink to="/gestion/etudiants" class="students-management">Gestion des étudiant.e.s</RouterLink>


      <!--Menu déroulant de deux boutons non utilisé au final
      <div class="drop-down">
        <button class="drop-down-btn" @click="OpenDropDown">Gestion des données ▾</button>
        <div class="drop-down-menu" :class="{ show: dropDownOpen }">
          <RouterLink to="/gestion/cours" class="router-link">Gestion des cours</RouterLink>
          <RouterLink to="/gestion/etudiants" class="router-link">Gestion des étudiants</RouterLink>
        </div>
      </div>
      -->
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

/*
const dropDownOpen = ref(false);

function closeDropDown(event) {
  const dropdown = document.querySelector('.drop-down');
  if (dropdown && !dropdown.contains(event.target)) {
    dropDownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropDown);
});

function OpenDropDown() {
  dropDownOpen.value = !dropDownOpen.value;
}*/
</script>


<style>
/*Pas de scoped car la barre de navigation est sur toutes les pages */
@import url("../shared.css");

/* Style pour la barre de navigation */
.navigation-bar {
  background-color: var(--color-2);
  padding: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 1rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

/*Style pour le titre de la barre de navigation */
.title-navigation-bar {
  text-decoration: none;
  font-size: 1.6rem;
  margin: 0;
  color: white;
}

/* Conteneur pour les RouterLink pour les mettre à droite */
.navigation-router-link {
  display: flex;
  gap: 0.7rem;
}

/* Style pour les RouterLink */

/* Style pour le RouterLink Recap et Modif*/
.summary-navigation,
.modification-navigation,
.students-management,
.drop-down-btn {
  text-decoration: none;
  color: black;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.summary-navigation,
.drop-down-btn {
  background-color: var(--color-1);
}

.modification-navigation,
.students-management {
  background-color: var(--color-4);
}

/* Effet au survol des RouterLink */

.title-navigation-bar:hover {
  color: var(--color-4);
}

.summary-navigation:hover,
.modification-navigation:hover,
.students-management:hover,
.drop-down-btn:hover {
  background-color: var(--color-5);
}

/* Style Menu déroulant non utilisé

.drop-down {
  position: relative;
  display: inline-block;
}

.drop-down-btn {
  padding: 0.5rem 0.75rem;
}

.drop-down-menu {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--color-2);
  z-index: 100;
  width: 100%;
  padding: 0.4rem;
  min-width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
}

.drop-down-menu.show {
  display: block;
}

.router-link {
  margin-top: 0.5rem;
  padding: 0.2rem;
  background-color: var(--color-4);
  border: none;
}

.router-link:hover {
  background-color: var(--color-5);
}*/
</style>