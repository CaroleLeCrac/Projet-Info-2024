<!--Page de sélection des absences pour un créneau-->
<template>
    <main class="left">
        <div>
            <h1>Appel</h1>
            <ul class="list-presence">
                <li v-for="student in studentList" :key="student">
                    <div class="container">
                        <input type="checkbox">
                        <label>{{ student.studentNumber }} {{ student.surname }} {{ student.name }}</label>
                    </div>
                </li>
            </ul>
            <!--dans le composant, afficher présent.e et absent.e dans la liste à côté du nom ?-->
            <!--dans le composant, ajouter un bouton voir le récap de l'étudiant lorsqu'on le survole ?-->
            <button v-if="!callSaved" class="button-save" @click="saveCallAndGoBack">Sauvegarder l'appel</button>
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
    width: 30%;
    font-size: 1rem;
}

.list-presence > li {
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
    width: 20px;
    height: 20px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
}

input[type="checkbox"] {
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--color-5);
}

input[type="checkbox"]:hover {
    background-color: var(--color-1);
}

input[type="checkbox"]:checked {
    background-color: var(--color-1);
}

input[type="checkbox"]:checked::after {
    content: '✓';
    display: block;
    text-align: center;
    font-size: 16px;
    color: white;
    font-weight: bold;
}

.button-save {
    text-decoration: none;
    background-color: var(--color-1);
    color: black;
    padding: 0.75rem;
    border-radius: 5px;
    border: 2px solis black;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 0.5rem;
    margin-left: 19.5rem;
}

.button-save:hover {
    background-color: #FFA733;
}
</style>