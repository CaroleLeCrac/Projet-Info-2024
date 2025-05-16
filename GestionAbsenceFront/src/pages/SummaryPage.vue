<!--Page de sélection de la matière ou de l'étudiant.e pour accéder au récapitulatif des absences-->

<template>
  <main class="left">
    <!-- Conteneur pour les boutons "Exporter" -->
    <div class="buttons-container">
      <button class="button" @click="exportAbsL1">Exporter les absences des L1</button>
      <button class="button" @click="exportAbsL2">Exporter les absences des L2</button>
      <button class="button" @click="exportAbsL3">Exporter les absences des L3</button>
    </div>

    <h1>Sélectionner la matière ou l'étudiant.e</h1>

    <div class="sections-container">

      <!-- Section Matière -->
      <div class="section">
        <h2>Matières</h2>
        <!-- SearchBar pour la matière -->
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input type="search" v-model="courseQuery" placeholder="Rechercher une matière" class="search-bar" />
        </div>
        <ul class="list">
          <li v-for="course in filteredCourses">
            <label>
              <RouterLink :to="`/recapitulatifs/matiere/${course.name}/${course.id}`" class="router-link">
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
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input type="search" v-model="studentQuery" placeholder="Rechercher un.e étudiant.e" class="search-bar" />
        </div>
        <ul class="list">
          <li v-for="student in filteredStudents">
            <label>
              <RouterLink :to="`/recapitulatifs/etudiant/${student.id}`" class="router-link">
                {{ student.name }}
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
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getAllStudents } from '@/shared/fetchers/students';
import { getAllCourses } from '@/shared/fetchers/course_material';
import { getAbsenceByYear } from '@/shared/fetchers/presence';

// Références pour la sélection des étudiants, matières et absences
const students = ref([]);  // Liste des étudiants
const courses = ref([]);  // Liste des matières

// Barres de recherche
const studentQuery = ref('');
const courseQuery = ref('');

// Chargement des données
onMounted(async () => {
  students.value = await getAllStudents();
  courses.value = await getAllCourses();
})

// Filtrer les étudiants barre de recherche
const filteredStudents = computed(() => {
  return students.value.filter((student) =>
    student.name.toLowerCase().includes(studentQuery.value.toLowerCase())
  )
})

// Filtrer les matières barre de recherche
const filteredCourses = computed(() => {
  return courses.value.filter((course) =>
    course.name.toLowerCase().includes(courseQuery.value.toLowerCase())
  )
})

function formatDate(date) {
  const dateFormat = new Date(date);
  const day = String(dateFormat.getDate()).padStart(2, '0');
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
  const year = dateFormat.getFullYear();
  return `${day}-${month}-${year}`;
}

function generateCSV(abs, filename) {
  const headers = ['Cours', 'Date', 'Numéro étudiant', 'Nom et Prénom'];
  const rows = abs.map(abs => [
    `${abs.session_type} ${abs.course_material}`,
    formatDate(abs.date),
    abs.student_number,
    abs.name
  ]);

  const csvContent = "data:text/csv;charset=utf-8,"
    + headers.join(',') + "\n"
    + rows.map(row => row.join(',')).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
}

async function exportAbsL1() {
  const absences = await getAbsenceByYear(1);
  if (!absences || !Array.isArray(absences)) {
    alert("Erreur : les absences sont introuvables.");
    return;
  }
  generateCSV(absences, 'Absences_L1_MIASHS.csv');
}

async function exportAbsL2() {
  const absences = await getAbsenceByYear(2);
  if (!absences || !Array.isArray(absences)) {
    alert("Erreur : les absences sont introuvables.");
    return;
  }
  generateCSV(absences, 'Absences_L2_MIASHS.csv');
}

async function exportAbsL3() {
  const absences = await getAbsenceByYear(3);
  if (!absences || !Array.isArray(absences)) {
    alert("Erreur : les absences sont introuvables.");
    return;
  }
  generateCSV(absences, 'Absences_L3_MIASHS.csv');
}
</script>

<style scoped>
@import url("../shared/shared.css");

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