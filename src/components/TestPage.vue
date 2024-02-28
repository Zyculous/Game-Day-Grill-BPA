<script>
    import anime from 'animejs';
    export default {
        mounted(){
            let backgroundColors = [
                {value: () => `rgb(${anime.random(50, 14)}, ${anime.random(168, 184)}, ${anime.random(70, 98)})`}, //Purple color scale
                {value: () => `rgb(${anime.random(200, 145)}, ${anime.random(30, 10)}, ${anime.random(20, 4)})`}, //Red color scale
                {value: () => `rgb(${anime.random(135, 68)}, ${anime.random(60, 2)}, ${anime.random(230, 156)})`}, //Cyan color scale
                {value: () => `rgb(${anime.random(81, 29)}, ${anime.random(217, 128)}, ${anime.random(43, 1)})`}, //Green color scale
                {value: () => `rgb(${anime.random(128, 255)}, ${anime.random(1, 74)}, ${anime.random(100, 216)})`}, //Pink color scale
                {value: () => `rgb(${anime.random(255, 181)}, ${anime.random(243, 169)}, ${anime.random(74, 4)})`}, //Yellow color scale
                {value: () => `rgb(${anime.random(83, 5)}, ${anime.random(247, 151)}, ${anime.random(252, 156)})`} //Light blue color scale
            ]
        for(let i=0; i<70; i++){
            let block;
            block = document.createElement("div");
            block.classList.add("bubble");
            block.style.display = "flex";
            document.getElementById('background').appendChild(block);
        }
        let bubbles = document.querySelectorAll('.bubble');
        const animation = () => {
            anime({
                targets: [...bubbles],
                translateX: () => `${anime.random(-1000, 1000)}`,
                translateY: () => `${anime.random(-800, 800)}`,
                scale: () => anime.random(1, 3),
                rotate: () => anime.random(-360, 360),
                background : backgroundColors[anime.random(0, 6)],
                easing: 'linear',
                duration: anime.random(2000, 3000),
                delay: anime.stagger(25),
                complete: animation,
            });
        }
        animation();
    }
}
</script>
<template>
    <div class="test-page">
        <h1 class="green">Hi</h1>
        <div id="background"></div>
    </div>
</template>
<style scoped>
    .test-page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
    }
    .bubble{
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    #background{
        position: absolute;
        justify-content: center;
        display: flex;
        align-items: center;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }
    .green{
        color: #85ae84;
    }
</style>