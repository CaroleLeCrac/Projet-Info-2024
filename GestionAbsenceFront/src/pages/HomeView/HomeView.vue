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
    <ul class="profesional-list">
        <li v-for="profesional in filteredProfesionals">
            <label>
                <RouterLink :to="`/creneau/${profesional.surname}`" 
                    class="router-link">
                        {{ profesional.surname }} {{ profesional.name }}
                </RouterLink>
            </label>
        </li>
    </ul>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'

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

.profesional-list {
    display : flex; 
    flex-direction: column;
    width: 20%;
    list-style-type: none;
    padding-left: 0;
}

.router-link {
    display: block;
    text-decoration: none; 
    border-radius: 5px;
    color: black; 
    cursor: pointer; 
    font-size: 16px; 
    padding: 8px 10px; 
    width: 110%;
    border: 2px solid black;
    box-sizing: border-box;
}

.router-link:hover {
    background-color: lightgray;
}

</style>