<!--Page de sélection des absences pour un créneau-->
<template>
    <main class="left">
        <h1>Appel pour {{ sessionType }} {{ courseName }}</h1>
        <!-- Pour diviser en 2 sections lorsqu'on affiche les étudiants extérieurs
        <div class="sections-container">-->

        <div> <!-- Ajouter class="section" si on utilise les 2 sections-->
            <h2>{{ groupName }}</h2>
            <div class="search-container">
                <SearchIcon class="search-icon" />
                <input class="search-bar" type="search" v-model="searchQuery" placeholder="Rechercher un.e étudiant.e">
            </div>
            <button id="select-all" class="button" @click="selectAll">
                {{ allSelected ? "Déselectionner tou.te.s" : "Sélectionner tou.te.s" }}
            </button>
            <ul class="list-presence">
                <li v-for="student in filteredStudents" :key="student.id">
                    <div class="student-list-container">
                        <div class="student-info">
                            <input type="checkbox" :value="student.id" v-model="presentStudentsId">
                            <label>{{ student.name }}</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Cette section est utile pour la gestion des absences des étudiant.e.s extérieur.e.s au groupe sélectionné-->
        <!-- Elle n'est pas utilisée suite au modification de la base de données au S6 du projet (cf. rapport et documentation)
             Dans le script, tout ce qui est nécessaire pour cette section sera aussi en commentaire
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
        -->
        <button v-if="!callSaved" id="btn-save" class="button" @click="saveCallAndGoBack">Sauvegarder l'appel</button>
    </main>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getStudentsByGroupId } from '@/shared/fetchers/students';
import { postAbsence } from '@/shared/fetchers/presence';
import { postSlot } from '@/shared/fetchers/slots';

const studentsInGroup = ref([]); // Liste des étudiants
//const studentsOutsideGroup = ref([]); // Liste des étudiants extérieurs au groupe
const searchQuery = ref("");
//const searchQueryOutsideGroup = ref("");

const route = useRoute();
// Nom du groupe récupéré pour l'afficher
const groupName = route.params.groupName;
const groupId = Number(route.params.groupId);
const sessionType = route.params.sessionType;
const courseName = route.params.courseName;
const date = route.params.date;
const slot = ref(null);

onMounted(async () => {
    studentsInGroup.value = await getStudentsByGroupId(groupId);
    slot.value = await postSlot(groupId, courseName, sessionType, date);
});

const props = defineProps({
    students: Array
})

const filteredStudents = computed(() =>
    studentsInGroup.value.filter(s =>
        s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

/*const filteredStudentsOutsideGroup = computed(() =>
    studentsOutsideGroup.value.filter(s =>
        s.name.toLowerCase().includes(searchQueryOutsideGroup.value.toLowerCase()) ||
        s.surname.toLowerCase().includes(searchQueryOutsideGroup.value.toLowerCase())
    )
);*/

const presentStudentsId = ref([]);

const absentStudentsId = computed(() =>
    studentsInGroup.value
        .map(student => student.id)
        .filter(id => !presentStudentsId.value.includes(id))
);

const allSelected = ref(false);

function selectAll() { // ne modifie rien dans la liste des étudiants extérieurs
    const studentsIdInGroup = studentsInGroup.value.map(student => student.id);

    if (!allSelected.value) {
        presentStudentsId.value = studentsIdInGroup.slice();
    } else {
        presentStudentsId.value = [];
    }
    allSelected.value = !allSelected.value;
    console.log(absentStudentsId);
}


const callSaved = ref(false);
function saveCall() {
    console.log("Étudiants absents :", absentStudentsId.value);
    postAbsence(slot.id, absentStudentsId.value);
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
    margin-bottom: 1rem;
}

.list-presence {
    list-style-type: none;
    width: 35%;
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