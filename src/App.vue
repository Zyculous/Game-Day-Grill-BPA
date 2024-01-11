<script setup>
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'  

import { ref, computed } from 'vue'


const routes = {
  '/home': HomePage,
  '/menu': MenuPage
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
      <a href="#/home">Home</a> |
      <a href="#/menu">Menu</a> |
      <a href="#/about">About</a> |
      <a href="#/non-existent-path">Broken Link</a>
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
}
.page{
  margin: 0 auto;
  padding: 2rem;
}
</style>
