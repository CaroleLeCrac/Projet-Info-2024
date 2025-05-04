<!--Page de gestion des groupes-->
<template>
    <main class="left">

        <div class="header-section">
            <h1>Liste des étudiant.e.s</h1>

            <button class="button" id="refresh-bdd-btn" @click="refreshBDD">Vider la base de données</button>
        </div>

        <PromoSelector v-model="selectedSemesterForStudents" />

        <form @submit.prevent="submit" class="file-upload-form">
            <div class="file-upload-section">
                <label :for="'upload-' + selectedSemesterForStudents">Importer le fichier csv pour {{
                    selectedSemesterForStudents }} :</label>
                <input type="file" accept=".csv" class="file-upload" :id="'upload-' + selectedSemesterForStudents"
                    @change="fileChange($event, selectedSemesterForStudents)">
                <button type="submit" class="button">Envoyer le fichier</button>
            </div>
        </form>

        <h1>Création des groupes</h1>

        <PromoSelector v-model="selectedSemesterForGroups" />

        <form @submit.prevent="submit" class="file-upload-form">
            <div class="file-group-name">
                <input type="text" class="group-name" placeholder="Renseigner le nom du groupe">
                <button type="submit" class="button" id="group-name-btn" @change="createGroup">Créer le groupe</button>
            </div>
            <div class="file-upload-section">
                <label :for="'upload-' + selectedSemesterForGroups">Importer le fichier csv des étudiant.e.s du
                    groupe :</label>
                <input type="file" accept=".csv" class="file-upload" :id="'upload-' + selectedSemesterForGroups"
                    @change="fileChange($event, selectedSemesterForGroups)">
                <button type="submit" class="button">Envoyer le fichier</button>
            </div>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import PromoSelector from '@/shared/components/PromoSelector.vue';

function refreshBDD() {
    const confirmRefresh = window.confirm("⚠️ Cette action va vider la base de données. Vous ne pourrez pas revenir en arrière ! Êtes-vous sûr.e ?");
    if (confirmRefresh) {
        //DELETE backend
    }
}

const selectedSemesterForStudents = ref('S1')

const selectedSemesterForGroups = ref('S1')

const uploadedFiles = reactive({})

function fileChange(event, semester) {
    const file = event.target.files[0]
    if (file) {
        uploadedFiles[semester] = file
    }
}

function submit() {
    //Pour gérer l'envoi vers backend ici
    console.log("Fichiers soumis :", uploadedFiles)
}
</script>

<style scoped>
@import url("../shared/shared.css");

.header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
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