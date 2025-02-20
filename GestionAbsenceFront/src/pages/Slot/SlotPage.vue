<!--Page de sélection du créneau-->
<template>
    <main class="center">
        <h1>Créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="course-list">
            <li v-for="course in filteredCoursesByDate" :key="course.date">
                <label>
                    <RouterLink :to="`/appel/${course.date}`" class="router-link">
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
const selectedDate = ref(new Date());

const route = useRoute();
const currentProfesional = ref(route.params.profesional);

onMounted(() => {
    fetch('/ListDates.json')
        .then((response) => response.json())
        .then((data) => {
            courses.value = data.coursedates
        })
        .catch((error) => console.error('Error loading courses data:', error))

    fetch('/ListProfesional.json')
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

.course-list {
    display: flex;
    flex-direction: column;
    width: 25%;
    list-style-type: none;
    padding-left: 0;
}

.course-list>li {
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
    border: 2px solid black;
    box-sizing: border-box;
    background-color: var(--color-6);
}

.router-link:hover {
    background-color: var(--color-3);
}
</style>