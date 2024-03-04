<script setup>

const props = defineProps([
    'name',
    'description',
    'imgSrc',
    'prices'
]);

let selectedType = props.prices[0] ? props.prices[0] : null;
let selectedPrice = props.prices[0] ? props.prices[0] : props.prices;

function selectVariant(variantName) {
    selectedType = variantName;
    selectedPrice = props.prices[variantName];
    let allPrices = document.getElementsByClassName(`menu-item-price ${props.name}`);
    console.log(allPrices);
    for (let price of allPrices) {
        price.style.border = "2px ";
    }
    document.getElementById(variantName).style.border = "2px solid #85ae84";
    console.log(props.prices[variantName])
}

function addItemToCart(itemName) {
    console.log(`Adding ${itemName} to cart`);
    let oldCart = JSON.parse(localStorage.getItem('cart'));
    console.log(oldCart);
    let newItem = {name: itemName, type: selectedType, price: selectedPrice, count: 1};
    let combinedCart = oldCart + newItem;
    if(oldCart !== null){
        localStorage.setItem('cart', JSON.stringify(combinedCart));
    }
    else{
        localStorage.setItem('cart', JSON.stringify(newItem));
        console.log("No old cart found");
    }

    console.log(`Added ${itemName} to cart for $${selectedPrice}`);   
}
function removeItemFromCart(itemName){
    localStorage.removeItem(itemName);
    console.log(`Removed ${itemName} from cart`);
}

</script>

<template>
    <div class="menu-item" :id="name">
        <h3 class="menu-item-name">{{ name }}</h3>
        <img :src="imgSrc" />
        <p class="menu-item-description">{{ description }}</p>
        <div class="menu-item-prices">
            <div class="menu-item-price" :class="name" v-for="(price, variantName) in prices" :key="variantName" :id="variantName" @click="selectVariant(variantName)">
                <p v-if="variantName !== 0">{{ variantName }}</p>
                <p>${{ price }}</p>
            </div>
        </div>
        <div>
            <button @click="removeItemFromCart(name)">Remove from Cart</button>
            <button @click="addItemToCart(name)">Add to Cart</button>
        </div>
    </div>
</template>

<style scoped>

.menu-item {
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

.menu-item > h3 {
    margin-top: .5rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.menu-item > div {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 60vw;
}

.menu-item > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu-item > img {
    margin: 1rem 0;
    border-radius: .6rem;
}

</style>