<!--Page de modification d'un groupe d'étudiant.e.s-->
<template>
  <main class="left">
    <div class="container">
      <!-- Liste des étudiant.e.s du groupe -->
      <div class="left-container">
        <h1>Liste des étudiant.e.s du groupe {{ currentGroupNumber }}</h1>
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input class="search-bar" type="search" v-model="searchQuery1" placeholder="Rechercher un.e étudiant.e" />
        </div>
        <ul class="list">
          <li v-for="student in filteredStudentsInGroup" :key="student.studentNumber" class="students-list">
            <div class="student-list-container">
              <div class="student-info">
                {{ student.surname }} {{ student.name }}
              </div>
              <div class="student-group-number">
                <p>Groupe {{ student.groupNumber }}</p>
              </div>
            </div>
            <button @click="deleteStudent(student)" class="button" id="delete-btn">
              ×
            </button>
          </li>
        </ul>
      </div>

      <!-- Liste des étudiant.e.s extérieur.e.s au groupe -->
      <div class="right-container">
        <h1>Liste des autres étudiant.e.s</h1>
        <div class="search-container">
          <SearchIcon class="search-icon" />
          <input class="search-bar" type="search" v-model="searchQuery2" placeholder="Rechercher un.e étudiant.e" />
        </div>
        <ul class="list">
          <li v-for="student in filteredStudentsOutsideGroup" :key="student.studentNumber" class="students-list">
            <div class="student-list-container">
              <div class="student-info">
                {{ student.surname }} {{ student.name }}
              </div>
              <div class="student-group-number">
                <p>Groupe {{ student.groupNumber }}</p>
              </div>
            </div>
            <button @click="addStudent(student)" class="button" id="add-btn">
              +
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';

const searchQuery1 = ref('');
const searchQuery2 = ref('');

const students = ref([]);
const studentsInGroup = ref([]);  // Liste des étudiant.e.s du groupe
const studentsOutsideGroup = ref([]);  // Liste des étudiant.e.s extérieur.e.s au groupe
const route = useRoute();
const currentGroupNumber = Number(route.params.id);

onMounted(() => {
  fetch('/Groups.json')
    .then(response => response.json())
    .then(data => {
      const groups = data.groups;

      fetch('/Students.json')
        .then((response) => response.json())
        .then((data) => {
          students.value = data.students;

          studentsInGroup.value = students.value.filter(
            (student) => student.groupNumber === currentGroupNumber
          )
          studentsOutsideGroup.value = students.value.filter(
            (student) => student.groupNumber !== currentGroupNumber
          )
        }).catch((error) => console.error('Error loading students data : ', error))
    })
    .catch((error) => console.error('Error loading groups data:', error));
});

const filteredStudentsInGroup = computed(() =>
  studentsInGroup.value.filter(s =>
    s.name.toLowerCase().includes(searchQuery1.value.toLowerCase()) ||
    s.surname.toLowerCase().includes(searchQuery1.value.toLowerCase())
  )
);

const filteredStudentsOutsideGroup = computed(() =>
  studentsOutsideGroup.value.filter(s =>
    s.name.toLowerCase().includes(searchQuery2.value.toLowerCase()) ||
    s.surname.toLowerCase().includes(searchQuery2.value.toLowerCase())
  )
);

function deleteStudent(student) {
  const index = studentsInGroup.value.findIndex(s => s.studentNumber === student.studentNumber);
  if (index !== -1) { // on s'assure que l'étudiant.e est dans la liste
    studentsInGroup.value.splice(index, 1);
    studentsOutsideGroup.value.push(student);
  }
}

function addStudent(student) {
  const index = studentsOutsideGroup.value.findIndex(s => s.studentNumber === student.studentNumber);
  if (index !== -1) {
    studentsOutsideGroup.value.splice(index, 1);
    studentsInGroup.value.push(student);
  }
}

</script>

<style scoped>
@import url("../shared/shared.css");

.container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 2rem;
}

.list {
  width: 80%;
}

.student-list-container {
  margin-bottom: 0;
  font-size: 1.15rem;
}

.students-list {
  list-style-type: none;
  border: solid lightgray;
  background-color: var(--color-6);
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#add-btn {
  color: var(--color-8);
  border-color: var(--color-8);
}

#delete-btn {
  color: var(--color-7);
  border-color: var(--color-7);
}

.button {
  margin: 0;
  padding: 0.3rem;
  font-size: 1.4rem;
  background-color: var(--color-6);
}

.button:hover {
  background-color: var(--color-5);
}
</style>