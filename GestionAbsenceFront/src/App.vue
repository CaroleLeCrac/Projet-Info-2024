
<template>
  <h1 style="background-color: aquamarine;">Gestion des Absence MIASHS</h1>
  <ListeSelectionPresence :etus='etus'/>
  <BarRecherche :etus='etus'/>
  
</template>


<script setup>
import {computed, ref} from 'vue';
import ListeSelectionPresence from './ListeSelectionPresence.vue'
import BarRecherche from './BarRecherche.vue';
const etus = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
