<!--Page de sélection du professeur-->
<!--Page non utilisée-->
<template>
    <main class="center">
        <h1>Encadrant.e.s</h1>
        <!--SearchBar pour le professionnel -->
        <input type="search" v-model="profesionalQuery" placeholder="Rechercher un professionnel" class="search-bar" />
        <ul class="list">
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

const testPro = ref([])

//Les onMounted ne sont pas à jour et sont implémentés pour récupérer des données d'un fichier .json dans un dossier public du projet.
//Ce format de onMounted a été utilisé pour effectuer les tests avant la mise en place et la liaison du backend et de la base de données.
onMounted(() => {
    fetch('/Profesionals.json')
        .then((response) => response.json())
        .then((data) => {
            testPro.value = data
        })
        .catch((error) => console.error('Error loading profesionals data to ADE : ', error))
})

onMounted(() => {
    fetch('/Profesionals.json')
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
@import url("../shared/shared.css");
</style>