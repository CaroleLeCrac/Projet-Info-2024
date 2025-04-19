<!--Composant de la barre de navigation-->
<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
  <nav class="navigation-bar">
    <RouterLink to="/" class="title-navigation-bar">Gestion des Absences MIASHS</RouterLink>
    <div class="navigation-routerLink">
      <RouterLink to="/recapitulatifs" class="summary-navigation">Voir le récapitulatif des absences</RouterLink>
      <RouterLink to="/selection/etudiant" class="modification-navigation">Modifier étudiant.e</RouterLink>
      <RouterLink to="/selection/groupe" class="modification-navigation">Modifier groupe</RouterLink>
    </div>
  </nav>
</template>

<style> /*Pas de scoped car la barre de navigation est sur toutes les pages */
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
.navigation-routerLink {
  display: flex;
  gap: 0.7rem;
}

/* Style pour les RouterLink */

/* Style pour le RouterLink Recap et Modif*/
.summary-navigation,
.modification-navigation {
  text-decoration: none;
  color: black;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.summary-navigation {
  background-color: var(--color-1);
}

.modification-navigation {
  background-color: var(--color-4);
}

/* Effet au survol des RouterLink */

.title-navigation-bar:hover {
  color: var(--color-4);
}

.summary-navigation:hover {
  background-color: var(--color-5);
}

.modification-navigation:hover {
  background-color: var(--color-5);
}
</style>