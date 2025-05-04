<!--Page de gestion des cours non utilisé selon la revue de la base de données
Pour plus d'informations, cf Rapport du S6-->
<template>
    <main class="left">
        <PromoSelector v-model="selectedSemester" />

        <h1>Données des nombres de groupes et des matières</h1>

        <form class="groups-info">
            <div>
                <label>Nombre de groupes (TD/TP/TM) : </label>
                <input type="number" id="number-of-groups" v-model="numberOfGroups">
            </div>

            <div v-if="selectedSemester !== 'S1'">
                <label>Nombre de groupes d'anglais en cog : </label>
                <input type="number" id="number-of-cog-eng" v-model="numberOfCogEng">
            </div>

            <div v-if="selectedSemester !== 'S1'">
                <label>Nombre de groupes d'anglais en éco : </label>
                <input type="number" id="number-of-eco-eng" v-model="numberOfEcoEng">
            </div>

            <button id="save-changes" class="button" v-if="!changesSaved" @click="saveChanges">
                Enregistrer les changements</button>
        </form>

        <div class="sections-container">
            <section class="courses-info">
                <h2>Matières communes</h2>
                <div class="add">
                    <input type="text" v-model="newCourse" placeholder="Ajout d'une matière commune">
                    <button type="button" class="button" id="add-btn" @click="addCourse">+</button>
                </div>
                <ul class="list">
                    <li v-for="(course, index) in courses" :key="index" class="list-item">
                        {{ course.name }}
                        <button type="button" class="button" id="delete-btn" @click="deleteCourse(index)">×</button>
                    </li>
                </ul>

            </section>

            <section class="courses-info">
                <h2>Options</h2>
                <div class="add">
                    <input type="text" v-model="newOption" placeholder="Ajout d'une option">
                    <button type="button" class="button" id="add-btn" @click="addOption">+</button>
                </div>
                <ul class="list">
                    <li v-for="(option, index) in options" :key="index" class="list-item">
                        {{ option.name }}
                        <button type="button" class="button" id="delete-btn" @click="deleteOption(index)">×</button>
                    </li>
                </ul>
            </section>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PromoSelector from '@/shared/components/PromoSelector.vue';

const selectedSemester = ref('S1')
const courses = ref([]);
const options = ref([]);

onMounted(() => {

    if (options.value.length === 0) {

        fetch('/Options.json')
            .then((response) => response.json())
            .then((data) => {
                options.value = data.options
            })
            .catch(error => console.error("Error loading options data : ", error))
    }

    if (courses.value.length === 0) {


        fetch('/Courses.json')
            .then((response) => response.json())
            .then((data) => {
                courses.value = data.courses
            })
            .catch(error => console.error("Error loading courses data : ", error))
    }
})

const newCourse = ref('')
const newOption = ref('')

function addCourse() {
    const name = newCourse.value.trim()
    if (name) {
        courses.value.push({ name })
        newCourse.value = ''
    }
}

function addOption() {
    const name = newOption.value.trim()
    if (name) {
        options.value.push({ name })
        newOption.value = ''
    }
}

function deleteCourse(index) {
    courses.value.splice(index, 1)
}

function deleteOption(index) {
    options.value.splice(index, 1)
}

const changesSaved = ref(false);
function saveChanges() {
    /* Sauvegarder les changements */
    changesSaved.value = true;
}
</script>

<style scoped>
@import url("../shared/shared.css");

.groups-info div {
    margin-bottom: 1rem;
}

.groups-info label {
    font-size: 1.25rem;
}

.groups-info input {
    width: 3%;
    font-size: 1.25rem;
}

.sections-container {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 2rem;
    margin-top: 2rem;
}

.add {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.add input {
    font-size: 1.2rem;
    padding: 0.3rem 0.5rem;
    height: 2.2rem;
    border: 1px solid lightgray;
    border-radius: 5px;
}

.list {
    width: 60%;
}

.list-item {
    list-style-type: none;
    border: solid lightgray;
    background-color: var(--color-6);
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
}

#add-btn {
    color: var(--color-8);
    border-color: var(--color-8);
}

#delete-btn {
    color: var(--color-7);
    border-color: var(--color-7);
}

#add-btn,
#delete-btn {
    margin: 0;
    padding: 0.3rem;
    font-size: 1.4rem;
    background-color: var(--color-6);
}

#add-btn,
#delete-btn:hover {
    background-color: var(--color-5);
}
</style>