
<template>
  <HomeNavigationBar/>
  <RouterView />
</template>


<script setup>
import {computed, ref} from 'vue';
import HomeNavigationBar from './pages/HomeView/HomeNavigationBar.vue';
import { RouterView } from 'vue-router';


</script> 

<style scoped>

</style>
