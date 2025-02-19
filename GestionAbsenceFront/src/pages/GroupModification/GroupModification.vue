<!--Page de modification d'un groupe d'étudiants-->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const students = ref([]);
const addList = ref([]);  // Liste des étudiants à ajouter
const deleteList = ref([]);  // Liste des étudiants à supprimer
const route = useRoute();
const currentGroupNumber = route.params.id;

onMounted(() => {
  fetch('/ListNamesStu.json')
    .then((response) => response.json())
    .then((data) => {
      console.log("Données JSON récupérées : ", data);
      students.value = data.students || [];
      addList.value = students.value.filter(
        (student) => student.groupNumber !== Number(currentGroupNumber)
      )
      deleteList.value = students.value.filter(
        (student) => student.groupNumber === Number(currentGroupNumber)
      )
    })
    .catch((error) => console.error('Error loading data:', error));
});



// Fonction pour déplacer un étudiant de addList à deleteList
const toggleAddToDelete = (student) => {
  // Enlever de la liste d'ajout
  addList.value = addList.value.filter(s => s.studentNumber !== student.studentNumber);
  // Ajouter à la liste de suppression
  deleteList.value.push(student);
};

// Fonction pour déplacer un étudiant de deleteList à addList
const toggleDeleteToAdd = (student) => {
  // Enlever de la liste de suppression
  deleteList.value = deleteList.value.filter(s => s.studentNumber !== student.studentNumber);
  // Ajouter à la liste d'ajout
  addList.value.push(student);
};
</script>

<template>
  <div class="container">
    <!-- Liste d'ajout des étudiants -->
    <div class="list-container">
      <h3>Ajouter des étudiants</h3>
      <ul>
        <li v-for="student in addList" :key="student.studentNumber" class="list-presence">
          <button @click="toggleAddToDelete(student)" class="button-add">
            Ajouter
          </button>
          {{ student.surname }}
        </li>
      </ul>
    </div>

    <!-- Liste de suppression des étudiants -->
    <div class="list-container">
      <h3>Supprimer des étudiants</h3>
      <ul>
        <li v-for="student in deleteList" :key="student.studentNumber" class="list-presence">
          <button @click="toggleDeleteToAdd(student)" class="button-delete">
            Supprimer
          </button>
          {{ student.surname }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import url("../../shared/shared.css");

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
}

.list-container {
  width: 40%;
}

.list-presence {
  list-style-type: none;
  border: solid lightgray;
  background-color: white;
  border-radius: 5px;
  padding: 8px;
  font: 1rem "Fira Sans", sans-serif;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-add,
.button-delete {
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.button-add {
  background-color: green;
}

.button-delete {
  background-color: red;
}
</style>