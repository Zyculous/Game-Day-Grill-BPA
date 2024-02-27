<script setup>
import menu from '../assets/json/menu.json';
import anime from 'animejs';

let documentRect = document.body.getBoundingClientRect();

let categoriesExpanded = false;
let categoryAnimations = [];

let categoryIDs = Object.keys(menu);

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
    let selectedCategoryOffsetY = menuTitleRect.top - selectedCategoryRect.top;

    let selectedCategoryWidth = menuTitleRect.right - menuTitleRect.left;

    categoryAnimations = [
      anime({
        targets: menuTitle,
        easing: 'easeInOutCubic',
        duration: 350,
        opacity: [1, 0],
      }),
      anime({ // Left Animation
        targets: leftCategories,
        delay: anime.stagger(75),
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
      anime({ // Selected Animation
        targets: selectedCategory,
        easing: 'easeInOutCubic',
        duration: 600,
        translateX: `${selectedCategoryOffsetX}px`,
        translateY: `${selectedCategoryOffsetY}px`,
        width: `${selectedCategoryWidth}px`,
      }),
      anime({ // Right Animation
        targets: rightCategories,
        delay: anime.stagger(75, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 350,
        opacity: [1, 0],
        translateX: '10rem',
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
    <div class="menu-page">
        <h1 class="center title" text= "Menu&nbsp;Page" id="menu-title">Menu&nbsp;Page</h1>
        <div class="menu">
            <div class="category" :id="categoryID" @click="handleCategoryClicked(categoryID)" v-for="categoryID in categoryIDs" :key="categoryID">
                <h2 class="green center point">{{ categoryID }}</h2>
                <div>
                    <!--<div class="item" :class="category" v-for="item in items" :key="item.name">
                        <h3 class="itemName">{{ item.name }}</h3>
                        <p class="itemDesc">{{ item.description }}</p>
                        <p class="itemPrice" v-if="item.price[0]">{{ item.price[0] }}</p>
                        <select class="itemPriceSelect" v-if="!item.price[0]">
                            <option v-for="(price, choice) in item.price" :key="price">{{ choice + ": " + price }}</option>
                        </select>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
.item{
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
.item:hover {
    transition: all 0.3s ease-in-out;
    border-color: #da91aa;
}
.itemPriceSelect{
    background-color: rgb(0 0 0 / 0%);
    border: none;
    color: #d2cece;
}
.collapsed{
    cursor: pointer;
}

@keyframes slideUp {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.item {
  animation-fill-mode: backwards;
  display: flex;
}

.hidden {
  animation-name: slideUp;
  animation-duration: 0.5s; /* Adjust duration as needed */
  display: none;
}
</style>