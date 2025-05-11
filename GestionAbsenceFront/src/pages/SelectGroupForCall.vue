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
                    <li v-for="groupL1 in filteredGroupsL1" :key="groupL1.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${groupL1.id}/${groupL1.name}/appel`"
                            class="router-link">
                            {{ groupL1.name }}</RouterLink>
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
                    <li v-for="groupL2 in filteredGroupsL2" :key="groupL2.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${groupL2.id}/${groupL2.name}/appel`"
                            class="router-link">
                            {{ groupL2.name }}</RouterLink>
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
                    <li v-for="groupL3 in filteredGroupsL3" :key="groupL3.id">
                        <RouterLink :to="`/${selectedSlotType}/${selectedSlotName}/${groupL3.id}/${groupL3.name}/appel`"
                            class="router-link">
                            {{ groupL3.name }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>

import SearchIcon from '@/shared/assets/icon/SearchIcon.vue';
import { getGroupByYear } from '@/shared/fetchers/groups';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedSlotType = route.params.sessionType;
const selectedSlotName = route.params.courseName;

const groupsL1 = ref([]);
const groupsL2 = ref([]);
const groupsL3 = ref([]);

onMounted(async () => {
    groupsL1.value = await getGroupByYear(1);
    groupsL2.value = await getGroupByYear(2);
    groupsL3.value = await getGroupByYear(3);
});

// Filtrage des groupes selon la search-bar et selon la promo
const selectedGroupL1 = ref('');
const filteredGroupsL1 = computed(() =>
    groupsL1.value.filter(g =>
        g.name.toLowerCase().includes(selectedGroupL1.value.toLowerCase())
    ));

const selectedGroupL2 = ref('');
const filteredGroupsL2 = computed(() =>
    groupsL2.value.filter(g =>
        g.name.toLowerCase().includes(selectedGroupL2.value.toLowerCase())
    ));

const selectedGroupL3 = ref('');
const filteredGroupsL3 = computed(() =>
    groupsL3.value.filter(g =>
        g.name.toLowerCase().includes(selectedGroupL3.value.toLowerCase())
    ));

</script>

<style scoped>
@import url("../shared/shared.css");

.router-link {
    width: 200%;
}
</style>