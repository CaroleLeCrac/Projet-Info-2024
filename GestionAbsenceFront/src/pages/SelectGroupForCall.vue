<!--Page de sélection du groupe pour faire l'appel-->
<template>
    <main class="left">
        <h1>Sélectionner un groupe</h1>

        <div class="sections-container">
            <div class="section">
                <h2>Groupes de L1</h2>
                <div class="search-container">
                    <SearchIcon class="search-icon" />
                    <input class="search-bar" type="search" v-model="selectedGroupL1"
                        placeholder="Rechercher un groupe de L1">
                </div>

                <ul class="list">
                    <li v-for="group in filteredGroupsL1" :key="group.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${group.id}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="section">
                <h2>Groupes de L2</h2>
                <div class="search-container">
                    <SearchIcon class="search-icon" />
                    <input class="search-bar" type="search" v-model="selectedGroupL2"
                        placeholder="Rechercher un groupe de L2">
                </div>
                <ul class="list">
                    <li v-for="group in filteredGroupsL2" :key="group.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${group.id}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="section">
                <h2>Groupes de L3</h2>
                <div class="search-container">
                    <SearchIcon class="search-icon" />
                    <input class="search-bar" type="search" v-model="selectedGroupL3"
                        placeholder="Rechercher un groupe de L3">
                </div>
                <ul class="list">
                    <li v-for="group in filteredGroupsL3" :key="group.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${group.id}/${group.name}/appel`"
                            class="router-link">
                            {{ group.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>

import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getAllGroups } from '@/shared/fetchers/groups';
import { getAllSemesters } from '@/shared/fetchers/semesters';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedSlotType = route.params.courseType;
const selectedSlotName = route.params.courseName;

const groups = ref([]);
const semesters = ref([]); //pour trier par années dans les sections

onMounted(() => {
    Promise.all([
        getAllGroups(),
        getAllSemesters()
    ])
        .then(([groupRes, semesterRes]) => {
            return Promise.all([groupRes.json(), semesterRes.json()]);
        })
        .then(([groupsData, semestersData]) => {
            groups.value = groupsData.map(g => ({
                ...g,
                semester_name: semestersData.find(s => s.id === g.semester_id)?.name || 'Unknow'
            }));

            semesters.value = semestersData;
        })
        .catch((error) => console.error('Error loading groups and semesters data : ', error))
});

// Filtrage des groupes selon la search-bar et selon la promo
const selectedGroupL1 = ref('');
const filteredGroupsL1 = computed(() =>
    groups.value.filter(g =>
        ['S1', 'S2'].includes(g.semester_name) &&
        g.name.toLowerCase().includes(selectedGroupL1.value.toLowerCase())
    ));

const selectedGroupL2 = ref('');
const filteredGroupsL2 = computed(() =>
    groups.value.filter(g =>
        ['S3', 'S4'].includes(g.semester_name) &&
        g.name.toLowerCase().includes(selectedGroupL2.value.toLowerCase())
    ));

const selectedGroupL3 = ref('');
const filteredGroupsL3 = computed(() =>
    groups.value.filter(g =>
        ['S5', 'S6'].includes(g.semester_name) &&
        g.name.toLowerCase().includes(selectedGroupL3.value.toLowerCase())
    ));

</script>

<style scoped>
@import url("../shared/shared.css");

.router-link {
    width: 200%;
}
</style>