<script>
import anime from 'animejs/lib/anime.es.js';

export default {
  mounted() {
    this.$refs.content.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    this.$refs.content.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      const el = event.target;
      if (el.scrollTop === 0 || el.scrollHeight - el.scrollTop === el.clientHeight) {
        this.bounceElement(el);
      }
    },
    bounceElement(el) {
      anime({
        targets: el,
        translateY: [
          { value: -30, duration: 100 },
          { value: 0, duration: 800, easing: 'easeOutElastic(1, .8)' }
        ],
        duration: 900,
      });
    }
  }
};
</script>

<template>
    <div class="home-page">
        <h1 class="green">Home Page</h1>
        <div ref="content">Scrollable content here</div>
    </div>
</template>

<style scoped>
#app-content {
  height: 100vh; /* Adjust as per your layout */
  overflow-y: auto;
}
</style>