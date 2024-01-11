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
  <a href="#/home">Home</a> |
  <a href="#/menu">Menu</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>

<style scoped>

</style>
