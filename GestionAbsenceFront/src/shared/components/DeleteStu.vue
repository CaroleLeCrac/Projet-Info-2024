<script setup>
import { ref } from 'vue';
const props = defineProps({
    studentList : Array
})

const buttonStates = ref(
  props.studentList.reduce((acc, student) => {
    acc[student] = true;
    return acc;
  }, {})
);

const toggleAdd = (student) => {
  if (buttonStates.value[student] !== undefined) {
    buttonStates.value[student] = !buttonStates.value[student];
  }
};
</script>

<template>
    <ul>
        <li  v-for="student in studentList" :key="student" class="list-presence">
            <button @click="toggleAdd(student)">
        {{ buttonStates.value[student] ? 'Delete' : 'Deleted' }}
      </button>
            {{ student }}
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
    color : red;
}


</style>