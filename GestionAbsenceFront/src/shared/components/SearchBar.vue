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
          <SearchBar :placeholder="'Rechercher une matière'" :onSearch="filterCourses" />
          <select v-model="selectedCourses" multiple>
            <option v-for="course in filteredCourses" :key="course.name" :value="course.name">
              {{ course.name }}
            </option>
          </select>
          <p>Matière sélectionnée: {{ formatSelection(selectedCourses) }}</p>
        </div>
  
        <!-- Section Étudiant -->
        <div class="section">
          <h2>Étudiant</h2>
          <!-- SearchBar pour l'étudiant -->
          <SearchBar :placeholder="'Rechercher un étudiant'" :onSearch="filterStudents" />
          <select v-model="selectedStudent" multiple>
            <option v-for="student in filteredStudents" :key="student.studentNumber" :value="student.surname">
              {{ student.surname }}
            </option>
          </select>
          <p>Étudiant sélectionné: {{ formatSelection(selectedStudent) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import SearchBar from './SearchBar.vue'
  
  // Références pour la sélection des étudiants et des matières
  const selectedStudent = ref([])  // Étudiants sélectionnés
  const selectedCourses = ref([])  // Matières sélectionnées
  const students = ref([])  // Liste des étudiants
  const courses = ref([])  // Liste des matières
  
  // Valeurs des barres de recherche
  const studentQuery = ref('')  // Rechercher un étudiant
  const courseQuery = ref('')  // Rechercher une matière
  
  // Chargement des étudiants depuis le fichier JSON
  onMounted(() => {
    // Chargement des étudiants
    fetch('/ListNamesStu.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("Données JSON des étudiants récupérées : ", data)
        students.value = data.students  // Mise à jour des étudiants
      })
      .catch((error) => console.error('Error loading students data:', error))
  
    // Chargement des matières
    fetch('/ListCourses.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("Données JSON des matières récupérées : ", data)
        courses.value = data.courses  // Mise à jour des matières
      })
      .catch((error) => console.error('Error loading courses data:', error))
  })
  
  // Fonction de formatage pour les sélections
  const formatSelection = (selection) => {
    if (selection.length === 0) {
      return 'Aucune sélection'
    }
    return selection.join(', ')
  }
  
  // Filtrer les étudiants en fonction de la barre de recherche
  const filterStudents = (query) => {
    studentQuery.value = query
  }
  
  const filterCourses = (query) => {
    courseQuery.value = query
  }
  
  // Computed pour filtrer les étudiants et les matières
  const filteredStudents = computed(() => {
    return students.value.filter((student) =>
      student.surname.toLowerCase().includes(studentQuery.value.toLowerCase())
    )
  })
  
  const filteredCourses = computed(() => {
    return courses.value.filter((course) =>
      course.name.toLowerCase().includes(courseQuery.value.toLowerCase())
    )
  })
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
  
  /* Style pour chaque bouton Exporter */
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
    background-color: #218838; /* Couleur plus foncée au survol */
  }
  
  /* Conteneur flex pour aligner les sections côte à côte */
  .sections-container {
    display: flex;
    justify-content: space-between;
    gap: 30px; /* espace entre sections */
  }
  
  /* Style de chaque section */
  .section {
    flex: 1;
    padding: 10px;
    min-width: 250px; /* Ajouté pour éviter une largeur trop petite */
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
    width: 100%; /* Occupe toute la largeur de son parent */
    height: 150px; /* Taille de la zone de sélection */
  }
  
  p {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  