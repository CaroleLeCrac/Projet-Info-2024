<!--Page de gestion des groupes-->
<template>
    <main class="left">
        <PromoSelector v-model="selectedPromo" />

        <h1>Joindre les fichiers .csv ou .xlsx</h1>

        <form @submit.prevent="submit" class="file-upload-form">
            <div class="forms-container">
                <div class="form-column">
                    <div class="file-upload-section" v-for="section in sections" :key="section.name">
                        <button type="button" class="file-upload-btn" @click="fileInput(section.name)">
                            {{ section.label }}
                        </button>
                        <input type="file" accept=".csv,.xlsx" :ref="el => fileInputs[section.name] = el"
                            class="file-upload" @change="fileChange($event, section.name)" />
                        <span v-if="uploadedFiles[section.name]">
                            📁 {{ uploadedFiles[section.name].name }}
                        </span>
                    </div>
                </div>

                <div v-if="options.length > 0" class="form-column">
                    <div class="file-upload-section" v-for="option in options" :key="option.name">
                        <button type="button" class="file-upload-btn" @click="fileInput(option.name)">
                            {{ option.label }}
                        </button>
                        <input type="file" accept=".csv,.xlsx" :ref="el => fileInputs[option.name] = el"
                            class="file-upload" @change="fileChange($event, option.name)" />
                        <span v-if="uploadedFiles[option.name]">
                            📁 {{ uploadedFiles[option.name].name }}
                        </span>
                    </div>
                </div>
            </div>

            <button type="submit" class="button">Envoyer les fichiers</button>
        </form>
    </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import PromoSelector from '@/shared/components/PromoSelector.vue';

const selectedPromo = ref('L1')
const options = ref([])

const sections = [
    { name: 'etudiants', label: 'Étudiant.e.s' },
    { name: 'groupes', label: 'Groupes de TD/TP/TM' },
    { name: 'cours', label: 'Cours Communs' }
]

const fileInputs = ref({})
const uploadedFiles = reactive({})

function fileInput(name) {
    fileInputs.value[name]?.click()
}

function fileChange(event, name) {
    const file = event.target.files[0]
    if (file) {
        uploadedFiles[name] = file
    }
}

function submit() {
    //Pour gérer l'envoi vers backend ici
    console.log("Fichiers soumis :", uploadedFiles)
}

onMounted(() => {
    fetch('/Options.json')
        .then((response) => response.json())
        .then((data) => {
            options.value = data.options.map(opt => ({
                name: `option-${opt.name}`,
                label: opt.name
            }));
        })
        .catch(error => console.error("Error loading options data : ", error))
});
</script>

<style scoped>
@import url("../../shared/shared.css");

.file-upload-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.forms-container {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
}

.form-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.file-upload-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.file-upload-btn {
    background-color: var(--color-6);
    color: black;
    border: black 2px solid;
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
}

.file-upload-btn:hover {
    background-color: var(--color-4);
}

.file-upload {
    display: none;
}

.button {
    align-self: center;
    width: 30%;
}
</style>