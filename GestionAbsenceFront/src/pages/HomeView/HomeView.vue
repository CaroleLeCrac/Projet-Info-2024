<!--Page d'accueil avec la sélection du professeur-->
<template>
    <main>
        <h1>Professionnel</h1>
        <!--SearchBar pour le professionnel -->
        <input type="search" v-model="profesionalQuery" placeholder="Rechercher un professionnel" class="search-bar" />
        <ul class="profesional-list">
            <li v-for="profesional in filteredProfesionals">
                <label>
                    <RouterLink :to="`/creneau/${profesional.surname}`" class="router-link">
                        {{ profesional.surname }} {{ profesional.name }}
                    </RouterLink>
                </label>
            </li>
        </ul>
    </main>
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
@import url("../../shared/shared.css");

.search-bar {
    padding: 0.5rem;
    font-size: 1rem;
    width: 25%;
    margin-bottom: 1.5rem;
    border-radius: 5px;
    background-color: var(--color-4); 
}

.profesional-list {
    display: flex;
    flex-direction: column;
    width: 20%;
    list-style-type: none;
    padding-left: 0;
}

.profesional-list > li {
    margin-bottom: 0.5rem;
}

.router-link {
    display: block;
    text-decoration: none;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    width: 110%;
    border: 2px solid black;
    box-sizing: border-box;
    background-color: var(--color-4);
}

.router-link:hover {
    background-color: var(--color-4);
}
</style>