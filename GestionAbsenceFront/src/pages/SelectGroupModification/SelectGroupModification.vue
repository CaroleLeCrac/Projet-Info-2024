<!--Page de sélection d'un groupe pour ajouter ou supprimer des étudiants-->
<script setup>
import { ref, onMounted } from 'vue'

const groups = ref([])


  onMounted(() => {
    fetch('/Groups.json')
    .then((response)=>response.json())
    .then ((data)=> {
      console.log("Données JSON récupérées : ", data);
      groups.value = data.groups;
    })
    .catch(error => console.error('Error loading data:', error));
});

</script>
<template>
  <h2>Choisissez un groupe à modifier</h2>
  <ul class="group-list">
    <li v-for="group in groups" :key="group.groupNumber">
      <label class="container">
        <RouterLink :to="`/modification/groupe/${group.groupNumber}`" class="router-link">{{ group.name }}</RouterLink>
      </label>
      </li>
  </ul>
</template>

<style scoped>


.router-link{
  display: block;
  text-decoration: none; 
  border-radius: 5px;
  color: black; 
  cursor: pointer; 
  font-size: 16px; 
  padding: 8px 10px; 
  width: 50%;
  border: 2px solid black;
  box-sizing: border-box;
}

.router-link:hover{
  background-color: rgba(255,140,0,0.9);
  color: white;
}

.container{
  display : block;
    position :relative; 
    margin-bottom: -1px;
    font-size: 16px;
    user-select: none;
}

.group-list{
  display : flex; 
  flex-direction: column;
  width: 40%;
  list-style-type: none;
  padding-left: 0;
}
</style>