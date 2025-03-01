<template>
  <main>
    <div>
      <!-- Titre avec les boutons -->
      <div class="header">
        <h1>Sélectionner la matière ou l'étudiant</h1>

        <!-- Conteneur pour les boutons "Exporter" -->
        <div class="buttons-container">
          <button class="export-btn">Exporter les absences des L1</button>
          <button class="export-btn">Exporter les absences des L2</button>
          <button class="export-btn">Exporter les absences des L3</button>
        </div>
      </div>
 
      <div class="sections-container">
        <!-- Section Matière -->
        <div class="section">
          <h2>Matière</h2>
          <!-- SearchBar pour la matière -->
          <input type="text" v-model="courseQuery" placeholder="Rechercher une matière" class="search-bar" />
          <select v-model="selectedCourses" multiple>
            <!-- demander à benj et val s'il existe un autre truc que multiple-->
            <option v-for="course in filteredCourses" :key="course.name" :value="course.name">
              {{ course.name }}
            </option>
          </select>
          <p>Matière sélectionnée: {{ formatSelection(selectedCourses) }}</p>
          <RouterLink v-if="selectedCourses.length" class="router-link" :to="`/recapitulatifs/matiere/${selectedCourses[0]}`">{{
            selectedCourses[0] }}</RouterLink>
        </div>

        <!-- Section Étudiant -->
        <div class="section">
          <h2>Étudiant</h2>
          <!-- SearchBar pour l'étudiant -->
          <input type="text" v-model="studentQuery" placeholder="Rechercher un étudiant" class="search-bar" />
          <select v-model="selectedStudent" multiple>
            <option v-for="student in filteredStudents" :key="student.studentNumber" :value="student.surname">
              {{ student.name }} {{ student.surname }}
            </option>
          </select>
          <p>Étudiant sélectionné: {{ formatSelection(selectedStudent) }}</p>
          <RouterLink v-if="selectedStudent.length" class="router-link" :to="`/recapitulatifs/etudiant/${selectedStudent[0]}`">{{
            selectedStudent[0] }}</RouterLink>
        </div>
      </div>

      <!-- Section des absences -->
      <div class="absences-container" v-if="filteredAbsences.length > 0">
        <h2>Absences</h2>
        <table>
          <thead>
            <tr>
              <th>Nom de l'étudiant</th>
              <th>Matière</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="absence in filteredAbsences" :key="absence.date + absence.name">
              <td>{{ absence.name }}</td>
              <td>{{ absence.coursename }}</td>
              <td>{{ absence.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Références pour la sélection des étudiants, matières et absences
const selectedStudent = ref([])  // Étudiants sélectionnés
const selectedCourses = ref([])  // Matières sélectionnées
const students = ref([])  // Liste des étudiants
const courses = ref([])  // Liste des matières
const absences = ref([])  // Liste des absences

// Barres de recherche
const studentQuery = ref('')
const courseQuery = ref('')

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

  // Chargement des absences
  fetch('/ListStudentsAbsence.json')
    .then((response) => response.json())
    .then((data) => {
      absences.value = data.studentsabsence
      console.log('Absences chargées:', absences.value);
    })
    .catch((error) => console.error('Erreur de chargement des absences:', error))
})

// Formatage des sélections
const formatSelection = (selection) => {
  if (selection.length === 0) {
    return 'Aucune sélection';
  }
  return selection.join(', ');
}

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

// Filtrer les absences selon les critères
const filteredAbsences = computed(() => {
  return absences.value.filter((absence) => {
    const matchesStudent = selectedStudent.length === 0 || selectedStudent.value.includes(absence.name);
    const matchesCourse = selectedCourses.length === 0 || selectedCourses.value.includes(absence.coursename);
    return matchesStudent && matchesCourse;
  })
})
</script>

<style scoped>
@import url("../../shared/shared.css");

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  gap: 10px;
}

.export-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.export-btn:hover {
  background-color: #218838;
}

.sections-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.section {
  flex: 1;
  padding: 10px;
  min-width: 250px;
}

.search-bar {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
}

select {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  height: 150px;
}

p {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

.show-selection-btn {
  background-color: lightgray;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.show-selection-btn:hover {
  background-color: gray;
}
</style>