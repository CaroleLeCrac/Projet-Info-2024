<template>
    <ul>
        <li  v-for ="etudiant in etudiantList" :key="etudiant" class="styleListePresence">
            <SelectionPresence :label='etudiant'/>
        </li>
    </ul>

</template>

<script setup>
import { ref } from 'vue';
import SelectionPresence from './SelectionPresence.vue';
const props = defineProps({
    etudiantList
})
</script>

<style scoped>
.styleListePresence {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    width: 40%;
    font: 1rem "Fira Sans", sans-serif;
}


</style>