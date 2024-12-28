<!--Page de sélection des absences pour un créneau-->
<template>
    <div>
        <h1>Appel</h1>
        <SelectionPresenceList/>
        <!--dans le composant, afficher présent.e et absent.e dans la liste à côté du nom ?-->
        <!--dans le composant, ajouter un bouton voir le récap de l'étudiant lorsqu'on le survole-->
        <RouterLink to="/creneau"
            v-if="!callSaved" 
            class="button-save" 
            @click="saveCall"
        >Sauvegarder l'appel</RouterLink>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import SelectionPresenceList from './SelectionPresenceList.vue';
import { RouterLink } from 'vue-router';

const callSaved = ref(false);

function saveCall() {
    /* Sauvegarder l'appel */
    callSaved.value = true;
}

</script>

<style scoped>
.button-save {
    text-decoration: none;
    background-color: rgb(94, 216, 94);
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.button-save:hover {
    background-color: rgb(99, 201, 99);
}
</style>