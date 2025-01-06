<!--Page de sélection du créneau-->
<template>
    <h1>Créneau</h1>
    <DateBar @dateChanged="updateSelectedDate"/>
    <div> 
        <select v-model="selectedCourse" multiple>
            <option v-for="course in filteredCoursesByDate" :key="course.date" :value="course.coursename">
                {{ course.date }} {{ course.name }} {{ course.coursename }}
            </option>
        </select>
        <p>Créneau sélectionné: {{ formatSelection(selectedCourse) }}</p>
        <button @click="goToCourseCall" class="selection-btn">
            Afficher le choix : {{ formatSelection(selectedCourse) }}
        </button>
    </div>
</template>

<script setup>

import DateBar from './DateBar.vue';
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const selectedCourse = ref([])
const courses = ref([])
const profesionals = ref([])
const selectedDate = ref(new Date());

const route = useRoute();
const currentProfesional = ref(route.params.profesional);

const router = useRouter()

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

const formatSelection = (selection) => {
    if (selection.length === 0) {
        return 'Aucune sélection'
    }

    if (selection === selectedCourse.value) {
        return selection.map(CourseName => {
            const course = courses.value.find(c => c.coursename === CourseName);
            return course ? `${course.date} ${course.name} ${course.coursename}`: '';
        }).join(', ');
    }

    return selection.join(', ');
}

//filtre des cours du profesionnel sélectionné seulement
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

const goToCourseCall = () => {
    if (selectedCourse.value.length > 0) {
        router.push({ name: 'CourseCallPage', params: { course: selectedCourse.value[0]}});
    }
    else {
        alert("Veuillez sélectionner un créneau.");
    }
}

</script>

<style scoped>
.selection-btn {
    background-color: lightgray;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.selection-btn:hover {
    background-color: gray; 
}

</style>