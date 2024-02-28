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
  return menu[selectedCategoryID.id] || [];
});


function handleCategoryClicked(categoryID) {
  if (!categoriesExpanded) {
    selectedCategoryID.id = categoryID;

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
      anime({ // Left Categories Animation
        targets: leftCategories,
        delay: anime.stagger(75),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '-10rem',
      }),
      anime({ // Selected Category Animation
        targets: selectedCategory,
        easing: 'easeInOutCubic',
        duration: 600,
        translateX: `${selectedCategoryOffsetX}px`,
        width: `${selectedCategoryWidth}px`,
      }),
      anime({ // Right Categories Animation
        targets: rightCategories,
        delay: anime.stagger(75, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '10rem',
      })
    ];
  } else {
    selectedCategoryID.id = "";

    categoriesExpanded = false;

    categoryAnimations.forEach(animation => animation.reverse());
    categoryAnimations.forEach(animation => animation.play());
  }
}

</script>

<template>
    <div class="menu-page">
        <h1 class="center title" text= "Menu&nbsp;Page" id="menu-title">Menu&nbsp;Page</h1>
        <div class="menu">
            <div class="category" :id="categoryID" @click="handleCategoryClicked(categoryID)" v-for="categoryID in categoryIDs" :key="categoryID">
                <h2 class="green center point">{{ categoryID }}</h2>
            </div>
        </div>
        <div class="center" id="menu-item-container">
          <MenuItem :name="menuItem.name" :description="menuItem.description" :prices="menuItem.price" v-for="menuItem in menuItems" v-show="true" :key="menuItem.name"></MenuItem>
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
  width: inherit;
  height: min-content;
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
  width: inherit;
}
#menu-item-container{
  visibility: visible;
}

</style>