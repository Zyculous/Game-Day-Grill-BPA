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
        <h1 class="green center">Menu Page</h1>
        <div class="menu">
            <div class="menu-catagory" v-for="(items, catagory) in menu" :key="catagory">
                <h2 class="green">{{ catagory }}</h2>
                <div class="item" v-for="item in items" :key="item.name">
                    <h3 class="green itemName">{{ item.name }}</h3>
                    <p class="green itemDesc">{{ item.description }}</p>
                    <p class="green itemPrice" v-if="item.price[0]">{{ item.price[0] }}</p>
                    <select class="green itemPriceSelect" v-if="!item.price[0]">
                        <option v-for="(price, choice) in item.price" :key="price">{{ choice + ": " + price }}</option>
                    </select>
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
    border: 5px solid green;
    border-radius: 10px;
}
.itemPriceSelect{
    background-color: rgb(0 0 0 / 0%);
    border: none;
}
</style>