<!--Page de sélection des absences pour un créneau-->
<template>
    <div>
        <h1>Appel</h1>
        <SelectionPresenceList/>
        <!--Le bouton doit apparaitre à chaque fois qu'un changement est fait dans la liste-->
        <!--dans le composant, afficher présent.e et absent.e dans la liste à côté du nom ?-->
        <!--dans le composant, ajouter un bouton voir le récap de l'étudiant lorsqu'on le survole-->
        <button 
            v-if="!callSaved" 
            class="button-save" 
            @click="saveCall"
        >Sauvegarder l'appel</button>
        <p v-if="showNotification" class="notification">Appel sauvegardé avec succès</p>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import SelectionPresenceList from './SelectionPresenceList.vue';

const callSaved = ref(false);
const showNotification = ref(false);

function saveCall() {
    /* Sauvegarder l'appel */
    callSaved.value = true;
    showNotification.value = true;

    setTimeout(() => {
        showNotification.value = false;
    }, 3000); // temps d'affichage du message de sauvegarde de l'appel
}

</script>

<style scoped>
.button-save {
    background-color: rgb(94, 216, 94);
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.notification {
    color: rgb(94, 216, 94);
}

.button-save:hover {
    background-color: rgb(99, 201, 99);
}
</style>