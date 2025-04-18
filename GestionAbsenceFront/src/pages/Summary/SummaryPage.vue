<template>
  <main class="left">
    <!-- Conteneur pour les boutons "Exporter" -->
    <div class="buttons-container">
      <button class="button">Exporter les absences des L1</button>
      <button class="button">Exporter les absences des L2</button>
      <button class="button">Exporter les absences des L3</button>
    </div>

    <h1>Sélectionner la matière ou l'étudiant.e</h1>

    <div class="sections-container">

      <!-- Section Matière -->
      <div class="section">
        <h2>Matières</h2>
        <!-- SearchBar pour la matière -->
        <input type="search" v-model="courseQuery" placeholder="Rechercher une matière" class="search-bar" />
        <ul class="list">
          <li v-for="course in filteredCourses">
            <label>
              <RouterLink :to="`/recapitulatifs/matiere/${course.name}`" class="router-link">
                {{ course.name }}
              </RouterLink>
            </label>
          </li>
        </ul>
      </div>

      <!-- Section Étudiant -->
      <div class="section">
        <h2>Étudiant.e.s</h2>
        <!-- SearchBar pour l'étudiant -->
        <input type="search" v-model="studentQuery" placeholder="Rechercher un.e étudiant.e" class="search-bar" />
        <ul class="list">
          <li v-for="student in filteredStudents">
            <label>
              <RouterLink :to="`/recapitulatifs/etudiant/${student.studentNumber}`" class="router-link">
                {{ student.name }} {{ student.surname }}
              </RouterLink>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Références pour la sélection des étudiants, matières et absences
const students = ref([]);  // Liste des étudiants
const courses = ref([]);  // Liste des matières

// Barres de recherche
const studentQuery = ref('');
const courseQuery = ref('');

// Chargement des données
onMounted(() => {
  // Chargement des étudiants depuis le fichier JSON
  fetch('/ListNamesStu.json')
    .then((response) => response.json())
    .then((data) => {
      students.value = data.students
      console.log('Étudiants chargés:', students.value);
    })
    .catch((error) => console.error('Erreur de chargement des étudiants:', error))

  // Chargement des matières
  fetch('/ListCourses.json')
    .then((response) => response.json())
    .then((data) => {
      courses.value = data.courses
      console.log('Matières chargées:', courses.value);
    })
    .catch((error) => console.error('Erreur de chargement des matières:', error))
})

// Filtrer les étudiants barre de recherche
const filteredStudents = computed(() => {
  return students.value.filter((student) =>
    (student.name + ' ' + student.surname).toLowerCase().includes(studentQuery.value.toLowerCase())
  )
})

// Filtrer les matières barre de recherche
const filteredCourses = computed(() => {
  return courses.value.filter((course) =>
    course.name.toLowerCase().includes(courseQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
@import url("../../shared/shared.css");

.buttons-container {
  display: flex;
  justify-content: left;
  gap: 3rem;
  margin: 2rem auto;
  width: 100%;
}

.button {
  margin-top: 0;
}

.list {
  width: max-content;
}
</style>