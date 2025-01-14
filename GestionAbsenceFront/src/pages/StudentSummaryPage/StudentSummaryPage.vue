<template>
  <div>
    <!-- Titre de l'étudiant -->
    <h1>Absences de l'étudiant : {{ student }}</h1>
    
    <!-- Sélectionner une matière -->
    <h2>Sélectionner une matière</h2>
    <select v-model="selectedCourse" @change="filterAbsences">
      <option value="">Toutes les matières</option> 
      <option v-for="course in courses" :key="course.name" :value="course.name">
        {{ course.name }}
      </option>
    </select>
    
    <!-- Afficher les absences de l'étudiant -->
    <div v-if="filteredAbsences.length > 0">
      <h3>Absences :</h3>
      <ul>
        <li v-for="absence in filteredAbsences" :key="absence.date">
          <strong>{{ absence.coursename }}</strong> : {{ absence.date }}
        </li>
      </ul>
    </div>
    <p v-else>Aucune absence trouvée pour cet étudiant dans cette matière.</p>

    <!-- Bouton pour voir toutes les absences sans filtre -->
    <button @click="showAllAbsences" class="show-all-btn">
      Voir toutes les absences
    </button>

    <!-- Bouton pour exporter les données de l'étudiant -->
    <button v-if="filteredAbsences.length > 0" @click="exportStudentData" class="export-btn">
      Exporter les données de l'étudiant
    </button>
  </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute();
    const student = route.params.student; // Récupérer l'étudiant sélectionné à partir des paramètres de la route

    const selectedCourse = ref('')  // matière sélectionnée
    const studentsabsence = ref([]) // Liste des absences
    const courses = ref([]) // Liste des matières

    // Charger les données des absences et des matières
    onMounted(() => {
      fetch('/ListStudentsAbsence.json')
        .then((response) => response.json())
        .then((data) => {
          studentsabsence.value = data.studentsabsence
        })
        .catch((error) => console.error('Erreur lors du chargement des absences:', error))

      fetch('/ListCourses.json')  
        .then((response) => response.json())
        .then((data) => {
          courses.value = data.courses
        })
        .catch((error) => console.error('Erreur lors du chargement des matières:', error))
    })

    // Filtrer les absences de l'étudiant pour la matière sélectionnée
    const filteredAbsences = computed(() => {
      return studentsabsence.value.filter(absence => {
        const matchesStudent = absence.name === student
        const matchesCourse = !selectedCourse.value || absence.coursename === selectedCourse.value
        return matchesStudent && matchesCourse
      })
    })

    // Fonction pour afficher toutes les absences
    const showAllAbsences = () => {
      selectedCourse.value = ''; 
    }

    // Fonction pour exporter les données en csv
    const exportStudentData = () => {
      const headers = ['Matière', 'Date de l\'absence']
      const rows = filteredAbsences.value.map(absence => [
        absence.coursename,
        absence.date
      ])

      // Création du fichier CSV
      let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(row => row.join(",")).join("\n");

      // Création d'un lien pour télécharger le fichier CSV
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${student}_absences.csv`);
      document.body.appendChild(link);
      link.click();  // Simule un clic pour déclencher le téléchargement
    }

    return {
      student,
      selectedCourse,
      courses,
      filteredAbsences,
      showAllAbsences,
      exportStudentData
    }
  }
}
</script>


<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
}

h2 {
  font-size: 18px;
  margin-top: 20px;
}

select {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  height: 40px;
}

ul {
  list-style-type: none;
}

li {
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
}

p {
  font-size: 16px;
}

.show-all-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.show-all-btn:hover {
  background-color: #0056b3;
}

.export-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.export-btn:hover {
  background-color: #218838;
}
</style>
