<script setup>
import cookieUtils from '@/scripts/cookieUtils';
import cartValidation from '@/assets/validation/cart.json';
import anime from 'animejs';
import { nextTick } from 'vue';

const props = defineProps([
    'name',
    'description',
    'imgSrc',
    'variants',
    'category'
]);

let isNoVariantItem = props.variants.length <= 1

let selectedVariant = "Default";
function selectVariant(variantName) {
    if (isNoVariantItem) return;

    let variantElements = document.getElementsByClassName('menu-item-price');
    for (let i = 0; i < variantElements.length; i++) {
        variantElements.item(i).setAttribute("selected","false");
    }

    let variantElement = document.getElementById(variantName);
    variantElement.setAttribute("selected","true");
    selectedVariant = variantName;
}

function addItemToCart(itemName) {
    let cart = cookieUtils.getCookie('cart',cartValidation);

    cart.items.push({
        category: props.category,
        name: itemName,
        id: cart.nextID++,
        variant: selectedVariant
    });

    cookieUtils.setCookie('cart',cart);
    addCartAnimation(itemName);
}

function addCartAnimation(itemName){
    let item = document.getElementById(itemName).children[1];
    let itemRect = item.getBoundingClientRect();
    let parent = item.parentElement;
    let cartWidget = document.querySelector('.cart-widget');
    let cartWidgetRect = cartWidget.getBoundingClientRect();
    let clone = item.cloneNode(true);
    clone.id = "cloneof" + itemName;
    parent.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.zIndex = 1000;
    //clone.style.left = itemRect.left + 'px';
    //clone.style.top = itemRect.top + 'px';

    nextTick( () => {
        anime({
        targets: clone,
        translateX: (cartWidgetRect.left - itemRect.left),
        translateY: (-cartWidgetRect.top - itemRect.top),
        scale: .01,
        duration: 1700,
        easing: "easeInOutExpo",
        complete: () => {
            parent.removeChild(clone);
        }
        });
        anime({
            targets: item,
            opacity: [-10, 1],
            duration: 1000,
            direction: 'forwards',
        })
    });
}

</script>

<template>
    <div class="menu-item" :id="name">
        <h3 class="menu-item-name">{{ name }}</h3>
        <img :src="imgSrc" />
        <p class="menu-item-description">{{ description }}</p>
        <div class="menu-item-prices">
            <div class="menu-item-price" selected="false" :class="name" v-for="variant in variants" :key="variant.name" :id="variant.name" @click="selectVariant(variant.name)">
                <p v-if="variant.name !== 'Default'">{{ variant.name }}</p>
                <p>${{ variant.price }}</p>
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
    margin: .6rem;
    padding: .6rem;
    border: .3rem solid var(--color-highlight-1);
    border-radius: .6rem;
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

</style>../../scripts/cookieUtils