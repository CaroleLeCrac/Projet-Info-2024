<!--Page de sélection des absences pour un créneau-->
<template>
    <main class="left">
        <h1>Appel</h1>
        <button id="select-all" class="button" @click="selectAll">
            {{ allSelected ? "Déselectionner tou.te.s" : "Sélectionner tou.te.s" }}
        </button>
        <div>
                <ul class="list-presence">
                    <li v-for="student in studentList" :key="student">
                        <div class="container">
                            <input type="checkbox">
                            <label>{{ student.studentNumber }} {{ student.surname }} {{ student.name }}</label>
                        </div>
                    </li>
                </ul>
                <button v-if="!callSaved" id="btn-save" class="button" @click="saveCallAndGoBack">Sauvegarder
                    l'appel</button>
        </div>
    </main>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const studentList = ref([])
const buttonStates = ({})
onMounted(() => {
    fetch('/ListNamesStu.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data)
            studentList.value = data.students;
            buttonStates.value = studentList.value.reduce((acc, student) => {
                acc[student.studentNumber] = true
                return acc
            }, {})
            console.log("Etat actuel des boutons : ", buttonStates.value)
        })
        .catch(error => console.error('Error loading data:', error))
});
const props = defineProps({
    studentList: Array
})

const allSelected = ref(false);

function selectAll() {
    allSelected.value = !allSelected.value;
    document.querySelectorAll('.list-presence input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = allSelected.value;
    });
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

#select-all {
    margin-left: 40px;
    background-color: var(--color-6);
    padding: 0.4rem;
}

#select-all:hover {
    background-color: #FFA733;
}

.list-presence {
    list-style-type: none;
    width: 30%;
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

/* Hide the checkbox style by default */
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