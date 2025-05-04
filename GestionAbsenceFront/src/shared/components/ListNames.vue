<!--Composant non utilisé-->
<!--Composant de liste d'étudiant.e.s-->
<template>
  <h2>Liste de Noms</h2>
  <select v-model="multiSelected" multiple style="width:500px">
    <option v-for="student in students" :key="student.studentNumber">
      {{ student.surname }}
    </option>
  </select>
  <p>Selected: {{ multiSelected }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const multiSelected = ref([])
const students = ref([])


onMounted(() => {
  fetch('/Students.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      students.value = data.students;
    })
    .catch(error => console.error('Error loading data:', error));
});

</script>