<script setup>
import menu from '../assets/json/menu.json';
import anime from 'animejs';
      let categoryOriginal;

    function openCategory(category){
      category = document.getElementById(category);
      let reverse = category.getAttribute('reverse');
      let pageTitle = document.getElementsByClassName('title')[0];
      if(reverse === 'false'){
        categoryOriginal = category.getBoundingClientRect();
      }
      let range = document.createRange();
      range.setStart(pageTitle.firstChild, 0);
      range.setEnd(pageTitle.firstChild, pageTitle.textContent.length);
      let c = document.getElementsByClassName('category');
      c = [...c];
      let categoryLoc;
      let larger = [];
      let smaller = [];
      for (let i = 0; i < c.length; i++) {
        if (c[i] == category) {
          categoryLoc = i;
          break;
        }
      }
      for (let i = 0; i < c.length; i++) {
        if (i < categoryLoc) {
          smaller.push(c[i]);
        } else if (i > categoryLoc) {
          larger.push(c[i]);
        }
      }

      category.setAttribute('reverse', reverse === 'false' ? 'true' : 'false');
      anime({
          targets: [smaller],
          translateX: reverse === 'false' ? '-100vw' : 0,
          delay: anime.stagger(100),
          duration: 1000,
          easing: 'spring(1, 80, 14.5, 0)',
      })
      anime({
          targets: [larger],
          translateX: reverse === 'false' ? '100vw' : 0,
          delay: anime.stagger(100, {direction: 'reverse'}),
          duration: 1000,
          easing: 'spring(1, 80, 14.5, 0)',
      })
      anime({
        targets: [category],
        translateY: reverse === 'false' ? -(category.getBoundingClientRect().y - pageTitle.getBoundingClientRect().y) : 0,
        translateX: reverse === 'false' ? `${(range.getBoundingClientRect().x - category.getBoundingClientRect().x)}px` : 0,
        width: reverse === 'false' ? '100vw' : `${categoryOriginal.width}px`,
        height: reverse === 'false' ? '10%' : `${categoryOriginal.height}px`,
        duration: 1000,
        easing: 'spring(1, 80, 14.5, 0)',
      });
      pageTitle.innerHTML = reverse === 'false' ? " " : pageTitle.getAttribute('text');
    }
</script>

<template>
    <div class="menu-page">
        <h1 class="center title" text= "Menu&nbsp;Page">Menu&nbsp;Page</h1>
        <div class="menu">
            <div class="category" :id="category" reverse='false' @click="openCategory(category)" v-for="(items, category) in menu" :key="category">
                <h2 class="green center point">{{ category }}</h2>
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