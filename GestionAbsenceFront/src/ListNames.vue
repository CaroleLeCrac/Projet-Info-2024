<script setup>
import { ref } from 'vue'
import { jsonData } from './ListNamesStu';

const multiSelected = ref([])
</script>
<template>
  <h2>Liste de Noms</h2>
  <select v-model="multiSelected" multiple style="width:500px">
    <option v-for="(surname) in jsonData.surnames" :value="surname">
        {{ surname }}
    </option>

  </select>
  <p>Selected: {{ multiSelected }}</p>
</template>