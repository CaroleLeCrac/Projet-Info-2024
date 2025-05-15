<!--Page d'accueil de sélection du créneau-->
<template>
    <main class="center">
        <h1>Sélectionner un créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="list">
            <li v-for="course in courses" :key="course.date">
                <label>
                    <RouterLink :to="`/${course.type}/${course.matiere_name}/${course.date}/groupe`"
                        class="router-link">
                        {{ course.type }} {{ course.matiere_name }}</RouterLink>
                </label>
            </li>
        </ul>
    </main>
</template>

<script setup>

import { getSlots } from '@/shared/fetchers/slots';
import { ref, onMounted, watch } from 'vue'

const courses = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);

onMounted(async () => {
    courses.value = await getSlots(selectedDate.value);
})

watch(selectedDate, async (newDate) => {
    courses.value = await getSlots(newDate);
})
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