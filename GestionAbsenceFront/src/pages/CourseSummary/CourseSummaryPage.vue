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
          <li v-for="absence in filteredAbsences" :key="absence.date">
            <strong>{{ absence.studentName }}</strong> : {{ absence.date }}
          </li>
        </ul>
        <p v-else>Aucune absence trouvée pour cette sélection.</p>
      </div>

      <div class="section" id="right-section">
        <!-- Sélectionner un ou plusieurs étudiants -->
        <h2>Sélectionner un.e ou plusieurs étudiant.e.s</h2>
        <ul v-if="filteredStudents.length > 0" class="checkbox-list">
          <li v-for="student in filteredStudents" :key="student.studentNumber">
            <div class="list-container">
              <input class="checkbox" type="checkbox" :value="student" v-model="selectedStudents">
              <label for="student.surname">{{ student.name }} {{ student.surname }} </label>
            </div>
          </li>
        </ul>
        <p v-else>Aucun.e étudiant.e absent.e dans cette matière</p>

        <!-- Sélectionner une date spécifique -->
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
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute();
const courseName = route.params.id; // Récupérer le nom de la matière à partir des paramètres de la route

const students = ref([]); 
const selectedStudents = ref([])  // Les étudiants sélectionnés
const selectedDates = ref([])  // Liste des dates sélectionnées
const absencesList = ref([]) // Liste des absences
const allDates = ref([]) // Liste de toutes les dates disponibles

// Charger les données des absences et des dates
onMounted(() => {
  fetch('/ListStudentsAbsence.json')
    .then((response) => response.json())
    .then((data) => {
      absencesList.value = data.studentsAbsence
    })
    .catch((error) => console.error('Erreur lors du chargement des absences:', error))

  fetch('/ListDates.json')
    .then((response) => response.json())
    .then((data) => {
      allDates.value = data.coursedates
    })
    .catch((error) => console.error('Erreur lors du chargement des dates:', error))

  fetch('/ListNamesStu.json')
    .then((response) => response.json())
    .then((data) => {
      students.value = data.students
    })
    .catch((error) => console.error("Erreur lors du chargement des étudiants:", error))
})
// Fonction pour formater correctement les dates
function formatDate(date) {
  const d = new Date(date);
  // Utilisation de toLocaleDateString pour obtenir la date au format "YYYY-MM-DD"
  return d.toLocaleDateString('en-CA');
}

// Filtrer les absences en fonction de la matière, des étudiants et dates
const filteredAbsences = computed(() => {
  return absencesList.value.filter(absence => {
    const matchesCourse = absence.coursename === courseName;
    const matchesStudents = selectedStudents.value.length === 0 || selectedStudents.value.some(student => student.surname === absence.surname);
    const matchesDate = selectedDates.value.length === 0 || selectedDates.value.includes(formatDate(absence.date));

    if (matchesCourse && matchesStudents && matchesDate) { //pour avoir le student.name
      const student = students.value.find(s => s.surname === absence.surname);
      absence.studentName = student ? `${student.name} ${student.surname}` : absence.surname;
    }
    return matchesCourse && matchesStudents && matchesDate;
  });
});

// Filtrer les étudiants
const filteredStudents = computed(() => {
  const surnamesInCourse = new Set(
    absencesList.value.filter(absence => absence.coursename === courseName)
      .map(absence => absence.surname)
  );
  
  return students.value.filter(student =>
    surnamesInCourse.has(student.surname)
  );
});

// Filtrer les dates
const filteredDates = computed(() => {
  return Array.from(new Set(
    absencesList.value
      .filter(absence => absence.coursename === courseName)
      .map(absence => formatDate(absence.date))
  ));
});

// Fonction pour réinitialiser tous les filtres
function showAllAbsences() {
  selectedStudents.value = []
  selectedDates.value = []
}

// Fonction pour exporter les données en CSV
function exportCourseData() {
  const headers = ['Étudiant', 'Date de l\'absence', 'Matière'];
  const rows = filteredAbsences.value.map(absence => [
    absence.studentName,
    absence.date,
    absence.coursename
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
@import url("../../shared/shared.css");

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