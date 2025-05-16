<!--Composant de sélection du semestre (du S1 au S6) pour la page de Gestion des étudiant.e.s-->
<template>
    <main class="center">
        <div class="promos">
            <button class="" v-for="promo in promos" :key="promo" :class="{ active: promo === selectedPromo }">
                {{ promo }}
            </button>
        </div>
        <div class="selector">
            <button v-for="semester in semesters" :key="semester.id" @click="selectPromo(semester)"
                :class="{ active: semester.name === selectedSemester }">
                {{ semester.name }}
            </button>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllSemesters } from '../fetchers/semesters'

const props = defineProps({
    modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const promos = ['L1', 'L2', 'L3']
const selectedPromo = ref('L1')

const semesters = ref([]);
const selectedSemester = ref(props.modelValue || semesters.value[0].name)

/**Pour charger les données de manière asynchrone */
onMounted(async () => {
    const discoredSemesters = await getAllSemesters();
    // Tri des semestres dans l'ordre croissant (du S1 au S6)
    semesters.value = discoredSemesters.sort((a, b) => {
        const numA = parseInt(a.name.slice(1));
        const numB = parseInt(b.name.slice(1));
        return numA - numB;
    })
})

/**
 * Sélectionne la promo (L1 ou L2 ou L3) correspondant au semestre sélectionné.
 * 
 * @function
 * @param semester - v-model du semestre sélectionné
 */
function selectPromo(semester) {
    selectedSemester.value = semester.name

    if (['S1', 'S2'].includes(semester.name)) {
        selectedPromo.value = 'L1'
    } else if (['S3', 'S4'].includes(semester.name)) {
        selectedPromo.value = 'L2'
    } else if (['S5', 'S6'].includes(semester.name)) {
        selectedPromo.value = 'L3'
    }

    emit('update:modelValue', semester.name)
}
</script>

<style scoped>
@import url("../shared.css");

.selector,
.promos {
    display: flex;
    border: 1px solid black;
    background-color: var(--color-6);
    width: 100%;
    margin-top: 0rem;
}

.selector {
    margin-bottom: 1rem;
}

.selector:last-child {
    margin-top: 0;
    border-top: none;
}

.selector button,
.promos button {
    flex: 1;
    padding: 0.5rem;
    background-color: var(--color-5);
    border: none;
    border-right: 1px solid black;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
}

.selector button:last-child,
.promos button:last-child {
    border-right: none;
}

.selector button.active,
.promos button.active {
    background-color: var(--color-4);
}

.selector button:hover:not(.active) {
    background-color: var(--color-6);
}
</style>