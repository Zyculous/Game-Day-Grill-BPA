<script setup>

let req = new XMLHttpRequest();

req.onload = () => {
  console.log(req.responseText);
};

req.open("GET", "src/images/arcade2.jpeg");
req.send();

</script>

<template>
    <div class="home-page">
        <h1 class="green">Home Page</h1>
        <div ref="content">Scrollable content here</div>
    </div>
</template>

<style scoped>

</style>