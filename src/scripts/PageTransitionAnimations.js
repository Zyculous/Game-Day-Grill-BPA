import { nextTick } from 'vue';
import anime from 'animejs';

function fadeOut(){
    return anime({
        targets: '.page',
        opacity: [1, 0],
        translateY: [0, 50],
        duration: 200,
        easing: 'easeInOutCubic',
    });
}

function fadeIn() {
    return anime({
        targets: '.page',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeInOutCubic'
    });
}

async function fancyBlockAnimation() {
    let promises = [];

    await nextTick(() => {
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

            promises.push(anime({
                targets: block,
                backgroundColor: backgroundColors,
                translateY: anime.random(-100, 100),
                translateX: anime.random(-100, 100),
                duration: anime.random(100, 1500),
                easing: 'easeInOutCubic',
                complete: function() {
                document.getElementById('page').removeChild(document.getElementById(`block${i}`));
                }
            }).finished);
        }
    });

    return promises;
}

export default {
    fadeOut: fadeOut,
    fadeIn: fadeIn,
    fancyBlockAnimation: fancyBlockAnimation,
}