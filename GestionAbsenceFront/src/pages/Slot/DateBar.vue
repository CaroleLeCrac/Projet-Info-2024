<script setup>
import { ref } from 'vue';

const date=ref(new Date());

function formatDate(date) {
    const format = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString(undefined,format);
}

function previousDate() {
    date.value.setDate(date.value.getDate()-1);
    date.value = new Date(date.value);
}

function nextDate() {
    date.value.setDate(date.value.getDate()+1);
    date.value = new Date(date.value);
}

</script>

<template>
<nav class="date-bar">
    <button class="previous-date" @click="previousDate">←</button>
    <span class="date">{{ formatDate(date) }}</span>
    <button class="next-date" @click="nextDate">→</button>
</nav>
</template>

<style>
.date-bar {
    background-color: white;
    padding: 10px;
    display: flex;
}

.previous-date {
    background-color: white;
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
}

.date {
    background-color: white;
    color: black;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    line-height: 2;
}

.next-date {
    background-color: white;
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
}

.previous-date:hover {
    background-color: #cecece;
}

.next-date:hover {
    background-color: #cecece;
}

</style>