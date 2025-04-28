<!--Page de sélection du créneau-->
<template>
    <main class="center">
        <h1>Sélectionner un créneau</h1>
        <input type="date" v-model="selectedDate" id="date-bar">
        <ul class="list">
            <li v-for="course in courses" :key="course.date">
                <label>
                    {{ course }}
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

onMounted(async () => {
    const sessionId = "1966c425f7f";  // à adapter évidemment
    const baseUrl = "https://ade-uga-info-ro.grenet.fr/jsp/webapi";

    try {
        // 1. Initialisation du projet
        const projectResponse = await fetch(`${baseUrl}?sessionId=${sessionId}&function=setProject&projectId=8`);
        const projectText = await projectResponse.text();

        if (!projectResponse.ok) {
            throw new Error("Erreur setProject : " + projectText);
        }

        console.log("Projet bien initialisé");

        const eventsResponse = await fetch(`${baseUrl}?sessionId=${sessionId}&function=getEvents&tree=TRUE&date=04/17/2024`);
        const xmlText = await eventsResponse.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        const events = Array.from(xmlDoc.getElementsByTagName('event'));
        courses.value = events.map(event => {
            return {
                id: event.getAttribute('id'),
                activityId: event.getAttribute('activityId'),
                session: event.getAttribute('session'),
                repetition: event.getAttribute('repetition'),
                date: event.getAttribute('date'), // si dispo
                coursename: event.getAttribute('coursename'), // si dispo
            };
        });

        console.log("Événements récupérés :", courses.value);

    } catch (error) {
        console.error('Erreur pendant le chargement des données :', error);
    }
});

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

/*function generateRoute(course) {
    if (course.name === "TD" || course.name === "TM" || course.name == "TP") {
        return `/appel/${course.date}/${course.groupNumber}`;
    } else {
        return `/appel/${course.date}`
    }
}*/

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