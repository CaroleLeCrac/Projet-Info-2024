<script setup>
import { ref, onMounted } from 'vue';

const students = ref([])
const buttonStates = ({})
onMounted(() => {
    fetch('/ListNamesStu.json')
    .then((response)=>response.json())
    .then ((data)=> {
      console.log("Données JSON récupérées : ", data)
      students.value = data.students;
      buttonStates.value = students.value.reduce((acc, student) => {
    acc[student.studentNumber] = true
    return acc
  }, {})
  console.log("Etat actuel des bouton : ", buttonStates.value)
    })
    .catch(error => console.error('Error loading data:', error))
});

const toggleAdd = (studentNumber) => {
  if (buttonStates.value[studentNumber] !== undefined) {
    buttonStates.value[studentNumber] = !buttonStates.value[studentNumber];
  }
};
</script>

<template>
    <ul>
        <li  v-for="student in students" :key="student.studentNumber" class="list-presence">
            <button @click="toggleAdd(student.studentNumber)" class="delete-button">
        {{ buttonStates.value[student.studentNumber] ? 'Delete' : 'Deleted' }}
      </button>
            {{ student.surname }}
        </li>
    </ul>

</template>

<style scoped>
.list-presence {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    width: 40%;
    font: 1rem "Fira Sans", sans-serif;
}

.delete-button{
  background-color: red;
}


</style>