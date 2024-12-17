
<template>
  <HomeNavigationBar/>
  <RouterView />
</template>


<script setup>
import {computed, ref} from 'vue';
import HomeNavigationBar from './shared/components/HomeNavigationBar.vue';
import { RouterView } from 'vue-router';

//import { RouterView } from 'vue-router';
const studentList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
