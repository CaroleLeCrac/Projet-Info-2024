
<template>
  <HomeNavigationBar/>
  <SelectionPresenceList :studentList="studentList"/>
  <AddStu :studentList="studentList"/>
</template>


<script setup>
import {computed, ref} from 'vue';
import SelectionPresenceList from './shared/components/SelectionPresenceList.vue'
import HomeNavigationBar from './shared/components/HomeNavigationBar.vue';
import AddStu from './shared/components/AddStu.vue';

//import { RouterView } from 'vue-router';
const studentList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
