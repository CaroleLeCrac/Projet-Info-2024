<template>
    <ul>
        <li  v-for="etudiant in etudiantList" :key="etudiant" class="style-liste-presence">
            <input type="checkbox" class="checkbox">
            {{ etudiant }}
        </li>
    </ul>

</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    etudiantList : Array
})
</script>

<style scoped>
.style-liste-presence {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    width: 40%;
    font: 1rem "Fira Sans", sans-serif;
}


</style>