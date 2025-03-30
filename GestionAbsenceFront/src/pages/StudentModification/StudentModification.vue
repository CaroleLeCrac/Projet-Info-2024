<!--Page de modification d'informations ou d'ajout d'un étudiant-->
<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const students = ref([]);
const student = ref([]);
const courses = ref([]);
const groups = ref([]);
const years = ref([]);
const route = useRoute();
const currentStudentNumber = route.params.id;

onMounted(() => {
    fetch('/ListNamesStu.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            students.value = data.students;
            if (currentStudentNumber !== '0') {
                const studentData = students.value.find(
                    (student) => student.studentNumber === Number(currentStudentNumber)
                )
                if (studentData) {
                    student.value = { ...studentData }
                }
            }
        })
        .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
    fetch('/ListCourses.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            courses.value = data.courses;

        })
        .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
    fetch('/Groups.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            groups.value = data.groups;

        })
        .catch((error) => console.error('Error loading data:', error));
});

onMounted(() => {
    fetch('/Years.json')
        .then((response) => response.json())
        .then((data) => {
            console.log("Données JSON récupérées : ", data);
            years.value = data.years;

        })
        .catch((error) => console.error('Error loading data:', error));
});
</script>

<template>
    <main class="left">
        <div class="page-layout">

            <div class="left-column">
                <h2>Remplissez les informations de l'étudiant.e</h2>
                <form class="container">
                    <div>
                        <label for="studentNumber">Numéro étudiant : </label>
                        <input type="text" id="studentNumber" v-model="student.studentNumber"
                            :placeholder="student.studentNumber ? '' : 'Numéro de l\'étudiant.e'" />
                    </div>
                    <div>
                        <label for="name">Nom : </label>
                        <input type="text" id="surname" v-model="student.surname"
                            :placeholder="student.surname ? '' : 'Nom de l\'étudiant.e'" />
                    </div>
                    <div>
                        <label for="surname">Prénom : </label>
                        <input type="text" id="name" v-model="student.name"
                            :placeholder="student.name ? '' : 'Prénom de l\'étudiant.e'" />
                    </div>
                    <div>
                        <label for="mail">Mail : </label>
                        <input type="text" id="mail" v-model="student.mail"
                            :placeholder="student.mail ? '' : 'Mail de l\'étudiant.e'" />
                    </div>

                    <div>
                        <label>Année en cours : </label>
                        <select name="inscriptionYear">
                            <option v-for="year in years">{{ year.name }}</option>
                        </select>
                    </div>

                    <div class="groups">
                        <label>Groupes : </label>
                        <ul class="list-groups">
                            <li v-for="group in groups" :key="group.number">
                                <div id="container-group" class="list-container">
                                    <input class="checkbox-group" type="checkbox">
                                    <label for="group.name">{{ group.name }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>

            <div class="right-column">
                <h2>Sélectionnez les cours auxquels l'étudiant.e est inscrit.e</h2>
                <ul class="list-courses">
                    <li v-for="course in courses" :key="course.name">
                        <div class="list-container">
                            <input class="checkbox-course" type="checkbox">
                            <label for="course.name">{{ course.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <button class="button">Enregistrer les changements</button>
    </main>
</template>

<style scoped>
@import url("../../shared/shared.css");

main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.page-layout {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.left-column {
    flex: 1fr;
}

.right-column {
    flex: 1.25fr;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 1.25rem;
}

.container div {
    display: flex;
    align-items: center;
}

label {
    flex: 1;
}

input {
    flex: 2;
    margin-left: 10px;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    background-color: var(--color-6);
}

select {
    flex: 2;
    background-color: var(--color-6);
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
    margin-left: 10px;
}

div.groups {
    display: grid;
    grid-template-columns: 34% 66%;
}

.list-groups {
    list-style-type: none;
    font-size: 0.75rem;
    padding-left: 0;
    margin: 0;
    width: 100%;
}

.list-groups > li {
    background-color: var(--color-6);
}

#container-group {
    display: block;
}

.checkbox-group {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid black;
    border-radius: 5px;
    background-color: var(--color-5);
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0;
}

.checkbox-group:hover {
    background-color: var(--color-1);
}

.checkbox-group:checked {
    background-color: var(--color-1);
}

.checkbox-group:checked::after {
    content: '✓';
    display: block;
    text-align: center;
    font-size: 16px;
    color: var(--color-6);
    font-weight: bold;
}

.list-courses {
    list-style-type: none;
    font-size: 1rem;
    width: 75%;
    padding-left: 0;
}

.list-courses>li {
    background-color: var(--color-6);
}

.list-container {
    margin-bottom: 0.7rem;
    font-size: 1rem;
    height: 1.875rem;
    position: relative;
}

.list-container label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-left: 1rem;
}

.checkbox-course {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 1px solid black;
    border-radius: 5px;
    background-color: var(--color-5);
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0;
}

.checkbox-course:hover {
    background-color: var(--color-1);
}

.checkbox-course:checked {
    background-color: var(--color-1);
}

.checkbox-course:checked::after {
    content: '✓';
    display: block;
    text-align: center;
    font-size: 16px;
    color: var(--color-6);
    font-weight: bold;
}

.button {
    align-self: flex-end;
    margin-top: 2rem;
    margin-left: auto;
}

</style>