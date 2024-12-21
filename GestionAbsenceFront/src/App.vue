
<template>
  <HomeNavigationBar/>
  <RouterView />
  <AddnDeleteStudent /> 
</template>


<script setup>
import {computed, ref} from 'vue';
import HomeNavigationBar from './pages/HomeView/HomeNavigationBar.vue';
import { RouterView } from 'vue-router';
import AddnDeleteStudent from './pages/GroupModification/AddnDeleteStudent.vue';

const studentList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
