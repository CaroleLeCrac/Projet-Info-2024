<template>
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
        <input
          type="text"
          v-model="courseQuery"
          placeholder="Rechercher une matière"
          class="search-bar"
        />
        <select v-model="selectedCourses" multiple> <!-- demander à benj et val s'il existe un autre truc que multiple-->
          <option v-for="course in filteredCourses" :key="course.name" :value="course.name">
            {{ course.name }}
          </option>
        </select>
        <p>Matière sélectionnée: {{ formatSelection(selectedCourses) }}</p>
        <button @click="goToCourseSummaryPage" class="show-selection-btn">
          Afficher le choix : {{ formatSelection(selectedCourses) }}
        </button>
      </div>

      <!-- Section Étudiant -->
      <div class="section">
        <h2>Étudiant</h2>
        <!-- SearchBar pour l'étudiant -->
        <input
          type="text"
          v-model="studentQuery"
          placeholder="Rechercher un étudiant"
          class="search-bar"
        />
        <select v-model="selectedStudent" multiple>
          <option v-for="student in filteredStudents" :key="student.studentNumber" :value="student.surname">
            {{ student.name }} {{ student.surname }} 
          </option>
        </select>
        <!-- Affichage des étudiants sélectionnés avec nom et prénom -->
        <p>Étudiant sélectionné: {{ formatSelection(selectedStudent) }}</p>
        <button @click="goToStudentSummaryPage" class="show-selection-btn">
          Afficher le choix : {{ formatSelection(selectedStudent) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router' // Importer useRouter pour la navigation

// Références pour la sélection des étudiants et des matières
const selectedStudent = ref([])  // Étudiants sélectionnés
const selectedCourses = ref([])  // Matières sélectionnées
const students = ref([])  // Liste des étudiants
const courses = ref([])  // Liste des matières

//barres de recherche
const studentQuery = ref('')  
const courseQuery = ref('')  

// Chargement des étudiants depuis le fichier JSON
onMounted(() => {
  fetch('/ListNamesStu.json')
    .then((response) => response.json())
    .then((data) => {
      students.value = data.students 
    })
    .catch((error) => console.error('Error loading students data:', error))

  // Chargement des matières
  fetch('/ListCourses.json')
    .then((response) => response.json())
    .then((data) => {
      courses.value = data.courses 
    })
    .catch((error) => console.error('Error loading courses data:', error))
})

// formatage des sélections
const formatSelection = (selection) => {
  if (selection.length === 0) {
    return 'Aucune sélection'
  }

  if (selection === selectedStudent.value) {
    return selection.map(studentSurname => {
      const student = students.value.find(s => s.surname === studentSurname); 
      return student ? `${student.name} ${student.surname}` : '';
    }).join(', ');
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

// Fonction pour rediriger vers la page CourseSummaryPage avec la matière sélectionnée
const router = useRouter()  // Utiliser le hook de router pour la navigation

const goToCourseSummaryPage = () => {
  if (selectedCourses.value.length > 0) {
    router.push({ name: 'CourseSummaryPage', params: { course: selectedCourses.value[0] } });
  } else {
    alert("Veuillez sélectionner une matière.");
  }
}

const goToStudentSummaryPage = () => {
  if (selectedStudent.value.length > 0) {
    router.push({ name: 'StudentSummaryPage', params: { student: selectedStudent.value[0] } });
  } else {
    alert("Veuillez sélectionner un étudiant.");
  }
}
</script>

<style scoped>
/* Titre et bouton */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* les boutons Exporter */
.buttons-container {
  display: flex;
  gap: 10px;
}

/* Style pour bouton Exporter */
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

/* Conteneur flex pour aligner les sections côte à côte */
.sections-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* Style de chaque section */
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

h1 {
  font-size: 24px;
  font-weight: bold;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
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
