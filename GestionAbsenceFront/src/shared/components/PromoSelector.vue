<!--Composant de sélection de la promo (L1,L2,L3) pour les pages de Gestion-->
<template>
    <main class="center">
        <div class="promos">
            <button class="" v-for="promo in promos" :key="promo" :class="{ active: promo === selectedPromo }">
                {{ promo }}
            </button>
        </div>
        <div class="selector">
            <button v-for="semester in semesters" :key="semester" @click="selectSemester(semester)"
                :class="{ active: semester === selectedSemester }">
                {{ semester }}
            </button>
        </div>
    </main>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const promos = ['L1', 'L2', 'L3']
const selectedPromo = ref('L1')

const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
const selectedSemester = ref(props.modelValue || 'S1')

function selectSemester(semester) {
    selectedSemester.value = semester

    if (['S1', 'S2'].includes(semester)) {
        selectedPromo.value = 'L1'
    } else if (['S3', 'S4'].includes(semester)) {
        selectedPromo.value = 'L2'
    } else if (['S5', 'S6'].includes(semester)) {
        selectedPromo.value = 'L3'
    }

    emit('update:modelValue', semester)
}
</script>

<style scoped>
@import url("../shared.css");

.selector, .promos {
    display: flex;
    border: 1px solid black;
    background-color: var(--color-6);
    width: 100%;
    margin-top: 1rem;
}

.selector:last-child {
    margin-top: 0;
    border-top: none;
}

.selector button, .promos button {
    flex: 1;
    padding: 1rem;
    background-color: var(--color-5);
    border: none;
    border-right: 1px solid black;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
}

.selector button:last-child, .promos button:last-child {
    border-right: none;
}

.selector button.active, .promos button.active {
    background-color: var(--color-4);
}

.selector button:hover:not(.active) {
    background-color: var(--color-6);
}
</style>