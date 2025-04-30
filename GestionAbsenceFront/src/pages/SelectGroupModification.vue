<!--Page de sélection d'un groupe pour ajouter ou supprimer des étudiants-->
<template>
  <main class="left">
    <h1>Sélectionner le groupe à modifier</h1>
    <input class="search-bar" type="search" v-model="searchQuery" placeholder="Rechercher un groupe" />
    <ul class="list">
      <li v-for="group in filteredGroups" :key="group.groupNumber">
        <RouterLink :to="`/modification/groupe/${group.groupNumber}`" class="router-link">{{ group.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const groups = ref([])
const searchQuery = ref('')

onMounted(() => {
  fetch('/Groups.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      groups.value = data.groups;
    })
    .catch(error => console.error('Error loading data:', error));
});

const filteredGroups = computed(() =>
  groups.value.filter((gr) =>
    gr.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    gr.groupNumber.includes(searchQuery.value)
  )
);
</script>

<style scoped>
@import url("../shared/shared.css");
</style>