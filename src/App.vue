<script setup>
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'  
import AboutPage from './components/AboutPage.vue'
import ReservationsPage from './components/ReservationsPage.vue'

import { ref, computed } from 'vue'


const routes = {
  '/home': HomePage,
  '/menu': MenuPage,
  '/about': AboutPage,
  '/reservations': ReservationsPage
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
  border-radius: 10px;
  font-size: 25px;

}
.link{
  color: green;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.page{
  margin: 0 auto;
  padding: 2rem;
  align-content: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  }
  .app{
    width: 100vw;
    height: 100vh;
  }
</style>
