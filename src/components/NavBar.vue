<script setup>
import pageTransitionAnimation from '../scripts/PageTransitionAnimation';

defineProps([
    'routes'
]);

let usePageTransitionAnimation = false;

let exitPage = (i) => {pageTransitionAnimation.exitPage(i, 
    (i) => {pageTransitionAnimation.loadPage(i,()=>{});}
);};

if (usePageTransitionAnimation) {
    exitPage = (i) => {pageTransitionAnimation.exitPage(i, 
        (i) => {pageTransitionAnimation.loadPage(i,
            () => pageTransitionAnimation.blockAnimation()    
        );}
    );};
}

</script>

<template>
    <div class="navbar">
        <p> | </p>
        <div v-for="(info, route) in routes" :id="info.navbarName" :key="info.navbarName">
            <div v-if="!info.hidden" class="button">
                <a class="link" @click="exitPage(route)">{{ info.navbarName }}</a>
                <p> | </p>  
            </div> 
        </div>
    </div>
</template>

<style scoped>

.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6%;
  border-bottom: .1rem solid var(--color-border);
  cursor: pointer;
  justify-content: center;
  margin-bottom: .2rem;
}

.button{
    display:flex;
    justify-content: center;
    flex-direction: row;
}

p {
    font-size: 1.75rem;
  color: var(--color-border);
}

a {
    font-size: 1.75rem;
    color: var(--color-highlight-1);
    text-align: center;
    padding: 0rem .5rem;
}

</style>