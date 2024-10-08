<script setup lang='ts'>
import { RouterView } from 'vue-router';
import Header from './Header.vue';
import Footer from './Footer.vue';

</script>

<template>
    <div class="main-container">
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped>
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: lightgray;
}
</style>