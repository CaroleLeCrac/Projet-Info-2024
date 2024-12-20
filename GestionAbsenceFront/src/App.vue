
<template>
  <HomeNavigationBar/>
  <RouterView />
  <AddnDeleteStu /> 
</template>


<script setup>
import {computed, ref} from 'vue';
import HomeNavigationBar from './pages/HomeView/HomeNavigationBar.vue';
import { RouterView } from 'vue-router';
import AddnDeleteStu from './pages/GroupModification/AddnDeleteStu.vue';

const studentList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
