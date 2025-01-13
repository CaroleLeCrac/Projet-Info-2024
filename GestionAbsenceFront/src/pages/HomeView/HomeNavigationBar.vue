<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
<nav class="navigation-bar">
  <RouterLink to="/" class="title-navigation-bar">Gestion des Absences MIASHS</RouterLink>
  <div class="navigation-routerLink">
    <RouterLink to="/récapitulatifs" class="summary-navigation">Voir le récapitulatif des absences</RouterLink>
    <RouterLink to="/modificationEtudiant" class="modification-navigation">Modifier étudiant</RouterLink>
    <RouterLink to="/modificationGroupe" class="modification-navigation">Modifier groupe</RouterLink>
    </div>
</nav> 
</template>

<style>
/* Style pour la barre de navigation */
.navigation-bar {
  background-color: rgba(173,216,230,0.7);
  padding: 10px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

/*Style pour le titre de la barre de navigation */
.title-navigation-bar {
  text-decoration: none;
  font-size: 24px; 
  margin: 0; 
  color : #333; 
}

/* Conteneur pour les RouterLink pour les mettre à droite */
.navigation-routerLink {
  display: flex;
  gap: 10px; 
}

/* Style pour les RouterLink */

/* Style pour le RouterLink Recap */
.summary-navigation {
  text-decoration: none; 
  background-color: rgba(255,165,0,0.7); 
  color: black; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
}

/* Style pour les RouterLink Modif */
.modification-navigation {
  text-decoration: none; 
  background-color: white; 
  color: black; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
}

/* Effet au survol des RouterLink */

.title-navigation-bar:hover {
  color: rgba(255,140,0,0.9);
}

.summary-navigation:hover {
  background-color: rgba(255,140,0,0.9); 
}

.modification-navigation:hover {
  background-color: #f2f2f2;
}
</style>