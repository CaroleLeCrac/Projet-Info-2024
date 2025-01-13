<!--Page d'accueil avec la sélection du professeur-->
<template>
    <h1>Professionnel</h1>
    <!--SearchBar pour le professionnel -->
    <input
        type="text"
        v-model="profesionalQuery"
        placeholder="Rechercher un professionnel"
        class="search-bar"
    />
    <div>
        <select v-model="selectedProfesional" :size="filteredProfesionals.length">
            <option v-for="profesional in filteredProfesionals" :value="profesional.surname">
                {{ profesional.surname }} {{ profesional.name }}
            </option>
        </select>
        <RouterLink :to="'/${profesional.surname}/creneau'" class="selection-routerLink">
            {{ profesional.surname }} {{ profesional.name }}
        </RouterLink>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'

const selectedProfesional = ref('')
const profesionals = ref([])
const profesionalQuery = ref('')

onMounted(() => {
  fetch('/ListProfesional.json')
    .then((response) => response.json())
    .then((data) => {
      profesionals.value = data.profesionals 
    })
    .catch((error) => console.error('Error loading profesionals data:', error))
})

const filteredProfesionals = computed(() => {
    return profesionals.value.filter((profesional) =>
        (profesional.name + ' ' + profesional.surname).toLowerCase().includes(profesionalQuery.value.toLowerCase())
    )
})

</script>

<style scoped>
.search-bar {
  padding: 8px;
  font-size: 16px;
  width: 30%;
  margin-bottom: 10px;
}

.selection-routerLink {
    text-decoration: none;
    background-color: lightgray;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.selection-routerLink:hover {
    background-color: gray; 
}

</style>