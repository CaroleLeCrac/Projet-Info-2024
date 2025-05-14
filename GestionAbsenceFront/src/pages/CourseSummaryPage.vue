<!--Page de récapitulatif des absences par matière-->
<template>
  <main class="left">
    <h1>Récapitulatif des absences pour la matière : {{ courseName }}</h1>

    <div class="sections-container">

      <div class="section" id="left-section">
        <!-- Affichage des absences -->
        <h2>Absences :</h2>
        <!-- Bouton pour voir toutes les absences -->
        <button @click="showAllAbsences" class="button" id="show-all-absences-btn">
          Voir toutes les absences
        </button>

        <!-- Bouton pour exporter les données de la matière -->
        <button v-if="filteredAbsences.length > 0" @click="exportCourseData" class="button" id="export-btn">
          Exporter les données de la matière
        </button>

        <ul v-if="filteredAbsences.length > 0" class="list" id="absences-list">
          <li v-for="absence in filteredAbsences" :key="absence.student.id + absence.date">
            <strong>{{ absence.student.name }}</strong> : {{ formatDate(absence.date) }}
          </li>
        </ul>
        <p v-else>Aucune absence trouvée pour cette sélection.</p>
      </div>

      <div class="section" id="right-section">
        <!-- Sélectionner un ou plusieurs étudiants -->
        <h2>Sélectionner un.e ou plusieurs étudiant.e.s</h2>
        <ul v-if="students.length > 0" class="checkbox-list">
          <li v-for="student in students" :key="student.student_number">
            <div class="list-container">
              <input class="checkbox" type="checkbox" :value="student" v-model="selectedStudents">
              <label for="student.surname">{{ student.name }}</label>
            </div>
          </li>
        </ul>
        <p v-else>Aucun.e étudiant.e absent.e dans cette matière</p>

        <!--Filtrage par date non utile
        Sélectionner une date spécifique
        <h2 id="select-date">Sélectionner une ou plusieurs date.s</h2>
        <ul v-if="filteredDates.length > 0" class="checkbox-list">
          <li v-for="date in filteredDates" :key="date">
            <div class="list-container">
              <input class="checkbox" type="checkbox" :value="date" v-model="selectedDates">
              <label for="date">{{ date }}</label>
            </div>
          </li>
        </ul>
        <p v-else>Aucune date disponible pour cette matière.</p>
      -->
      </div>
    </div>

  </main>
</template>

<script setup>
import { getStudentsAbsenceByCourse } from '@/shared/fetchers/presence';
import { getStudentsBySemesterCourse } from '@/shared/fetchers/students';
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute();
const courseId = Number(route.params.courseId); // Récupérer l'id de la matière à partir des paramètres de la route
const courseName = route.params.courseName;

const students = ref([]);
const selectedStudents = ref([])  // Les étudiants sélectionnés
//const selectedDates = ref([])  // Liste des dates sélectionnées NON UTILE car on ne filtre pas par date
const absencesList = ref([]) // Liste des absences composée de l'étudiant et de la date (plusieurs fois le même étudiant si plusieurs absences)

// Charger les données des absences et des dates
onMounted(async () => {
  absencesList.value = await getStudentsAbsenceByCourse(courseId);
  students.value = await getStudentsBySemesterCourse(courseId);
})

function formatDate(date) {
  const dateFormat = new Date(date);
  const day = String(dateFormat.getDate()).padStart(2, '0');
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
  const year = dateFormat.getFullYear();
  return `${day}-${month}-${year}`;
}

// Filtrer les absences en fonction de la matière, des étudiants et dates
const filteredAbsences = computed(() => {
  return absencesList.value.filter(absence => {
    const matchesStudents = selectedStudents.value.length === 0 || selectedStudents.value.some(student => student.id === absence.student.id);
    return matchesStudents;
  });
});

/* Filtrer les dates pour la section de filtrage par date
const filteredDates = computed(() => {
  return Array.from(new Set(
    absencesList.value
      .filter(absence => absence.coursename === courseId)
      .map(absence => formatDate(absence.date))
  ));
});*/

// Fonction pour réinitialiser tous les filtres
function showAllAbsences() {
  selectedStudents.value = []
  //selectedDates.value = [] Non utile car filtrage par date non utilisé
}

// Fonction pour exporter les données en CSV
function exportCourseData() {
  const headers = ['Numéro étudiant', 'Étudiant.e', 'Date de l\'absence'];
  const rows = absencesList.value.map(absence => [
    absence.student.student_number,
    absence.student.name,
    formatDate(absence.date)
  ]);

  // Création du fichier CSV
  let csvContent = "data:text/csv;charset=utf-8,"
    + headers.join(",") + "\n"
    + rows.map(row => row.join(",")).join("\n");

  // Création d'un lien pour télécharger le fichier CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${courseName}_absences.csv`);
  document.body.appendChild(link);
  link.click();  // Simule un clic pour déclencher le téléchargement
}

</script>

<style scoped>
@import url("../shared/shared.css");

.button {
  margin-top: 0;
}

#select-date {
  margin-top: 2rem;
}

.checkbox-list {
  list-style-type: none;
  font-size: 0.75rem;
  padding-left: 1rem;
  margin: 0;
  width: 70%;
}

.checkbox-list>li {
  background-color: var(--color-6);
  border-radius: 5px;
  padding-left: 0.75rem;
}

.checkbox {
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

.checkbox:hover {
  background-color: var(--color-1);
}

.checkbox:checked {
  background-color: var(--color-1);
}

.checkbox:checked::after {
  content: '✓';
  display: block;
  text-align: center;
  font-size: 16px;
  color: var(--color-6);
  font-weight: bold;
}
</style>