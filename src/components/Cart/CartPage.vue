<script setup>
import { ref, computed } from 'vue';
import menu from '@/assets/json/menu.json';
import cookieUtils from '@/scripts/cookieUtils';
import cartValidation from '@/assets/validation/cart.json';

import CartItem from './CartItem.vue';

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
  <div>
    <h1 class="cart-title">Shopping Cart</h1>
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
</template>

<style scoped>

.cart-title {
  text-align: center;
  padding: .3rem;
  color: var(--color-highlight-1);
}

.cart-empty {
  text-align: center;
}

button {
  padding: 5px 10px;
}
</style>
../../scripts/cookieUtils