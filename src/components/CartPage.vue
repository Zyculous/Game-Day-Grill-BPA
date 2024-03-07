<script setup>
import { ref, computed } from 'vue';
import menu from '../assets/json/menu.json';
import cookieUtils from '../scripts/cookieUtils';
import cartValidation from '../assets/validation/cart.json';

function removeFromCart(id) {
  cart.value.items = cart.value.items.filter((item) => item.id != id);

  cookieUtils.setCookie('cart',cart.value);
}

let cart = ref(cookieUtils.getCookie('cart',cartValidation));
let cartComputed = computed(() => cart.value);

</script>

<template>
  <div>
    <h1 class="cart-title">Shopping Cart</h1>
    <div v-if="cartComputed.items.length === 0" class="cart-empty">
      <p>Your cart is empty.</p>
    </div>
    <table v-else class="cart-items">
      <tr v-for="item in cartComputed.items" :key="item.id" class="cart-item">
        <td>{{ item.name }}</td>
        <td>{{ item.variant !== 'Default' ? item.variant : '-' }}</td>
        <td>${{ menu[item.category]
          .filter((categoryItem) => item.name === categoryItem.name)[0]
          .variants.filter((variant) => variant.name === item.variant)[0].price }}
        </td>
        <button @click="removeFromCart(item.id)">Remove</button>
      </tr>
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

.cart-item > * {
  text-align: center;
  padding: .1rem .3rem;
}

button {
  padding: 5px 10px;
}
</style>
