<script setup>
import HomePage from './components/HomePage.vue'
import MenuPage from './components/MenuPage.vue'
import NotFound from './components/NotFound.vue'
import AboutPage from './components/AboutPage.vue'
import ReservationsPage from './components/ReservationsPage.vue'
import TestPage from './components/TestPage.vue'

import { ref, computed, nextTick } from 'vue'
import anime from 'animejs'

const routes = {
  '/home': HomePage,
  '/menu': MenuPage,
  '/about': AboutPage,
  '/reservations': ReservationsPage,
  '/test2': TestPage
}

const currentPath = ref(window.location.hash)
console.log(currentPath.value)
window.addEventListener('hashchange', () => {
  loadPage();
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
function loadPage() {
  nextTick(() => {
    console.log("Loading page")
    anime({
      targets: '.page',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: 'easeInOutCubic'
    });

    let backgroundColors = [
      {value: () => `rgb(${anime.random(50, 14)}, ${anime.random(168, 184)}, ${anime.random(70, 98)})`}, //Purple color scale
      {value: () => `rgb(${anime.random(200, 145)}, ${anime.random(30, 10)}, ${anime.random(20, 4)})`}, //Red color scale
      {value: () => `rgb(${anime.random(135, 68)}, ${anime.random(60, 2)}, ${anime.random(230, 156)})`}, //Cyan color scale
      {value: () => `rgb(${anime.random(81, 29)}, ${anime.random(217, 128)}, ${anime.random(43, 1)})`}, //Green color scale
      {value: () =>`rgb(${anime.random(128, 255)}, ${anime.random(1, 74)}, ${anime.random(100, 216)})`}, //Pink color scale
      {value: () =>`rgb(${anime.random(255, 181)}, ${anime.random(243, 169)}, ${anime.random(74, 4)})`}, //Yellow color scale
      {value: () =>`rgb(${anime.random(83, 5)}, ${anime.random(247, 151)}, ${anime.random(252, 156)})`} //Light blue color scale
    ];
    for (let i = 0; i < 1000; i++) {
      let block
      block = document.createElement('div')
      block.classList.add('square')
      block.style.display = 'flex'
      block.style.top = `${anime.random(0, 100)}%`
      block.style.left = `${anime.random(0, 100)}%`
      block.id = `block${i}`
      document.getElementById('page').appendChild(block);

      anime({
        targets: block,
        backgroundColor: backgroundColors,
        translateY: anime.random(-100, 100),
        translateX: anime.random(-100, 100),
        duration: anime.random(100, 2000),
        easing: 'easeInOutCubic',
        complete: function() {
          document.getElementById('page').removeChild(document.getElementById(`block${i}`));
        }
      });
      
    }
  });
}
</script>

<template>
  <div class="app">
    <div class="navbar">
      <a class="link" href="#/home">Home</a> <p>|</p> 
      <a class="link" href="#/menu">Menu</a> <p>|</p>
      <a class="link" href="#/reservations">Reservations</a> <p>|</p>
      <a class="link" href="#/about">About</a> <p>|</p>
    </div>
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

.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6%;
  border-bottom: .1rem solid var(--color-border);
}

.navbar > * {
  font-size: 1.5rem;
  margin: .1rem .5rem;
  text-decoration: none;
}

.navbar > p {
  color: var(--color-border);
}

.navbar > a {
  color: var(--color-highlight-1);
}

</style>
