<!--Page de sélection des absences pour un créneau-->
<template>
    <div>
        <h1>Appel</h1>
        <SelectionPresenceList/>
        <button class="button-save">Sauvegarder</button>
    </div>
</template>

<script setup>
import SelectionPresenceList from './SelectionPresenceList.vue';


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

.button-save:hover {
    background-color: rgb(99, 201, 99);
}
</style>