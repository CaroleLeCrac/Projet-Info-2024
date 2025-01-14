<!--Page de sélection du créneau-->
<template>
    <h1>Créneau</h1>
    <DateBar @dateChanged="updateSelectedDate"/> 
    <ul class="course-list">
        <li v-for="course in filteredCoursesByDate" :key="course.date">
            <label>
                <RouterLink :to="`/appel/${course.date}`" 
                    class="router-link">
                    {{ course.date }} {{ course.name }} {{ course.coursename }}</RouterLink>
            </label>
        </li>
    </ul>
</template>

<script setup>

import DateBar from './DateBar.vue';
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
    const formattedDate = selectedDate.value.toISOString().split('T')[0];
    return filteredCourses.value.filter(course => course.date === formattedDate);
});

function updateSelectedDate(date) {
    selectedDate.value = date;
}
</script>

<style scoped>
.course-list {
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