<!--Page de sélection des absences pour un créneau-->
<template>
    <main class="left">
        <h1>Appel</h1>
        <div class="sections-container">

            <div class="section">
                <button id="select-all" class="button" @click="selectAll">
                    {{ allSelected ? "Déselectionner tou.te.s" : "Sélectionner tou.te.s" }}
                </button>
                <ul class="list-presence">
                    <li v-for="student in studentsInGroup" :key="student">
                        <div class="container">
                            <input type="checkbox" :value="student.studentNumber" v-model="absentStudents">
                            <label>{{ student.studentNumber }} {{ student.surname }} {{ student.name }}</label>
                        </div>
                    </li>
                </ul>
                <button v-if="!callSaved" id="btn-save" class="button" @click="saveCallAndGoBack">Sauvegarder l'appel</button>
            </div>

            <div class="section">

            </div>
        </div>
    </main>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const studentsInGroup = ref([]);
const studentsOutsideGroup = ref([]);
const groups = ref([]);
const buttonStates = ({});
onMounted(() => {
    fetch('/Students.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données des étudiants récupérées : ", data)
            studentsInGroup.value = data.students;
            buttonStates.value = studentsInGroup.value.reduce((acc, student) => {
                acc[student.studentNumber] = true
                return acc
            }, {})
            console.log("Etat actuel des boutons : ", buttonStates.value)
        })
        .catch(error => console.error('Error loading students data:', error))

    fetch('/Groups.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données des groupes récupérées : ", data)
            groups.value = data.groups;
        })
        .catch(error => console.error("Error loading groups data : ", error))
});

const props = defineProps({
    students: Array
})

const absentStudents = ref([]);

const allSelected = ref(false);

function selectAll() {
    allSelected.value = !allSelected.value;
    if (allSelected.value) {
        absentStudents.value = studentsInGroup.value.map(student => student.studentNumber);
    } else {
        absentStudents.value = [];
    }
}

const callSaved = ref(false);

function saveCall() {
    /* Sauvegarder l'appel */
    callSaved.value = true;
}

const router = useRouter();

function saveCallAndGoBack() {
    saveCall();
    router.go(-1);
}

</script>

<style scoped>
@import url("../../shared/shared.css");

.list-presence {
    list-style-type: none;
    width: 70%;
    font-size: 1rem;
}

.list-presence>li {
    background-color: var(--color-6);
    margin-bottom: 0.5rem;
}

div.container {
    margin-bottom: 0.7rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    padding: 0.2rem;

}

.container label {
    padding-left: 1rem;
}

input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid black;
    border-radius: 5px;
    background-color: var(--color-5);
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
}

input[type="checkbox"]:hover {
    background-color: var(--color-3);
}

input[type="checkbox"]:checked {
    background-color: var(--color-2);
}

input[type="checkbox"]:checked::after {
    content: '✓';
    display: block;
    text-align: center;
    font-size: 16px;
    color: var(--color-6);
    font-weight: bold;
}

#btn-save {
    margin-left: 19.5rem;
}
</style>