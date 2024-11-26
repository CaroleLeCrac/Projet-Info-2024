
<template>
  <h1 style="background-color: aquamarine;">Gestion des Absence MIASHS</h1>
  <SelectionPresenceList :etudiantList='etudiantList'/>
  <RouterView />
</template>


<script setup>
import {computed, ref} from 'vue';
import SelectionPresenceList from './SelectionPresenceList.vue'
import { RouterView } from 'vue-router';
const etudiantList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
