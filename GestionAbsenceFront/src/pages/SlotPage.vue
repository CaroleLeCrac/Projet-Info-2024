<!--Page d'accueil de sélection du créneau-->
<template>
    <main class="center">
        <h1>Sélectionner un créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="list">
            <li v-for="course in filteredCoursesByDate" :key="course.date">
                <label>
                    <RouterLink :to="`/${course.name}/${course.coursename}/groupe`" class="router-link">
                        {{ course.name }} {{ course.coursename }}</RouterLink>
                </label>
            </li>
        </ul>
    </main>
</template>

<script setup>

import { getSlots } from '@/shared/fetchers/slots';
import { ref, onMounted, computed } from 'vue'

const slots = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);

onMounted(() => {
    getSlots()
        .then((response) => response.json())
        .then((data) => {
            slots.value = data
            console.log("créneaux : ", slots)
        })
        .catch((error) => console.error('Error loading courses data:', error))
    //récup type id pour avoir le nom de la matière
})

const filteredCoursesByDate = computed(() => {
    const formattedDate = selectedDate.value;
    return slots.value.filter(course => course.date === formattedDate);
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