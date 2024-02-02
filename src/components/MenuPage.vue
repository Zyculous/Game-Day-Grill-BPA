<script>
import menu from '../assets/json/menu.json';
import anime from 'animejs';
export default {
  data() {
    return {
      menu,
      collapsedStates: {},
    };
  },
  mounted() {
    this.initializeCollapsedStates();
  },
  methods: {
    initializeCollapsedStates() {
      Object.keys(this.menu).forEach(category => {
        this.collapsedStates[category] = false;
      });
    },
    hideItems(category) {
      // Toggle the category state
      
      this.collapsedStates[category] = !this.collapsedStates[category];

      // Delay the hiding of items to allow for animation
      if (this.collapsedStates[category]) {
        const items = document.querySelectorAll('.' + category);
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('hidden');
            console.log(item);
          }, index * 20);
        });
      }else{
        const items = document.querySelectorAll('.' + category);
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove('hidden');
            console.log(item);
          }, index * 20);
        });
      }
    },
    openCategory(category){
      category = document.getElementById(category);
      let reverse = category.getAttribute('reverse');
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
      let title = document.getElementsByClassName('title')[0];
      //console.log(title);
      //c.splice(categoryLoc, 1);
      console.log("Catergory: " + category.getAttribute('id'));
      console.log("Loc: " + categoryLoc);
      console.log("Larger: " + larger);
      console.log("Smaller: " + smaller);
      console.log("Reverse: " + reverse);
      console.log("CategoryX: " + category.getBoundingClientRect().x);
      console.log("TitleX: " + title.getBoundingClientRect().x);

      if(reverse == 'true'){
        anime({
          targets: [c, category],
          translateX: '0',
          translateY: '0',
          duration: 1000,
          delay: anime.stagger(100),
          easing: 'spring(1, 80, 14.5, 0)',
          width: '100%',
          height: '100%',
          complete: function(){
            title.innerHTML = title.getAttribute('text');
          }
        });
        category.setAttribute('reverse', 'false');
      }else{
        anime({
          targets: [larger],
          translateX: '150vw',
          duration: 1000,
          delay: anime.stagger(100, {direction: 'reverse'}),
          easing: 'spring(1, 80, 14.5, 0)'
        });
        anime({
          targets: [smaller],
          translateX: '-150vw',
          duration: 1000,
          delay: anime.stagger(100),
          easing: 'spring(1, 80, 14.5, 0)'
        });
        anime({
          targets: [category],
          translateX: function(category){
            return ((title.getBoundingClientRect().right + title.getBoundingClientRect().left)/2) - ((category.getBoundingClientRect().right + category.getBoundingClientRect().left)/2);
          },
          translateY: function(){
            return ((title.getBoundingClientRect().bottom + title.getBoundingClientRect().top)/2) - ((category.getBoundingClientRect().bottom + category.getBoundingClientRect().top)/2);
          },
          width: '100vh',
          height: '35%',
          duration: 1000,
          easing: 'spring(1, 80, 14.5, 0)',
          begin: function(){
            title.innerHTML = " ";
          }
        });
        category.setAttribute('reverse', 'true');
      }
    }
  }
};
</script>

<template>
    <div class="menu-page">
        <h1 class="green center title" text= "Menu Page">Menu Page</h1>
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