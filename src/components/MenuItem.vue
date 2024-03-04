<script setup>
import cookieUtils from '../scripts/cookieUtils';

const props = defineProps([
    'name',
    'description',
    'imgSrc',
    'prices'
]);

function getValidCart() {
    let cart = cookieUtils.getCookie('cart');
    if (!Array.isArray(cart.items)) cart.items = [];
    return cart;
}

function selectVariant(variantName) {
    let variantElements = document.getElementsByClassName('menu-item-price');
    for (let i = 0; i < variantElements.length; i++) {
        variantElements.item(i).setAttribute("selected","false");
    }

    let variantElement = document.getElementById(variantName);
    variantElement.setAttribute("selected","true");
}

function addItemToCart(itemName) {
    let cart = getValidCart();
    cart.items.push({
        name: itemName,
        
    });
    cookieUtils.setCookie('cart',cart);
}

</script>

<template>
    <div class="menu-item" :id="name">
        <h3 class="menu-item-name">{{ name }}</h3>
        <img :src="imgSrc" />
        <p class="menu-item-description">{{ description }}</p>
        <div class="menu-item-prices">
            <div class="menu-item-price" selected="false" :class="name" v-for="(price, variantName) in prices" :key="variantName" :id="variantName" @click="selectVariant(variantName)">
                <p v-if="variantName !== 0">{{ variantName }}</p>
                <p>${{ price }}</p>
            </div>
        </div>
        <button @click="addItemToCart(name)">Add to Cart</button>
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
    margin-top: .5rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.menu-item > div {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 60vw;
}

.menu-item-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .15rem;
    margin: 5px;
}

.menu-item-price[selected="true"] {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    border: 5px solid #85ae84;
    border-radius: 10px;
}

.menu-item > img {
    margin: 1rem 0;
    border-radius: .6rem;
}

</style>