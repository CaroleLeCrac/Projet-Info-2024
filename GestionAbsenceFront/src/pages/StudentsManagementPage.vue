<!--Page de gestion des étudiant.e.s pour ajouter des étudiant.e.s et des groupes avec les listes des étudiant.e.s joints au groupe-->
<template>
    <main class="left">

        <div class="header-section">
            <h1>Liste des étudiant.e.s</h1>

            <div>
                <button class="button" id="refresh-ade-btn" @click="refreshADE">Mettre à jour les données des EDT
                    ADE</button>
                <button class="button" id="refresh-bdd-btn" @click="viderBDD">Vider la base de données</button>
            </div>
        </div>

        <PromoSelector v-model="selectedSemesterForStudents" />

        <form @submit.prevent="submitStudents" class="file-upload-form">
            <div class="file-upload-section">
                <label :for="'upload-' + selectedSemesterForStudents">Importer le fichier csv pour {{
                    selectedSemesterForStudents }} :</label>
                <input type="file" accept=".csv" class="file-upload" :id="'upload-' + selectedSemesterForStudents"
                    @change="fileChange($event, selectedSemesterForStudents)" ref="studentFileInput">
                <button type="submit" class="button">Envoyer le fichier</button>
            </div>
        </form>

        <h1>Création des groupes</h1>

        <PromoSelector v-model="selectedSemesterForGroups" />

        <form @submit.prevent="submitGroup" class="file-upload-form">
            <div class="file-group-name">
                <input type="text" class="group-name" placeholder="Renseigner le nom du groupe" v-model="groupName">
                <button type="button" class="button" id="group-name-btn" @click="createGroup">Créer le groupe</button>
            </div>
            <div class="file-upload-section">
                <label :for="'upload-' + selectedSemesterForGroups">Importer le fichier csv des étudiant.e.s du
                    groupe :</label>
                <input type="file" accept=".csv" class="file-upload" :id="'upload-' + selectedSemesterForGroups"
                    @change="fileChange($event, selectedSemesterForGroups)" ref="groupFileInput">
                <button type="submit" class="button">Envoyer le fichier</button>
            </div>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import PromoSelector from '@/shared/components/PromoSelector.vue';
import { deleteStudents, postStudentsCSV } from '@/shared/fetchers/students';
import { deleteGroups, postGroupWithSemesterName } from '@/shared/fetchers/groups';
import { deleteInscriptions, postInscriptionsCSV } from '@/shared/fetchers/inscriptions';
import { deleteSemester } from '@/shared/fetchers/semesters';
import { deleteSessionType, refreshDataADE } from '@/shared/fetchers/session_type';
import { deleteCourseMaterial } from '@/shared/fetchers/course_material';
import { deleteSlots } from '@/shared/fetchers/slots';
import { deletePresences } from '@/shared/fetchers/presence';

function refreshADE() {
    const confirmRefresh = window.confirm("⚠️ Cette action va vider les données stockées dans la BDD qui sont récupérées depuis ADE puis, récupérer à nouveau les données actuelles pour mettre à jour la BDD. Les groupes d'étudiant.e.s et leurs inscriptions à ces groupes seront également supprimés. Vous ne pourrez pas revenir en arrière ! Êtes-vous sûr.e ?");
    if (confirmRefresh) {
        deleteSemester();
        deleteCourseMaterial();
        deleteSessionType();
        refreshDataADE();
    }
}

function viderBDD() {
    const confirmRefresh = window.confirm("⚠️ Cette action va vider la base de données. Vous ne pourrez pas revenir en arrière ! Êtes-vous sûr.e ?");
    if (confirmRefresh) {
        deleteInscriptions();
        deletePresences();
        deleteStudents();
        deleteSlots();
        deleteGroups();
    }
}

const selectedSemesterForStudents = ref('S1')

const selectedSemesterForGroups = ref('S1')

const uploadedFiles = reactive({})
const studentFileInput = ref(null);
const groupFileInput = ref(null);

function fileChange(event, semester) {
    const file = event.target.files[0]
    if (file) {
        uploadedFiles[semester] = file
    }
}

async function submitStudents() {
    const fichier = uploadedFiles[selectedSemesterForStudents.value];
    if (!fichier) {
        alert("Veuillez sélectionner un fichier CSV.");
        return;
    }
    await postStudentsCSV(fichier);
    alert("Fichier envoyé avec succès.");

    studentFileInput.value.value = '';
    uploadedFiles[selectedSemesterForStudents.value] = null;
}

const groupName = ref('');
const createdGroup = ref(null);

async function createGroup() {
    if (!groupName.value) {
        alert("Veuillez entrer un nom de groupe.");
        return;
    }
    try {
        createdGroup.value = await postGroupWithSemesterName(selectedSemesterForGroups.value, groupName.value);
        alert("Groupe créé avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création du groupe : ", error);
        alert("Echec de la création du groupe.");
    }
}

async function submitGroup() {
    if (!groupName.value.trim()) {
        alert("❌ Vous ne pouvez pas déposer de fichier pour un groupe sans le créer avant.");
        return;
    }

    const fichier = uploadedFiles[selectedSemesterForGroups.value];
    if (!fichier) {
        alert("Veuillez sélectionner un fichier CSV.");
        return;
    }
    await postInscriptionsCSV(createdGroup.value.id, fichier);
    alert("Fichier envoyé avec succès.");

    groupFileInput.value.value = '';
    uploadedFiles[selectedSemesterForGroups.value] = null;
    groupName.value = '';
}
</script>

<style scoped>
@import url("../shared/shared.css");

.header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-section>div {
    display: flex;
    gap: 1rem;
}

#refresh-bdd-btn {
    background-color: var(--color-7);
}

#refresh-bdd-btn:hover {
    background-color: var(--color-6);
}

.file-upload-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.file-upload-section,
.file-group-name {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.file-upload-section>label {
    color: black;
    border-radius: 5px;
    font-size: 1.25rem;
}

.file-upload {
    cursor: pointer;
}

.group-name {
    padding: 0.75rem;
    font-size: 1rem;
    width: max-content;
    border-radius: 5px;
    background-color: var(--color-6);
    border: solid black 2px;
}

#group-name-btn {
    margin: 0;
}

.button {
    align-self: center;
    width: max-content;
}
</style>