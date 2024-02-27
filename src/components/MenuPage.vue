<script setup>
import menu from '../assets/json/menu.json';
import anime from 'animejs';
    //Store the original category details for reverse animation
    let categoryOriginal;

    function openCategory(category){
      //Get the clicked category, if reverse is needed, and the title of the page 
      category = document.getElementById(category);
      let reverse = category.getAttribute('reverse');
      let pageTitle = document.getElementsByClassName('title')[0];
      //Store original category if this is the first animation
      if(reverse === 'false'){
        categoryOriginal = category.getBoundingClientRect();
      }
      //This is a hack to get the location of where the text starts and ends on the page title so i can move stuff properly
      let range = document.createRange();
      range.setStart(pageTitle.firstChild, 0);
      range.setEnd(pageTitle.firstChild, pageTitle.textContent.length);
      //Get all the categories(this should work with more categories if we want!)
      let c = document.getElementsByClassName('category');
      c = [...c];
      let categoryLoc;
      let larger = [];
      let smaller = [];
      //Sort the categories into smaller and larger than the clicked category with smaller being to the left and larger to the right
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
      //Change the reverse value to the opposite so the next time the animation is called it will reverse, this will work always because you shouldnt be able to click any other categories after the first click
      category.setAttribute('reverse', reverse === 'false' ? 'true' : 'false');
      //Fuck anime.js
      anime({
          targets: [smaller],
          translateX: reverse === 'false' ? '-100vw' : 0,
          delay: anime.stagger(100),
          duration: 1800,
          easing: 'spring(1, 80, 14.5, 0)',
          opacity: reverse === 'false' ? [1, 0] : [0, 1],
      })
      anime({
          targets: [larger],
          translateX: reverse === 'false' ? '100vw' : 0,
          delay: anime.stagger(100, {direction: 'reverse'}),
          duration: 1800,
          easing: 'spring(1, 80, 14.5, 0)',
          opacity: reverse === 'false' ? [1, 0] : [0, 1],
      })
      anime({
        targets: [category],
        translateY: reverse === 'false' ? -(category.getBoundingClientRect().y - pageTitle.getBoundingClientRect().y) : 0,
        translateX: reverse === 'false' ? `${(((range.getBoundingClientRect().right + range.getBoundingClientRect().left)/2) - ((category.getBoundingClientRect().right + category.getBoundingClientRect().left)/2))}px` : 0,
        width: reverse === 'false' ? '98vw' : `${categoryOriginal.width}px`,
        height: reverse === 'false' ? '40%' : `${categoryOriginal.height}px`,
        duration: 1800,
        easing: 'spring(1, 80, 14.5, 0)',
      });
      //hide the title of the page with a " " which is just a hidden character cause for some reason it will jsut remvoe the element all together if you use a space or \n
      pageTitle.innerHTML = reverse === 'false' ? " " : pageTitle.getAttribute('text');
      //Load in the rest of the menu when category is opened/closed
      if(reverse === 'false'){
          //Load the items for the category
          loadItems(category);
        }else{
          //Remove the items for the category
          document.getElementById("itemContainer").remove();
          let container = document.createElement("div");
          container.setAttribute("id", "itemContainer");
          document.getElementById("page").appendChild(container);
        }
  }

  function loadItems(category){
    let items = menu[category.id];
      //itemsDiv.style.display = 'none';
      //console.log(items);
      for(let i = 0; i < items.length; i++){
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.classList.add(category.id);
        let itemName = document.createElement('h3');
        itemName.classList.add('itemName');
        itemName.innerHTML = items[i].name;
        let itemDesc = document.createElement('p');
        itemDesc.classList.add('itemDesc');
        itemDesc.innerHTML = items[i].description;
        let itemPrice = document.createElement('p');
        itemPrice.classList.add('itemPrice');
        itemPrice.innerHTML = items[i].price[0];
        let itemPriceSelect = document.createElement('select');
        itemPriceSelect.classList.add('itemPriceSelect');
        if(!items[i].price[0]){
          for(let price in items[i].price){
            let option = document.createElement('option');
            option.innerHTML = price + ": " + items[i].price[price];
            itemPriceSelect.appendChild(option);
          }
        }
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemDesc);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemPriceSelect);
        document.getElementById('itemContainer').appendChild(itemDiv);
      }
  }

</script>

<template>
    <div class="menu-page">
      <div id="page">
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
          <div id="itemContainer">

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
#itemContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    max-width: 100vw;
}
#page{
  width: 100vw;
  padding-left: 2%;
  justify-content: space-between;
  display: flex;
  flex-flow: column;
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