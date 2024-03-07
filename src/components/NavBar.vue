<script setup>
import pageTransitionAnimations from '../scripts/PageTransitionAnimations';

defineProps([
    'routes'
]);

let fadeOutAnimation = true;
let fancyBlockAnimation = false;

let debounce = false;

async function movePage(route) {
    if (debounce) return;

    debounce = true;

    if (fadeOutAnimation) await pageTransitionAnimations.fadeOut().finished;

    window.location.hash = `${route}`;

    let loadingAnimations = [];

    if (fadeOutAnimation) loadingAnimations.push(pageTransitionAnimations.fadeIn().finished);

    if (fancyBlockAnimation) loadingAnimations.push(...await pageTransitionAnimations.fancyBlockAnimation());

    await Promise.all(loadingAnimations);

    debounce = false;
}

</script>

<template>
    <div class="navbar">
        <p> | </p>
        <div v-for="(info, route) in routes" :id="info.navbarName" :key="info.navbarName">
            <div v-if="!info.hidden" class="button">
                <a class="link" @click="movePage(route)">{{ info.navbarName }}</a>
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