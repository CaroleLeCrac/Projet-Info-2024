<!--Composant du fil d'ariane-->
<template>
    <nav class="breadcrumb">
        <ul>
            <li v-for="(step, index) in steps" :key="index">
                <span v-if="step.to && index !== steps.length-1">
                    <RouterLink :to="step.to" class="breadcrumb-router-link">{{ step.label }}</RouterLink>
                </span>
                <span v-else>{{ step.label }}</span>
                <span v-if="index < steps.length-1" class="separator"> > </span>
            </li>
        </ul>
    </nav>
</template>

<script setup>
defineProps({ steps: Array });
</script>

<style scoped>
@import url("../shared.css");

.breadcrumb ul {
  list-style: none;
  display: flex;
  gap: 0.25rem;
  font-size: 1rem;
  padding-left: 1rem;
  margin-bottom: 0;
  color: var(--color-2);
}

.breadcrumb .breadcrumb-router-link {
    text-decoration: none;
    cursor: pointer;
    color: var(--color-2);
}

.breadcrumb .breadcrumb-router-link:hover {
    color: var(--color-1);
}

.breadcrumb .separator {
    color: black;
}

</style>