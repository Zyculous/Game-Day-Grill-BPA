<script setup>
import { computed, reactive, nextTick } from 'vue'
import MenuItem from './MenuItem.vue'
import menu from '../assets/json/menu.json'
import anime from 'animejs'

let categoriesExpanded = false
let categoryAnimations = []

let categoryIDs = Object.keys(menu)

const selectedCategoryID = reactive({ id: '' })

let menuItems = computed(() => {
  return menu[selectedCategoryID.id] || []
})

async function handleCategoryClicked(categoryID) {
  if (!categoriesExpanded) {
    selectedCategoryID.id = categoryID

    categoriesExpanded = true

    let i = categoryIDs.indexOf(categoryID)

    let menuTitle = document.getElementById('menu-title')
    let leftCategories = categoryIDs.slice(0, i).map((item) => document.getElementById(item))
    let selectedCategory = document.getElementById(categoryID)
    let rightCategories = categoryIDs
      .slice(i + 1, categoryIDs.length)
      .map((item) => document.getElementById(item))

    let menuTitleRect = menuTitle.getBoundingClientRect()
    let selectedCategoryRect = selectedCategory.getBoundingClientRect()

    let selectedCategoryOffsetX =
      0.5 *
      (menuTitleRect.right +
        menuTitleRect.left -
        selectedCategoryRect.right -
        selectedCategoryRect.left)

    let selectedCategoryWidth = menuTitleRect.right - menuTitleRect.left

    categoryAnimations = [
      anime({
        // Title Animation
        targets: menuTitle,
        easing: 'easeInOutCubic',
        duration: 600,
        opacity: [1, -1],
        height: 0
      }),
      anime({
        // Left Categories Animation
        targets: leftCategories,
        delay: anime.stagger(75),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '-10rem'
      }),
      anime({
        // Selected Category Animation
        targets: selectedCategory,
        easing: 'easeInOutCubic',
        duration: 500,
        translateX: `${selectedCategoryOffsetX}px`,
        width: `${selectedCategoryWidth}px`
      }),
      anime({
        // Right Categories Animation
        targets: rightCategories,
        delay: anime.stagger(75, { direction: 'reverse' }),
        easing: 'easeInOutCubic',
        duration: 300,
        opacity: [1, 0],
        translateX: '10rem'
      })
    ]

    await nextTick()

    anime({
      targets: '.menu-item',
      delay: anime.stagger(50),
      easing: 'easeInOutCubic',
      duration: 300,
      translateY: ['5rem', 0],
      opacity: [0, 1]
    })
  } else {
    selectedCategoryID.id = ''

    categoriesExpanded = false

    categoryAnimations.forEach((animation) => animation.reverse())
    categoryAnimations.forEach((animation) => animation.play())
  }
}
</script>

<template>
  <div class="menu-page">
    <h1 class="title" text="Menu&nbsp;Page" id="menu-title">Menu&nbsp;Page</h1>
    <div class="menu">
      <div
        class="category"
        :id="categoryID"
        @click="handleCategoryClicked(categoryID)"
        v-for="categoryID in categoryIDs"
        :key="categoryID"
      >
        <h2 class="">{{ categoryID }}</h2>
      </div>
    </div>
    <div class="menu-item-container">
      <MenuItem
        class="menu-item"
        :name="menuItem.name"
        :img-src="menuItem.src"
        :description="menuItem.description"
        :prices="menuItem.price"
        v-for="menuItem in menuItems"
        :key="menuItem.name"
      />
    </div>
  </div>
</template>

<style scoped>

.menu-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.menu {
  display: flex;
  overflow: hidden;
  width: 100%;
  justify-content: center;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: .3rem solid var(--color-highlight-1);
  border-radius: .6rem;
  margin: .6rem;
  padding: .6rem;
  color: var(--color-highlight-1);
}

.title {
  color: var(--color-highlight-1)
}

</style>