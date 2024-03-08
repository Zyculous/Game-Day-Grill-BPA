<script setup>

defineProps([
    'id',
    'name',
    'variant',
    'price',
    'removeFromCart'
]);

</script>

<template>
  <tr class="cart-item">
    <td>{{ name }}</td>
    <td>{{ variant !== 'Default' ? variant : '-' }}</td>
    <td>${{ price }}</td>
    <button @click="removeFromCart(id)">Remove</button>
  </tr>
</template>

<style scoped>

.cart-item > * {
  text-align: center;
  padding: .1rem .3rem;
}

</style>
