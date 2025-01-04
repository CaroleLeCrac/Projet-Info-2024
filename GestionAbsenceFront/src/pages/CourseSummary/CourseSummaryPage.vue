<template>
  <div>
    <!-- Titre de la matière -->
    <h1>Absences pour la matière : {{ course }}</h1>

    <!-- Sélectionner un ou plusieurs étudiants -->
    <h2>Sélectionner un ou plusieurs étudiants</h2>
    <select v-model="selectedStudents" @change="filterAbsences" multiple>
      <option v-for="student in filteredStudents" :key="student" :value="student">
        {{ student }}
      </option>
    </select>

    <!-- Sélectionner une date spécifique -->
    <h2>Sélectionner une date spécifique</h2>
    <div v-if="filteredDates.length > 0">
      <ul>
        <li v-for="date in filteredDates" :key="date" @click="selectDate(date)" class="date-option">
          {{ date }}
        </li>
      </ul>
    </div>
    <p v-else>Aucune date disponible pour cette matière.</p>

    <!-- Afficher les absences -->
    <div v-if="filteredAbsences.length > 0">
      <h3>Absences :</h3>
      <ul>
        <li v-for="absence in filteredAbsences" :key="absence.date">
          <strong>{{ absence.name }}</strong> :  {{ absence.date }}
        </li>
      </ul>
    </div>
    <p v-else>Aucune absence trouvée pour cette sélection.</p>

    <!-- Bouton pour voir toutes les absences -->
    <button @click="showAllAbsences" class="show-all-btn">
      Voir toutes les absences
    </button>

    <!-- Bouton pour exporter les données de la matière -->
    <button v-if="filteredAbsences.length > 0" @click="exportCourseData" class="export-btn">
      Exporter les données de la matière
    </button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute();
    const course = route.params.course; // Récupérer la matière à partir des paramètres de la route

    const selectedStudents = ref([])  // Les étudiants sélectionnés
    const selectedDate = ref('')  // La date sélectionnée
    const studentsabsence = ref([]) // Liste des absences
    const allDates = ref([]) // Liste de toutes les dates disponibles

    // Charger les données des absences et des dates
    onMounted(() => {
      fetch('/ListStudentsAbsence.json') 
        .then((response) => response.json())
        .then((data) => {
          studentsabsence.value = data.studentsabsence 
        })
        .catch((error) => console.error('Erreur lors du chargement des absences:', error))

      fetch('/ListDates.json')
        .then((response) => response.json())
        .then((data) => {
          allDates.value = data.coursedates 
        })
        .catch((error) => console.error('Erreur lors du chargement des dates:', error))
    })

    // Fonction pour formater correctement les dates sans décalage horaire
    const formatDate = (date) => {
      const d = new Date(date);
      // Utilisation de toLocaleDateString pour obtenir la date au format "YYYY-MM-DD"
      return d.toLocaleDateString('en-CA'); // Format ISO "YYYY-MM-DD"
    }

    // Filtrer les absences en fonction de la matière, des étudiants et dates
    const filteredAbsences = computed(() => {
      return studentsabsence.value.filter(absence => {
        const matchesCourse = absence.coursename === course;
        const matchesStudent = selectedStudents.value.length === 0 || selectedStudents.value.includes(absence.name);
        const matchesDate = !selectedDate.value || formatDate(absence.date) === selectedDate.value;
        return matchesCourse && matchesStudent && matchesDate;
      });
    });

    // Filtrer les étudiants
    const filteredStudents = computed(() => {
      const studentsInCourse = new Set(
        studentsabsence.value.filter(absence => absence.coursename === course)
                              .map(absence => absence.name)
      );
      return [...studentsInCourse];
    });

    // Filtrer les dates
    const filteredDates = computed(() => {
      return Array.from(new Set(
        studentsabsence.value
          .filter(absence => absence.coursename === course)
          .map(absence => formatDate(absence.date))
      ));
    });

    // Fonction pour sélectionner une date
    const selectDate = (date) => {
      selectedDate.value = date;  
      filterAbsences();
    };

    // Fonction pour réinitialiser tous les filtres
    const showAllAbsences = () => {
      selectedStudents.value = [] 
      selectedDate.value = ''
    }

    // Fonction pour exporter les données en CSV
    const exportCourseData = () => {
      const headers = ['Étudiant', 'Date de l\'absence', 'Cours'];
      const rows = filteredAbsences.value.map(absence => [
        absence.name,
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
      link.setAttribute("download", `${course}_absences.csv`);
      document.body.appendChild(link);
      link.click();  // Simule un clic pour déclencher le téléchargement
    }

    return {
      course,
      selectedStudents,
      selectedDate,
      filteredAbsences,
      filteredStudents,
      filteredDates,
      showAllAbsences,
      exportCourseData,
      selectDate
    };
  }
};
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
  padding-left: 0;
}

li {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f0f0f0;
}

strong {
  font-weight: bold;
}

p {
  font-size: 16px;
}

/* Style pour le bouton Voir toutes les absences */
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

/* Style pour le bouton Exporter */
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

.date-option {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.date-option:hover {
  background-color: #f0f0f0;
}
</style>
