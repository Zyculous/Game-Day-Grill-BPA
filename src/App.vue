<script setup>
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'
import AboutPage from './components/AboutPage.vue'
import ReservationsPage from './components/ReservationsPage.vue'
import TestPage from './components/TestPage.vue'
import NavBar from './components/NavBar.vue'

import { ref, computed } from 'vue'

const routes = {
  '/home': HomePage,
  '/menu': MenuPage,
  '/about': AboutPage,
  '/reservations': ReservationsPage,
  '/test2': TestPage
}
const navBar = {
  '/home': 'Home',
  '/menu': 'Menu',
  '/about': 'About',
  '/reservations': 'Reservations',
  '/test2': 'Test'
}

const currentPath = ref(window.location.hash)
console.log(currentPath.value)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <div class="app">
    <NavBar :routes="navBar"></NavBar>
    <!--<div class="navbar">
      <a class="link" href="#/home">Home</a> <p>|</p> 
      <a class="link" href="#/menu">Menu</a> <p>|</p>
      <a class="link" href="#/reservations">Reservations</a> <p>|</p>
      <a class="link" href="#/about">About</a> <p>|</p>
    </div>-->
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
