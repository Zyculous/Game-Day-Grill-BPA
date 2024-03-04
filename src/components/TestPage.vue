<script setup>
import anime from 'animejs'
import { nextTick } from 'vue'
nextTick(() => {
  let backgroundColors = [
    {value: () => `rgb(${anime.random(50, 14)}, ${anime.random(168, 184)}, ${anime.random(70, 98)})`}, //Purple color scale
    {value: () => `rgb(${anime.random(200, 145)}, ${anime.random(30, 10)}, ${anime.random(20, 4)})`}, //Red color scale
    {value: () => `rgb(${anime.random(135, 68)}, ${anime.random(60, 2)}, ${anime.random(230, 156)})`}, //Cyan color scale
    {value: () => `rgb(${anime.random(81, 29)}, ${anime.random(217, 128)}, ${anime.random(43, 1)})`}, //Green color scale
    {value: () =>`rgb(${anime.random(128, 255)}, ${anime.random(1, 74)}, ${anime.random(100, 216)})`}, //Pink color scale
    {value: () =>`rgb(${anime.random(255, 181)}, ${anime.random(243, 169)}, ${anime.random(74, 4)})`}, //Yellow color scale
    {value: () =>`rgb(${anime.random(83, 5)}, ${anime.random(247, 151)}, ${anime.random(252, 156)})`} //Light blue color scale
  ]
  for (let i = 0; i < 250; i++) {
    let block
    block = document.createElement('div')
    block.classList.add('square')
    block.style.display = 'flex'
    block.style.top = `${anime.random(0, 100)}%`
    block.style.left = `${anime.random(0, 100)}%`

    document.getElementById('background').appendChild(block)
  }

  async function squareAnimation() {
    setInterval(() => {
      // Run this code every second
      let squares = document.querySelectorAll('.square')
      for (let square of squares) {
        //let oldX = parseInt(square.style.transform.split('(')[1]);
        let newX = anime.random(0, 100);
        //console.log("Old: " + oldX);
        //console.log("New: " + newX);
        square.style.transform = `translateX(${newX}px) translateY(${anime.random(0, 100)}px)`
        /*
        let oldTop = parseInt(square.style.top)
        let oldLeft = parseInt(square.style.left)
        let newTop = anime.random(0, 500)
        let newLeft = anime.random(0, 500)

        if (oldTop < newTop) {
          for (let i = oldTop; i < newTop; i+=.1) {
            square.style.top = `${i}px`
          }
        } else {
          for (let i = oldTop; i > newTop; i-=.1) {
            square.style.top = `${i}px`
          }
        }
        if (oldLeft < newLeft) {
          for (let i = oldLeft; i < newLeft; i+=.1) {
            square.style.left = `${i}px`
          }
        } else {
          for (let i = oldLeft; i > newLeft; i-=.1) {
            square.style.left = `${i}px`
          }
        }
        // Apply the top and left values to the square
        //square.style.top = `${anime.random(0, 100)}%`;
        //square.style.left = `${anime.random(0, 100)}%`;*/
        square.style.backgroundColor = backgroundColors[anime.random(0, 6)].value()
      }
    }, 300)
  }
  squareAnimation()
  //bubbleAnimation();
})
</script>
<template>
  <div class="test-page">
    <h1 class="hello-message">Hi</h1>
    <div id="background"></div>
  </div>
</template>

<style>
.bubble {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.square {
  position: absolute;
  width: 10px;
  height: 10px;
}
</style>

<style scoped>
.test-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
#background {
  position: absolute;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}
.hello-message {
  color: var(--color-highlight-1);
}
</style>
