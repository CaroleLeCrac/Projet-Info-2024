<script setup>
import { ref, onMounted } from 'vue'

const groups = ref([])


  onMounted(() => {
    fetch('/group.json')
    .then((response)=>response.json())
    .then ((data)=> {
      console.log("Données JSON récupérées : ", data);
      groups.value = data.groups;
    })
    .catch(error => console.error('Error loading data:', error));
});

</script>
<template>
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