<script setup>
import anime from 'animejs';

let documentRect = document.body.getBoundingClientRect();

let categoriesExpanded = false;
let categoryAnimations = [];

let categoryIDs = ["A", "B", "C"];

function handleCategoryClicked(categoryID) {
  if (!categoriesExpanded) {
    categoriesExpanded = true;

    let i = categoryIDs.indexOf(categoryID);

    let leftCategories = categoryIDs.slice(0,i).map(item => document.getElementById(item));
    //let selectedCategory = document.getElementById(categoryID);
    let rightCategories = categoryIDs.slice(i+1,categoryIDs.length).map(item => document.getElementById(item));

    categoryAnimations = [
      anime({ // Left Animation
        targets: leftCategories,
        delay: anime.stagger(100, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 350,
        opacity: [1, 0],
        translateX: '-10rem',
        update: (anim) => {
          anim.animatables.forEach(entry => {
            let element = entry.target;
            let rect = element.getBoundingClientRect();
            if (rect.left < 0 || rect.right > documentRect.right) element.style.display = 'none'
            else element.style.display = 'auto' 
          });
        }
      }),
      anime({ // Right Animation
        targets: rightCategories,
        delay: anime.stagger(100, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 350,
        opacity: [1, 0],
        translateX: [0, '10rem'],
        update: (anim) => {
          anim.animatables.forEach(entry => {
            let element = entry.target;
            let rect = element.getBoundingClientRect();
            if (rect.left < 0 || rect.right > documentRect.right) element.style.display = 'none'
            else element.style.display = 'auto' 
          });
        }
      })
    ];
  } else {
    categoriesExpanded = false;
    categoryAnimations.forEach(animation => animation.reverse());
    categoryAnimations.forEach(animation => animation.play());
  }
}

</script>

<template>
  <div class="greetings">
    <div class="bar">
      <div class="category" v-for="categoryID in categoryIDs" :key="categoryID" @click="handleCategoryClicked(categoryID)" :id="categoryID">{{ categoryID }}</div>
    </div>
  </div>
</template>

<style scoped>

.bar {
  display: flex;
  flex-direction: row;
}

.category {
  margin: .25rem .5rem;
  padding: .25rem .5rem;
  border: .2rem solid;
  border-color: var(--color-border);
  border-radius: .2rem;
}

</style>
