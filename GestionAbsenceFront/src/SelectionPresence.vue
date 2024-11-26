<template>
    <label>
        <input type="checkbox" class="checkbox">
        {{label}}
    </label>
</template>

<script setup>
const props = defineProps({
    label : String
})
</script>

<style scoped>
.checkbox{
    height: 30px;
    width: 30px;
    vertical-align: middle;
    cursor: pointer;
}

</style>