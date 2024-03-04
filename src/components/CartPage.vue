<script setup>
function removeFromCart(item) {
  localStorage.removeItem(item)
}
let cartItems = JSON.parse(localStorage.getItem('cart'))
cartItems = cartItems.spli
console.log(cartItems)
</script>

<template>
  <div class="cart-page">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <div>{{ item.name }}</div>
          <div>{{ item.price }}</div>
          <button @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
}
</style>
