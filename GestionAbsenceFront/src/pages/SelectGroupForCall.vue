<!--Page de sélection du groupe pour faire l'appel-->
<template>
    <main class="center">
        <h1>Sélectionner un groupe</h1>

        <div class="sections-container">
            <div class="section">
                <h2>Groupes de L1</h2>
                <input class="search-bar" type="search" v-model="selectedGroupL1"
                    placeholder="Rechercher un groupe de L1">
                <ul class="list">
                    <li v-for="group in filteredGroupsL1" :key="group.groupNumber">
                        <RouterLink
                            :to="`/${selectedSlotType}/${selectedSlotName}/${group.groupNumber}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="section">
                <h2>Groupes de L2</h2>
                <input class="search-bar" type="search" v-model="selectedGroupL2"
                    placeholder="Rechercher un groupe de L2">
                <ul class="list">
                    <li v-for="group in filteredGroupsL2" :key="group.groupNumber">
                        <RouterLink
                            :to="`/${selectedSlotType}/${selectedSlotName}/${group.groupNumber}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="section">
                <h2>Groupes de L3</h2>
                <input class="search-bar" type="search" v-model="selectedGroupL3"
                    placeholder="Rechercher un groupe de L3">
                <ul class="list">
                    <li v-for="group in filteredGroupsL3" :key="group.groupNumber">
                        <RouterLink
                            :to="`/${selectedSlotType}/${selectedSlotName}/${group.groupNumber}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedSlotType = route.params.courseType;
const selectedSlotName = route.params.courseName;
console.log(selectedSlotName + selectedSlotType)

const groups = ref([]);

onMounted(() => {
    fetch('/Groups.json')
        .then((response) => response.json())
        .then((data) => {
            groups.value = data.groups
        })
        .catch((error) => console.error('Error loading groups data : ', error))
});

// Filtrage des groupes selon la search-bar et selon la promo
const selectedGroupL1 = ref('');
const filteredGroupsL1 = computed(() =>
    groups.value.filter(g =>
        (g.semester === "S1" || g.semester === "S2") &&
        g.name.toLowerCase().includes(selectedGroupL1.value.toLowerCase())
    ));

const selectedGroupL2 = ref('');
const filteredGroupsL2 = computed(() =>
    groups.value.filter(g =>
        (g.semester === "S3" || g.semester === "S4") &&
        g.name.toLowerCase().includes(selectedGroupL2.value.toLowerCase())
    ));

const selectedGroupL3 = ref('');
const filteredGroupsL3 = computed(() =>
    groups.value.filter(g =>
        (g.semester === "S5" || g.semester === "S6") &&
        g.name.toLowerCase().includes(selectedGroupL3.value.toLowerCase())
    ));

</script>

<style scoped>
@import url("../shared/shared.css");

.router-link {
    width: 200%;
}
</style>