<!--Page de sélection des absences pour un créneau-->
<template>
    <main class="left">
        <h1>Appel</h1>
        <div class="sections-container">

            <div class="section">
                <h2 v-if="groupNumber !== null">Etudiant.e.s du groupe {{ groupNumber }}</h2>
                <button id="select-all" class="button" @click="selectAll">
                    {{ allSelected ? "Déselectionner tou.te.s" : "Sélectionner tou.te.s" }}
                </button>
                <div id="search-bar">
                    <SearchIcon />
                    <input class="search-bar" type="search" v-model="searchQueryInGroup"
                        placeholder="Rechercher un.e étudiant.e">
                </div>
                <ul class="list-presence">
                    <li v-for="student in filteredStudentsInGroup" :key="student.studentNumber">
                        <div class="student-list-container">
                            <div class="student-info">
                                <input type="checkbox" :value="student.studentNumber" v-model="absentStudents">
                                <label>{{ student.studentNumber }} {{ student.surname }} {{ student.name }}</label>
                            </div>
                            <div class="student-group-number">
                                <p>Groupe {{ student.groupNumber }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div v-if="groupNumber !== null" class="section">
                <h2>Autres étudiant.e.s</h2>
                <input class="search-bar" type="search" v-model="searchQueryOutsideGroup"
                    placeholder="Rechercher un.e étudiant.e">
                <ul class="list-presence">
                    <li v-for="student in filteredStudentsOutsideGroup" :key="student.studentNumber">
                        <div class="student-list-container">
                            <div class="student-info">
                                <input type="checkbox" :value="student.studentNumber" v-model="absentStudents">
                                <label>{{ student.studentNumber }} {{ student.surname }} {{ student.name }}</label>
                            </div>
                            <div class="student-group-number">
                                <p>Groupe {{ student.groupNumber }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <button v-if="!callSaved" id="btn-save" class="button" @click="saveCallAndGoBack">Sauvegarder l'appel</button>
    </main>
</template>

<script setup>

import SearchIcon from '@/assets/icon/SearchIcon.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const studentsInGroup = ref([]); // Liste des étudiants du groupe (si CM = tous les étudiants)
const studentsOutsideGroup = ref([]); // Liste des étudiants extérieurs au groupe
const searchQueryInGroup = ref("");
const searchQueryOutsideGroup = ref("");

const route = useRoute();
// Numéro du groupe récupéré si ce n'est pas un CM
const groupNumber = route.params.groupNumber ? parseInt(route.params.groupNumber) : null;

const groups = ref([]); // UTILE ??
const buttonStates = ({});
onMounted(() => {
    fetch('/Students.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données des étudiants récupérées : ", data)
            const students = data.students;

            // Tri en groupes
            if (groupNumber !== null) {
                studentsInGroup.value = students.filter(s => s.groupNumber === groupNumber);
                studentsOutsideGroup.value = students.filter(s => s.groupNumber !== groupNumber);
            } else {
                studentsInGroup.value = students;
                studentsOutsideGroup.value = [];
            }
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

const filteredStudentsInGroup = computed(() =>
    studentsInGroup.value.filter(s =>
        s.name.toLowerCase().includes(searchQueryInGroup.value.toLowerCase()) ||
        s.surname.toLowerCase().includes(searchQueryInGroup.value.toLowerCase())
    )
);


const filteredStudentsOutsideGroup = computed(() =>
    studentsOutsideGroup.value.filter(s =>
        s.name.toLowerCase().includes(searchQueryOutsideGroup.value.toLowerCase()) ||
        s.surname.toLowerCase().includes(searchQueryOutsideGroup.value.toLowerCase())
    )
);


const absentStudents = ref([]);

const allSelected = ref(false);

function selectAll() { // ne modifie rien dans la liste des étudiants extérieurs
    allSelected.value = !allSelected.value;

    const studentsNumberInGroup = studentsInGroup.value.map(student => student.studentNumber);

    if (allSelected.value) {
        const set = new Set(absentStudents.value); // pour éviter les doublons
        studentsNumberInGroup.forEach(studentNumber => set.add(studentNumber));
        absentStudents.value = Array.from(set);
    } else {
        absentStudents.value = absentStudents.value.filter(studentNumber => !studentsNumberInGroup.includes(studentNumber));
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
@import url("../shared/shared.css");

#select-all {
    margin-left: 0;
}

#search-bar {
    display: flex;
    align-items: center;
    justify-items: center;
}

.search-bar {
    display: block;
    margin-top: 1rem;
}

.list-presence {
    list-style-type: none;
    width: max-content;
    font-size: 1rem;
    padding-left: 0;
}

.list-presence>li {
    background-color: var(--color-6);
    margin-bottom: 0.5rem;
    border-radius: 5px;
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
</style>