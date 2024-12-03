<script setup>

</script>

<template>
<nav class="navigation-bar">
  <h1 class="title-navigation-bar">Gestion des Absences MIASHS</h1>
  <div class="navigation-buttons">
    <button class="button-summary-navigation">Voir le récapitulatif des absences</button>
    <button class="button-modification-navigation">Modifier étudiant</button>
    <button class="button-modification-navigation">Modifier groupe</button>
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
  font-size: 24px; /* Taille du texte */
  margin: 0; /* Supprime les marges */
  color : #333; /* Couleur du texte */
}

/* Conteneur pour les boutons pour les mettre à droite */
.navigation-buttons {
  display: flex; /* Dispose les boutons sur la même ligne */
  gap: 10px; /* Espace entre les boutons */
}

/* Style pour les boutons */

/* Style pour le bouton Recap */
.button-summary-navigation {
  background-color: rgba(255,165,0,0.7); /* Couleur de fond du bouton */
  color: black; /* Couleur du texte */
  border: none; /* Supprime les bordures */
  padding: 10px 20px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur au survol */
  font-size: 16px; /* Taille du texte */
}

/* Style pour les boutons Modif */
.button-modification-navigation {
  background-color: white; /* Couleur de fond du bouton */
  color: black; /* Couleur du texte */
  border: none; /* Supprime les bordures */
  padding: 10px 20px; /* Espacement intérieur */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur au survol */
  font-size: 16px; /* Taille du texte */
}

/* Effet au survol des boutons */
.button-summary-navigation:hover {
  background-color: rgba(255,140,0,0.9); /* Couleur plus sombre au survol */
}

.button-modification-navigation:hover {
  background-color: #f2f2f2;
}
</style>