<script setup>
    import { nextTick } from 'vue'
    import anime from 'animejs'

    defineProps([
        'routes'
    ]);
    function exitPage(i){
        anime({
            targets: '.page',
            opacity: [1, 0],
            translateY: [0, 50],
            duration: 200,
            easing: 'easeInOutCubic',
            complete: function() {
                loadPage(i);
            }
        });
    }
    function loadPage(i) {
        nextTick(() => {
            window.location.hash = `${i}`;
            anime({
            targets: '.page',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeInOutCubic'
            });

            let backgroundColors = [
            {value: () => `rgb(${anime.random(50, 14)}, ${anime.random(168, 184)}, ${anime.random(70, 98)})`}, //Purple color scale
            {value: () => `rgb(${anime.random(200, 145)}, ${anime.random(30, 10)}, ${anime.random(20, 4)})`}, //Red color scale
            {value: () => `rgb(${anime.random(135, 68)}, ${anime.random(60, 2)}, ${anime.random(230, 156)})`}, //Cyan color scale
            {value: () => `rgb(${anime.random(81, 29)}, ${anime.random(217, 128)}, ${anime.random(43, 1)})`}, //Green color scale
            {value: () =>`rgb(${anime.random(128, 255)}, ${anime.random(1, 74)}, ${anime.random(100, 216)})`}, //Pink color scale
            {value: () =>`rgb(${anime.random(255, 181)}, ${anime.random(243, 169)}, ${anime.random(74, 4)})`}, //Yellow color scale
            {value: () =>`rgb(${anime.random(83, 5)}, ${anime.random(247, 151)}, ${anime.random(252, 156)})`} //Light blue color scale
            ];
            for (let i = 0; i < 1000; i++) {
            let block
            block = document.createElement('div')
            block.classList.add('square')
            block.style.display = 'flex'
            block.style.top = `${anime.random(0, 100)}%`
            block.style.left = `${anime.random(0, 100)}%`
            block.id = `block${i}`
            document.getElementById('page').appendChild(block);

            anime({
                targets: block,
                backgroundColor: backgroundColors,
                translateY: anime.random(-100, 100),
                translateX: anime.random(-100, 100),
                duration: anime.random(100, 1500),
                easing: 'easeInOutCubic',
                complete: function() {
                document.getElementById('page').removeChild(document.getElementById(`block${i}`));
                }
            });
            
            }
        });
    }
</script>

<template>
    <div class="navbar">
        <div v-for="(route, i) in routes" :id="i" class="button">
            <a class="link" @click="exitPage(i)" :key="route">{{ route }}</a>
            <p>|</p>   
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
}

.navbar > * {
  font-size: 1.5rem;
  margin: .1rem .5rem;
  text-decoration: none;
}
.button{
    display: flex;
    flex-direction: row;
}
.button > p {
  color: var(--color-border);
}

.button > a {
    color: var(--color-highlight-1);
    margin-left: 25px;
    margin-right: 25px;
}

</style>