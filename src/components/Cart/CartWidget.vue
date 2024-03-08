<script setup>
import { ref, computed } from 'vue';
import anime from 'animejs';
import cookieUtils from '@/scripts/cookieUtils';
import menu from '@/assets/json/menu.json';
import cartValidation from '@/assets/validation/cart.json';
import CartItem from './CartItem.vue';

let debounce = false;

let menuOpen = false;

function toggleMenu() {
    if (debounce) return;

    debounce = true;

    if (menuOpen) {
        menuOpen = false;
        anime({ // Widget Move
            targets: '.cart-widget',
            easing: 'easeInOutCubic',
            duration: 300,
            translateX: ['-20rem',0],
            complete: () => {
                debounce = false;
            }
        });
    } else {
        menuOpen = true;
        anime({ // Widget Move
            targets: '.cart-widget',
            easing: 'easeInOutCubic',
            duration: 300,
            translateX: [0,'-20rem'],
            complete: () => {
                debounce = false;
            }
        });
    }
}

function removeFromCart(id) {
  cart.value.items = cart.value.items.filter((item) => item.id != id);

  cookieUtils.setCookie('cart',cart.value);
}

let cart = ref(cookieUtils.getCookie('cart',cartValidation));
let cartComputed = computed(() => cart.value);

let prices = computed(() => {
  let priceDict = {};

  for (let i = 0; i < cart.value.items.length; i++) {
    let item = cart.value.items[i];
    priceDict[item.id] = menu[item.category]
      .filter((categoryItem) => item.name === categoryItem.name)[0]
      .variants.filter((variant) => variant.name === item.variant)[0].price;
  }

  return priceDict;
});

</script>

<template>
    <div class="cart-widget">
        <div class="cart-widget-selector" @click="toggleMenu()"></div>
        <div class="cart-widget-display">
            <div v-if="cartComputed.items.length === 0" class="cart-empty">
                <p>Your cart is empty.</p>
            </div>
            <table v-else class="cart-items">
            <CartItem
                v-for="item in cartComputed.items"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :variant="item.variant"
                :price="prices[item.id]"
                :removeFromCart="removeFromCart"
            />
            </table>
        </div>
    </div>
</template>

<style scoped>

.cart-widget {
    position: fixed;
    right: 0;
    top: 10rem;
    z-index: 900;
}

.cart-widget-selector {
    position: fixed;
    width: 4rem;
    height: 4rem;
    border: .3rem solid var(--color-highlight-1);
    border-right: 0;
    border-radius: .6rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    right: -.3rem;
    background-color: var(--color-background);
    z-index: 901;
}

.cart-widget-display {
    position: fixed;
    width: 20rem;
    height: 24rem;
    border: .3rem solid var(--color-highlight-1);
    border-right: 0;
    border-radius: .6rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 900;
    top: -4rem;
    background-color: var(--color-background);
}

</style>