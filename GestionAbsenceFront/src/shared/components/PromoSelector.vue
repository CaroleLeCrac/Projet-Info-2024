<!--Composant de sélection de la promo (L1,L2,L3) pour les pages de Gestion-->
<template>
    <main class="center">
        <div class="promo-selector">
            <button v-for="promo in promos" :key="promo" @click="selectPromo(promo)"
                :class="{ active: promo === selectedPromo }">
                {{ promo }}
            </button>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const promos = ['L1', 'L2', 'L3']
const selectedPromo = ref(props.modelValue || 'L1')

function selectPromo(promo) {
    selectedPromo.value = promo
    emit('update:modelValue', promo)
}
</script>

<style scoped>
@import url("../shared.css");

.promo-selector {
    display: flex;
    border: 1px solid black;
    background-color: var(--color-6);
    width: 100%;
    margin-top: 1rem;
}

.promo-selector button {
    flex: 1;
    padding: 1rem;
    background-color: var(--color-5);
    border: none;
    border-right: 1px solid black;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
}

.promo-selector button:last-child {
    border-right: none;
}

.promo-selector button.active {
    background-color: var(--color-4);
}

.promo-selector button:hover:not(.active) {
    background-color: var(--color-6);
}
</style>