<!--Page de sélection d'un étudiant pour modifier ses informations-->
<script setup>
import { ref, onMounted, computed } from 'vue'

const students = ref([])
const searchQuery = ref('')

  onMounted(() => {
    fetch('/ListNamesStu.json')
    .then((response)=>response.json())
    .then ((data)=> {
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

<template>
  <input type="text" v-model="searchQuery" placeholder="Rechercher un étudiant" class="search-bar"/>
<div class="page-display">
  <ul class="student-list">
    <li v-for="student in filteredStudents" :key="student.studentNumber">
      <label class="container">
      <RouterLink class="router-link" :to="`/modification/etudiant/${student.studentNumber}`">{{ student.name }} {{ student.surname }}</RouterLink>
    </label>
    </li>
  </ul>
  <div class="add-student-button">
<RouterLink class="router-link" :to="`/modification/etudiant/${0}`">Ajouter un étudiant</RouterLink>
</div>
</div>
</template>

<style scoped>
.page-display{
  display: flex;
  justify-content: space-between;
  gap:20px;
}

.student-list{
  display : flex; 
  flex-direction: column;
  width: 40%;
  list-style-type: none;
  padding-left: 0;
}

.container{
  display : block;
    position :relative; 
    margin-bottom: -1px;
    font-size: 16px;
    user-select: none;
}

.router-link{
  display: block;
  text-decoration: none; 
  border-radius: 5px;
  color: black; 
  cursor: pointer; 
  font-size: 16px; 
  padding: 8px 10px; 
  width: 100%;
  border: 2px solid black;
  box-sizing: border-box;
}

.router-link:hover{
  background-color: rgba(255,140,0,0.9);
  color: white;
}

.add-student-button{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  margin-top: 14px;
}

.search-bar{
  width: 30%;
  height: 30px;
  border-radius: 5px;
}

</style>
