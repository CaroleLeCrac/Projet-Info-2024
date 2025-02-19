<script setup>
import { ref } from 'vue';

const date = ref(new Date());
const emit = defineEmits(['dateChanged']);

function formatDate(date) {
    const format = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, format);
}

function previousDate() {
    date.value.setDate(date.value.getDate() - 1);
    date.value = new Date(date.value);
    emit('dateChanged', date.value);
}

function nextDate() {
    date.value.setDate(date.value.getDate() + 1);
    date.value = new Date(date.value);
    emit('dateChanged', date.value);
}

emit('dateChanged', date.value);

</script>

<template>
    <div class="date-bar">
        <button class="previous-date" @click="previousDate">←</button>
        <span class="date">{{ formatDate(date) }}</span>
        <button class="next-date" @click="nextDate">→</button>
    </div>
</template>

<style>
@import url("../../shared/shared.css");

div.date-bar {
    padding: 0;
    border: black 2px solid;
    display: inline-block;
    margin-bottom: 1.5rem;
    margin-left: 2rem;
}

button.previous-date, button.next-date {
    background-color: var(--color-4);
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
    border: hidden;
}

span.date {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    background-color: var(--color-4);
}

.previous-date:hover {
    background-color: var(--color-6);
    border-right: black 2px solid;
}

.next-date:hover {
    background-color: var(--color-6);
    border-left: black 2px solid;
}
</style>