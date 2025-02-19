<!--Page de sélection des absences pour un créneau-->
<template>
    <main>
        <div>
            <h1>Appel</h1>
            <ul class="list-presence">
                <li v-for="student in studentList" :key="student">
                    <label class="container">
                        <input type="checkbox">
                        <span class="checkmark"></span>
                        {{ student.studentNumber }} {{ student.surname }} {{ student.name }}
                    </label>
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
    padding-left: 2rem;
}

.list-presence > li {
    background-color: var(--color-4);
    margin-bottom: 0.5rem;
}

label.container {
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding-left: 3rem;
    margin-bottom: 0.7rem;
    font-size: 1.25rem;
    user-select: none;
}

/*hide the default checkbox*/
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

}

.checkmark {
    position: absolute;
    top: 0.3rem;
    left: 0.6rem;
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--color-6)
}

.container:hover input~.checkmark {
    background-color: var(--color-1);
}

.container input:checked~.checkmark {
    background-color: var(--color-1);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.container input:checked~.checkmark:after {
    display: block;
}

.container .checkmark::after {
    left: 0.6rem;
    top: 0.3rem;
    width: 0.25rem;
    height: 0.5rem;
    border: solid white;
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
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