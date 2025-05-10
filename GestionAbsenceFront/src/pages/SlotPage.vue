<!--Page d'accueil de sélection du créneau-->
<template>
    <main class="center">
        <h1>Sélectionner un créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="list">
            <li v-for="course in filteredCoursesByDate" :key="course.date+course.matiere_name+course.type">     <!--key nest pas unique dans date vu que les creneaux recuperes sont toutes a la meme date...-->   
                <RouterLink :to="`/${course.type}/${course.matiere_name}/groupe`" class="router-link">{{ course.type }} {{ course.matiere_name }}</RouterLink>
            </li>
        </ul>
    </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
const courses = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);

watch(selectedDate, (newDate) => {
    console.log("Nouvelle date sélectionnée :", newDate);

    fetch(`http://localhost:3001/api/creneaux?date=${newDate}`) 
        .then((response) => response.json())
        .then((data) => {
            courses.value = data;
        })
        .catch((error) => console.error('Error loading courses data:', error))
});

onMounted(() => {
    fetch(`http://localhost:3001/api/creneaux?date=${selectedDate.value}`) 
        .then((response) => response.json())
        .then((data) => {
            courses.value = data;
        })
        .catch((error) => console.error('Error loading courses data:', error))
});

//filtre en fonction de la date recupere
const filteredCoursesByDate = computed(() => {
    return courses.value;
});

</script>

<style scoped>
@import url("../shared/shared.css");

#date-bar {
    background-color: var(--color-6);
    margin-bottom: 1rem;
    border-radius: 5px;
    font-size: 1.25rem;
    font-family: sans-serif;
    padding: 0.5rem;
}
</style>