<!--Page de sélection d'un étudiant pour modifier ses informations-->
<template>
  <main class="left">
    <h1>Sélectionner l'étudiant.e à modifier</h1>
    <div id="container">
      <div>
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input class="search-bar" type="search" v-model="searchQuery" placeholder="Rechercher un.e étudiant.e" />
        </div>
        <ul class="list">
          <li v-for="student in filteredStudents" :key="student.studentNumber">
            <RouterLink class="router-link" :to="`/modification/etudiant/${student.studentNumber}`">
              {{ student.name }} {{ student.surname }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <RouterLink id="add-student" class="router-link" :to="`/modification/etudiant/${0}`">Ajouter un.e étudiant.e
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';

const students = ref([])
const searchQuery = ref('')

onMounted(() => {
  fetch('/Students.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      students.value = data.students;
    })
    .catch(error => console.error('Error loading data:', error));
});

const filteredStudents = computed(() =>
  students.value.filter((stu) =>
    stu.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    stu.surname.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
@import url("../shared/shared.css");

#container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  align-items: start;
}

#add-student {
  width: max-content;
}
</style>