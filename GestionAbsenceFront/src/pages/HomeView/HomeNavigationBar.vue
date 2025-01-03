<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
<nav class="navigation-bar">
  <RouterLink to="/" class="title-navigation-bar">Gestion des Absences MIASHS</RouterLink>
  <div class="navigation-buttons">
    <RouterLink to="/récapitulatifs" class="summary-navigation">Voir le récapitulatif des absences</RouterLink>
    <RouterLink to="/modificationEtudiant" class="modification-navigation">Modifier étudiant</RouterLink>
    <RouterLink to="/modificationGroupe" class="modification-navigation">Modifier groupe</RouterLink>
    </div>
</nav> 
</template>

<style>
/* Style pour la barre de navigation */
.navigation-bar {
  background-color: rgba(173,216,230,0.7); /* Couleur de fond */
  padding: 10px; /* Espacement intérieur */
  display: flex; /* Permet de disposer les éléments sur une ligne */
  justify-content: space-between; /* Titre à gauche et boutons à droite */
  align-items: center; /* Aligne les éléments au centre */
}

/*Style pour le titre de la barre de navigation */
.title-navigation-bar {
  text-decoration: none;
  font-size: 24px; /* Taille du texte */
  margin: 0; /* Supprime les marges */
  color : #333; /* Couleur du texte */
}

/* Conteneur pour les boutons pour les mettre à droite */
.navigation-buttons {
  display: flex; /* Dispose les boutons sur la même ligne */
  gap: 10px; /* Espace entre les boutons */
}

/* Style pour les RouterLink */

/* Style pour le bouton Recap */
.summary-navigation {
  text-decoration: none; /* Supprime le soulignement */
  background-color: rgba(255,165,0,0.7); /* Couleur de fond du bouton */
  color: black; /* Couleur du texte */
  border: none; /* Supprime les bordures */
  padding: 10px 20px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur au survol */
  font-size: 16px; /* Taille du texte */
}

/* Style pour les boutons Modif */
.modification-navigation {
  text-decoration: none; /* Supprime le soulignement */
  background-color: white; /* Couleur de fond du bouton */
  color: black; /* Couleur du texte */
  border: none; /* Supprime les bordures */
  padding: 10px 20px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur au survol */
  font-size: 16px; /* Taille du texte */
}

/* Effet au survol des boutons */

.title-navigation-bar:hover {
  color: rgba(255,140,0,0.9);
}

.summary-navigation:hover {
  background-color: rgba(255,140,0,0.9); /* Couleur plus sombre au survol */
}

.modification-navigation:hover {
  background-color: #f2f2f2;
}
</style>