<script setup>
import HelloWorldPage from './components/HelloWorld.vue';
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'  
import AboutPage from './components/AboutPage.vue'
import ReservationsPage from './components/ReservationsPage.vue'
import TestPage from './components/TestPage.vue';

import { ref, computed } from 'vue'


const routes = {
  '/home': HomePage,
  '/menu': MenuPage,
  '/about': AboutPage,
  '/reservations': ReservationsPage,
  '/test': HelloWorldPage,
  '/test2': TestPage
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
    <div class="navbar">
      <a class="link" href="#/home">Home</a> |
      <a class="link" href="#/menu">Menu</a> |
      <a class="link" href="#/reservations">Reservations</a> |
      <a class="link" href="#/about">About</a> |
    </div>
    <component class="page" :is="currentView" />
  </div>
</template>

<style scoped>
.navbar {
  background-color: #333;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0vw;
  border-radius: 10px;
  font-size: 25px;
  z-index: 999;
}
.link{
  color: green;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.page{
  margin: 0 auto;
  padding: 3rem 2rem;
  align-content: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  }
.app{
  position: relative;
  width: 96vw;
  height: 100vh;
  left: 2vw;
}
</style>
