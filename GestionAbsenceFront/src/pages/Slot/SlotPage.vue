<!--Page de sélection du créneau-->
<template>
    <main class="center">
        <h1>Sélectionner un créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="list">
            <li v-for="course in filteredCoursesByDate" :key="course.date">
                <label>
                    <RouterLink :to="generateRoute(course)" class="router-link">
                        {{ course.date }} {{ course.name }} {{ course.coursename }}</RouterLink>
                </label>
            </li>
        </ul>
    </main>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';

const courses = ref([])
const profesionals = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);

const route = useRoute();
const currentProfesional = ref(route.params.profesionalSurname);

onMounted(() => {
    fetch('/Slots.json')
        .then((response) => response.json())
        .then((data) => {
            courses.value = data.coursedates
        })
        .catch((error) => console.error('Error loading courses data:', error))

    fetch('/Profesionals.json')
        .then((response) => response.json())
        .then((data) => {
            profesionals.value = data.profesionals
        })
        .catch((error) => console.error('Error loading profesionals data:', error))

})

// Filtre des cours du profesionnel sélectionné seulement
const filteredCourses = computed(() => {
    const profesionalCourses = profesionals.value
        .filter(p => p.surname === currentProfesional.value)
        .map(p => p.course);

    return courses.value.filter(course => profesionalCourses.includes(course.coursename));
})

const filteredCoursesByDate = computed(() => {
    const formattedDate = selectedDate.value;
    return filteredCourses.value.filter(course => course.date === formattedDate);
}); 

function generateRoute(course) {
    if (course.name === "TD" || course.name === "TM" || course.name == "TP") {
        return `/appel/${course.date}/${course.groupNumber}`;
    } else {
        return `/appel/${course.date}`
    }
}

</script>

<style scoped>
@import url("../../shared/shared.css");

#date-bar {
    background-color: var(--color-6);
    margin-bottom: 1rem;
    border-radius: 5px;
    font-size: 1.25rem;
    font-family: sans-serif;
    padding: 0.5rem;
}
</style>