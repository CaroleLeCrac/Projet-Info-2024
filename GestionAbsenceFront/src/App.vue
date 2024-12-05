
<template>
  <HomeNavigationBar/>
  <NavigationBarBack/>
  <SelectionPresenceList :studentList="studentList"/>
  <DateBar/>
</template>


<script setup>
import {computed, ref} from 'vue';
import SelectionPresenceList from './shared/components/SelectionPresenceList.vue'
import HomeNavigationBar from './shared/components/HomeNavigationBar.vue';
import NavigationBarBack from './shared/components/NavigationBarBack.vue';
import DateBar from './shared/components/DateBar.vue';
//import { RouterView } from 'vue-router';
const studentList = ref([
  'Carole Mitton', 'Léna Kieffel', 'Roxane Dubus', 'Solenn Ragueneau', 'Mathias Devilliers', 'Saliha Ozturk'
])

</script> 

<style scoped>

</style>
