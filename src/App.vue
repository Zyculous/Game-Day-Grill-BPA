<script setup>
import { ref, computed } from 'vue';

import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'
import AboutPage from './components/AboutPage.vue'
import ReservationsPage from './components/ReservationsPage.vue'
import TestPage from './components/TestPage.vue'
import NavBar from './components/NavBar.vue'
import CartPage from './components/CartPage.vue'

const routes = {
  '/home': {"page": HomePage, "navbarName": "Home", "hidden": false },
  '/menu': {"page": MenuPage, "navbarName": "Menu", "hidden": false },
  '/about': {"page": AboutPage, "navbarName": "About", "hidden": false },
  '/reservations': {"page": ReservationsPage, "navbarName": "Reservations", "hidden": false },
  '/test2': {"page": TestPage, "navbarName": "Test 2", "hidden": true },
  '/cart': {"page": CartPage, "navbarName": "Cart", "hidden": false }
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'].page || NotFound;
})

</script>

<template>
  <div class="app">
    <NavBar :routes="routes"></NavBar>
    <div class="page" id="page">
      <component :is="currentView" />
    </div>
  </div>
</template>

<style scoped>

.app {
  position: absolute;
  align-content: center;
  width: 100%;
  min-height: 100%;
}

.page {
  position:absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 94%;
}
</style>
