<script>
import menu from '../assets/json/menu.json'
export default {
  data() {
    return {
      menu,
    };
  },
};
</script>

<template>
    <div class="menu-page">
        <h1 class="green">Menu Page</h1>
        <div class="menu">
            <div class="menu-catagory" v-for="(items, catagory) in menu" :key="catagory">
                <h2 class="green">{{ catagory }}</h2>
                <div class="item" v-for="item in items" :key="item.name">
                    <h3 class="green itemName">{{ item.name }}</h3>
                    <p class="green itemDesc">{{ item.description }}</p>
                    <p class="green itemPrice">{{ item.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>