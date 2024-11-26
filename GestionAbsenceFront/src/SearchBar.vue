<template>
<div>
    <input type="text" v-model="query" @input="etusFilter"/>
    <p>test</p>
    <ul>
        <li v-for="(etu, i) in filteredEtus" :key="i"></li>
    </ul>
</div>

</template>
<script setup>
const props = defineProps({
    etus : Array
})

const filteredEtus=etus
const etusFilter = (filteredEtus) => {
    filteredEtus = etus.filter((etu) => etu.toLowerCase().includes(this.query.toLowerCase())
)}
</script>