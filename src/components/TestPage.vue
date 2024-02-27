<script>
    import anime from 'animejs';
    export default {
        mounted(){
        for(let i=0; i<50; i++){
            let block;
            block = document.createElement("div");
            block.classList.add("bubble");
            block.style.display = "flex";
            document.getElementById('background').appendChild(block);
        }
        let bubbles = document.querySelectorAll('.bubble');
        const animation = () => {
            anime({
                targets: [bubbles],
                translateX: () => '',
                translateY: () => `${anime.random(-200, 200)}`,
                scale: () => anime.random(1, 3),
                rotate: () => anime.random(-360, 360),
                background : [
                    
                    {value: () => `rgb(${anime.random(50, 14)}, ${anime.random(168, 184)}, ${anime.random(70, 98)})`}, //Purple color scale
                    {value: () => `rgb(${anime.random(200, 145)}, ${anime.random(30, 10)}, ${anime.random(20, 4)})`}, //Red color scale
                    {value: () => `rgb(${anime.random(135, 68)}, ${anime.random(60, 2)}, ${anime.random(230, 156)})`}, //Cyan color scale
                ],
                easing: "linear",
                duration: 2000,
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