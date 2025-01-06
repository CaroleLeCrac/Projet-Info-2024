<!--Page d'accueil avec la sélection du professeur-->
<template>
    <h1>Professionnel</h1>
    <!--SearchBar pour le professionnel -->
    <input
        type="text"
        v-model="profesionalQuery"
        placeholder="Rechercher un professionnel"
        class="search-bar"
    />
    <div>
        <select v-model="selectedProfesional" multiple>
            <option v-for="profesional in filteredProfesionals" :value="profesional.surname">
                {{ profesional.name }} {{ profesional.surname }}
            </option>
        </select>
        <p>Professionnel sélectionné: {{ formatSelection(selectedProfesional) }}</p>
        <button @click="goToProfesionalSlotPage" class="selection-btn">
            Afficher le choix : {{ formatSelection(selectedProfesional) }}
        </button>
    </div>
</template>

<script setup>

import { router } from '@/routes'
import { ref, onMounted, computed } from 'vue'

const selectedProfesional = ref([])
const profesionals = ref([])
const profesionalQuery = ref('')

onMounted(() => {
  fetch('/ListProfesional.json')
    .then((response) => response.json())
    .then((data) => {
      profesionals.value = data.profesionals 
    })
    .catch((error) => console.error('Error loading profesionals data:', error))
})

const formatSelection = (selection) => {
    if (selection.length === 0) {
        return 'Aucune sélection'
    }

    if (selection === selectedProfesional.value) {
        return selection.map(profesionalSurname => {
            const profesional = profesionals.value.find(p => p.surname === profesionalSurname);
            return profesional ? `${profesional.name} ${profesional.surname}`: '';
        }).join(', ');
    }

    return selection.join(', ');
}

const filteredProfesionals = computed(() => {
    return profesionals.value.filter((profesional) =>
        (profesional.name + ' ' + profesional.surname).toLowerCase().includes(profesionalQuery.value.toLowerCase())
    )
})

const goToProfesionalSlotPage = () => {
    if (selectedProfesional.value.length > 0) {
        router.push({ name: 'ProfesionalSlotPage', params: { profesional: selectedProfesional.value[0]}});
    }
    else {
        alert("Veuillez sélectionner un professionnel.");
    }
}

</script>

<style scoped>
.search-bar {
  padding: 8px;
  font-size: 16px;
  width: 30%;
  margin-bottom: 10px;
}

.selection-btn {
    background-color: lightgray;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}

.selection-btn:hover {
    background-color: gray; 
}

</style>