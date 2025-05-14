<!--Page de récapitulatif des absences par étudiant.e-->
<template>
  <main class="left" v-if="student">
    <h1>Récapitulaif des absences de {{ student.name }}</h1>

    <div class="sections-container">

      <div class="section" id="left-section">
        <!-- Afficher les absences de l'étudiant -->
        <h2>Absences :</h2>
        <!-- Bouton pour voir toutes les absences sans filtre -->
        <button @click="showAllAbsences" class="button" id="show-all-absences-btn">
          Voir toutes les absences
        </button>

        <!-- Bouton pour exporter les données de l'étudiant -->
        <button v-if="filteredAbsences.length > 0" @click="exportStudentData" class="button" id="export-absences-btn">
          Exporter les absences de l'étudiant.e
        </button>

        <ul v-if="filteredAbsences.length > 0" class="list" id="absences-list">
          <li v-for="absence in filteredAbsences" :key="absence.student.id + absence.date">
            <strong>{{ absence.courseName }}</strong> : {{ formatDate(absence.date) }}
          </li>
        </ul>
        <p v-else>Aucune absence trouvée pour cette sélection.</p>
      </div>

      <div class="section" id="right-section">
        <!-- Sélectionner une matière -->
        <h2>Sélectionner une ou plusieurs matière.s</h2>
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input class="search-bar" type="search" v-model="searchQueryCourse" placeholder="Rechercher une matière">
        </div>
        <ul class="list-courses">
          <li v-for="course in filteredCourses" :key="course.id" :value="course.id">
            <div class="list-container">
              <input type="checkbox" class="checkbox-course" :value="course.id" v-model="selectedCourses">
              <label for="course.name">{{ course.name }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getStudentById } from '@/shared/fetchers/students';
import { getStudentAbsencesById } from '@/shared/fetchers/presence';
import { getCoursesByStudent } from '@/shared/fetchers/course_material';

const route = useRoute();
const studentId = Number(route.params.studentId); // Récupérer le num de l'étudiant sélectionné à partir des paramètres de la route
const student = ref(null);

const selectedCourses = ref([])  // Liste matières sélectionnées
const absencesList = ref([]) // Liste des absences
const courses = ref([]) // Liste des matières

// Charger les données des absences et des matières
onMounted(async () => {
  student.value = await getStudentById(studentId);
  absencesList.value = await getStudentAbsencesById(studentId);
  courses.value = await getCoursesByStudent(studentId);
})

function formatDate(date) {
  const dateFormat = new Date(date);
  const day = String(dateFormat.getDate()).padStart(2, '0');
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
  const year = dateFormat.getFullYear();
  return `${day}-${month}-${year}`;
}

const searchQueryCourse = ref('');

const filteredCourses = computed(() =>
  courses.value.filter(c =>
    c.name.toLowerCase().includes(searchQueryCourse.value.toLowerCase())
  ));

// Filtrer les absences de l'étudiant pour les matières sélectionnées
const filteredAbsences = computed(() => {
  if (!student.value) return [] // Vérifier que student est chargé

  return absencesList.value.filter(absence => {
    return selectedCourses.value.length === 0 || selectedCourses.value.includes(absence.courseId);
  })
})

// Fonction pour afficher toutes les absences
function showAllAbsences() {
  selectedCourses.value = [];
}

// Fonction pour exporter les données en csv
function exportStudentData() {
  const headers = ['Matière', 'Type de séance', 'Date de l\'absence']
  const rows = absencesList.value.map(absence => [
    absence.courseName,
    absence.courseType,
    formatDate(absence.date)
  ])

  // Regroupement des absences pas matière et par type de séance pour avoir les totaux
  const absenceCountByCourseType = {};
  absencesList.value.forEach(abs => {
    const key = `${abs.courseName}|||${abs.courseType}`;
    if (!absenceCountByCourseType[key]) {
      absenceCountByCourseType[key] = 0;
    }
    absenceCountByCourseType[key]++;
  });

  const totalHeader = ['Matière', 'Type de séance', 'Nombre total d\'absences de l\étudiant.e'];
  const totals = Object.entries(absenceCountByCourseType).map(([key, count]) => {
    const [courseName, courseType] = key.split('|||');
    return [courseName, courseType, count];
  });

  // Création du fichier CSV
  let csvContent = "data:text/csv;charset=utf-8,"
    + headers.join(",") + "\n"
    + rows.map(row => row.join(",")).join("\n")
    + "\n\n" + totalHeader.join(",") + "\n"
    + totals.map(row => row.join(",")).join("\n");

  // Création d'un lien pour télécharger le fichier CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${student.value?.name.replace(/\s+/g, '_')}_absences.csv`);
  document.body.appendChild(link);
  link.click();  // Simule un clic pour déclencher le téléchargement
}
</script>


<style scoped>
@import url("../shared/shared.css");

.button {
  margin-top: 0;
}

.list-courses {
  list-style-type: none;
  font-size: 0.75rem;
  padding-left: 1rem;
  margin: 0;
  width: 70%;
}

.list-courses>li {
  background-color: var(--color-6);
  border-radius: 5px;
  padding-left: 0.75rem;
}

.checkbox-course {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--color-5);
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
}

.checkbox-course:hover {
  background-color: var(--color-1);
}

.checkbox-course:checked {
  background-color: var(--color-1);
}

.checkbox-course:checked::after {
  content: '✓';
  display: block;
  text-align: center;
  font-size: 16px;
  color: var(--color-6);
  font-weight: bold;
}
</style>