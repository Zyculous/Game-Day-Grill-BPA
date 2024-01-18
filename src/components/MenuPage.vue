<script>
import menu from '../assets/json/menu.json';

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
          }, index * 200);
        });
      }
    }
  }
};
</script>

<template>
    <div class="menu-page">
        <h1 class="green center">Menu Page</h1>
        <div class="menu">
            <div class="menu-category" v-for="(items, category) in menu" :key="category">
                <h2 class="green center point" @click="hideItems(category)">{{ category }} <span v-if="collapsedStates[category]">&#x25B6;</span><span v-else>&#x25BC;</span></h2>
                <div v-show="!collapsedStates[category]">
                    <div class="item" :class="category" v-for="item in items" :key="item.name">
                        <h3 class="itemName">{{ item.name }}</h3>
                        <p class="itemDesc">{{ item.description }}</p>
                        <p class="itemPrice" v-if="item.price[0]">{{ item.price[0] }}</p>
                        <select class="itemPriceSelect" v-if="!item.price[0]">
                            <option v-for="(price, choice) in item.price" :key="price">{{ choice + ": " + price }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    display: none;
}

@keyframes slideUp {
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
  animation-fill-mode: forwards; /* Keeps the element in the state of the last keyframe when the animation finishes */
}

.hidden {
  animation-name: slideUp;
  animation-duration: 0.5s; /* Adjust duration as needed */
}
</style>