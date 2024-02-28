<script setup>

defineProps([
    'name',
    'description',
    'prices'
]);
</script>

<template>
    <div class="menu-item" :id="name" @load="loadItem(name)">
        <h3 class="menu-item-name">{{ name }}</h3>
        <p class="menu-item-description">{{ description }}</p>
        <div class="menu-item-prices">
            <div class="menu-item-price" v-for="(price, variantName) in prices" :key="variantName">
                <p v-if="variantName !== 0">{{ variantName }}</p>
                <p>${{ price }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border: 5px solid #85ae84;
    border-radius: 10px;
    color: #d2cece;
}

.menu-item > h3 {
    font-weight: bold;
}

.menu-item > div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 60vw;
}

</style>