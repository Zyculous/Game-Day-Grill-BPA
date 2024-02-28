<script setup>
import { computed, reactive } from 'vue';
import MenuItem from './MenuItem.vue';
import menu from '../assets/json/menu.json';
import anime from 'animejs';

let documentRect = document.body.getBoundingClientRect();

let categoriesExpanded = false;
let categoryAnimations = [];

let categoryIDs = Object.keys(menu);

const selectedCategoryID = reactive({ id: "" });

let menuItems = computed(() => {
  console.log(selectedCategoryID);
  return menu[selectedCategoryID.id] || [];
});

function handleCategoryClicked(categoryID) {
  if (!categoriesExpanded) {
    categoriesExpanded = true;

    let i = categoryIDs.indexOf(categoryID);

    let menuTitle = document.getElementById('menu-title');
    let leftCategories = categoryIDs.slice(0,i).map(item => document.getElementById(item));
    let selectedCategory = document.getElementById(categoryID);
    let rightCategories = categoryIDs.slice(i+1,categoryIDs.length).map(item => document.getElementById(item));

    let menuTitleRect = menuTitle.getBoundingClientRect();
    let selectedCategoryRect = selectedCategory.getBoundingClientRect();

    let selectedCategoryOffsetX = 0.5*(menuTitleRect.right + menuTitleRect.left - selectedCategoryRect.right - selectedCategoryRect.left);

    let selectedCategoryWidth = menuTitleRect.right - menuTitleRect.left;

    categoryAnimations = [
      anime({ // Title Animation
        targets: menuTitle,
        easing: 'easeInOutCubic',
        duration: 600,
        opacity: [1, -1],
        height: 0
      }),
      anime({ // Left Animation
        targets: leftCategories,
        delay: anime.stagger(75),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '-10rem',
        update: (anim) => {
          anim.animatables.forEach(entry => {
            let element = entry.target;
            let rect = element.getBoundingClientRect();
            if (rect.left < 0 || rect.right > documentRect.right) element.style.visibility = 'hidden'
            else element.style.visibility = 'visible' 
          });
        }
      }),
      anime({ // Selected Animation
        targets: selectedCategory,
        easing: 'easeInOutCubic',
        duration: 600,
        translateX: `${selectedCategoryOffsetX}px`,
        width: `${selectedCategoryWidth}px`,
      }),
      anime({ // Right Animation
        targets: rightCategories,
        delay: anime.stagger(75, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '10rem',
        update: (anim) => {
          anim.animatables.forEach(entry => {
            let element = entry.target;
            let rect = element.getBoundingClientRect();
            if (rect.left < 0 || rect.right > documentRect.right) element.style.visibility = 'hidden'
            else element.style.visibility = 'visible' 
          });
        }
      })
    ];

    selectedCategoryID.id = categoryID;
  } else {
    categoriesExpanded = false;

    categoryAnimations.forEach(animation => animation.reverse());
    categoryAnimations.forEach(animation => animation.play());

    selectedCategoryID.id = "";
  }
}

</script>

<template>
    <div class="menu-page">
        <button @click="testFunction">A</button>
        <h1 class="center title" text= "Menu&nbsp;Page" id="menu-title">Menu&nbsp;Page</h1>
        <div class="menu">
            <div class="category" :id="categoryID" @click="handleCategoryClicked(categoryID)" v-for="categoryID in categoryIDs" :key="categoryID">
                <h2 class="green center point">{{ categoryID }}</h2>
            </div>
        </div>
        <div class="center" id="menu-item-container">
          <MenuItem :name="menuItem.name" v-for="menuItem in menuItems" v-show="true" :key="menuItem.name"></MenuItem>
        </div>
    </div>
</template>

<style scoped>
.menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
}
.title{
  color: #85ae84;
}
.category{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border: 5px solid #85ae84;
    border-radius: 10px;
    color: #d2cece;
}

</style>