<!--Page de modification d'informations ou d'ajout d'un.e étudiant.e-->
<template>
    <main class="left">

        <div class="page-layout" v-if="student">
            <div class="left-column">
                <h2>Remplissez les informations de l'étudiant.e</h2>
                <form @submit.prevent="submit" class="container">
                    <div>
                        <label for="student_number">Numéro étudiant : </label>
                        <input type="text" id="student_number" v-model="student.student_number"
                            :placeholder="student.student_number ? '' : 'Numéro de l\'étudiant.e'" />
                    </div>
                    <div>
                        <label for="name">Nom et Prénom : </label>
                        <input type="text" id="name" v-model="student.name"
                            :placeholder="student.name ? '' : 'Nom de l\'étudiant.e'" />
                    </div>
                    <div>
                        <label>Semestre en cours : </label>
                        <select v-model="semesterStudentId">
                            <option v-for="semester in semesters" :key="semester.id" :value="semester.id">
                                {{ semester.name }}</option>
                        </select>
                    </div>
                </form>
            </div>

            <div class="right-column">
                <h2>Sélectionnez ses groupes et ses options</h2>
                <div class="search-container">
                    <SearchIcon class="search-icon" />
                    <input class="search-bar" type="search" v-model="searchQueryGroup"
                        placeholder="Rechercher un groupe" />
                </div>
                <ul class="list-groups">
                    <li v-for="group in filteredGroups" :key="group.id">
                        <div class="list-container">
                            <input class="checkbox-group" type="checkbox" :value="group.id" v-model="selectedGroups">
                            <label>{{ group.name }}</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <button id="save-changes" class="button" v-if="!changesSaved" @click="submit">
            Enregistrer les changements</button>
    </main>
</template>

<script setup>

import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getStudentById, postStudent, putStudentById } from '@/shared/fetchers/students';
import { getAllGroupsBySemester, getGroupsByStudentId } from '@/shared/fetchers/groups';
import { getAllSemesters, getSemesterById } from '@/shared/fetchers/semesters';
import { postInscription, putManyInscriptions } from '@/shared/fetchers/inscriptions';

const student = ref();
const groups = ref([]);
const studentGroups = ref([]); //tableau des groupes auxquels l'étudiant est inscrit
const semesterStudent = ref(); // semestre auquel l'étudiant est inscrit
const semesterStudentId = ref(null);
const semesters = ref([]);

const route = useRoute();
const studentId = Number(route.params.studentId);

const selectedGroups = ref([]);

onMounted(async () => {
    groups.value = await getAllGroupsBySemester();
    semesters.value = await getAllSemesters();

    if (studentId !== 0) {
        student.value = await getStudentById(studentId);

        studentGroups.value = await getGroupsByStudentId(studentId);
        selectedGroups.value = studentGroups.value.map(g => g.id);

        if (studentGroups.value.length > 0) {
            semesterStudent.value = await getSemesterById(studentGroups.value[0].semester_id);
            semesterStudentId.value = semesterStudent.value?.id ?? null;
        } else {
            semesterStudent.value = null;
            semesterStudentId.value = null;
        }

    } else {
        student.value = {
            id: '',
            student_number: '',
            name: ''
        };
        studentGroups.value = [];
        semesterStudent.value = null;
    }
});

// synchronisation de semesterStudent avec celui sélectionné (semesterStudentId)
watch(semesterStudentId, (newId) => {
    semesterStudent.value = semesters.value.find(s => s.id === newId);
});

const searchQueryGroup = ref('');
const filteredGroups = computed(() =>
    groups.value.filter(g =>
        g.name.toLowerCase().includes(searchQueryGroup.value.toLowerCase()) &&
        g.semester_id === semesterStudentId.value
    )
);

const changesSaved = ref(false);

const router = useRouter();

async function submit() {
    if (studentId === 0) {
        try {
            const createdStudent = await postStudent(student.value.student_number, student.value.name);

            for (const groupId of selectedGroups.value) {
                await postInscription(createdStudent.id, groupId);
            }

            changesSaved.value = true;
            alert("Ajout de l'étudiant.e effectué.");
            router.go(-1);
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            alert("Une erreur est survenue lors de l'ajout.");
        }
    } else {
        try {
            await putStudentById(student.value.id, student.value.student_number, student.value.name);

            await putManyInscriptions(student.value.id, selectedGroups.value);

            changesSaved.value = true;
            alert("Modifications des informations de l'étudiant.e enregistrées.");
            router.go(-1);
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            alert("Une erreur est survenue lors de l'enregistrement.");
        }
    }
}

</script>

<style scoped>
@import url("../shared/shared.css");

main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.page-layout {
    display: flex;
    gap: 8rem;
    width: 100%;
}

.left-column {
    flex: 0.5;
}

.right-column {
    flex: 0.5;
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

.list-groups {
    list-style-type: none;
    font-size: 0.75rem;
    padding-left: 0;
    margin: 0;
    width: 100%;
}

.list-groups {
    width: 70%;
}

.list-groups>li {
    background-color: var(--color-6);
    border-radius: 5px;
}

.search-bar {
    margin-left: 0;
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
    color: var(--color-6);
    font-weight: bold;
}

#save-changes {
    align-self: flex-end;
    margin-top: 2rem;
    margin-left: auto;
}
</style>