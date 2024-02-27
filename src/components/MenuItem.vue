<script setup>
defineProps([
    'name',
    'description',
    'price'
]);
</script>

<template>
    <div class="menu-item" :id="name">
        <h3 class="menu-item-name">{{ name }}</h3>
        <p class="menu-item-description">{{ description }}</p>
        <p class="menu-item-price">{{ price }}</p>
    </div>
</template>

<style scoped>



</style>