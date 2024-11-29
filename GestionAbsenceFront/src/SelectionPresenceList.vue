<template>
    <ul>
        <li  v-for="student in studentList" :key="student" class="list-presence">
            <input type="checkbox" class="checkbox">
            {{ student }}
        </li>
    </ul>

</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    studentList : Array
})
</script>

<style scoped>
.list-presence {
    list-style-type : none;
    border: solid lightgray;
    background-color: white;
    width: 40%;
    font: 1rem "Fira Sans", sans-serif;
}


</style>