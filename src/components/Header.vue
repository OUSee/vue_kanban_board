<script setup lang='ts'>
import { ref } from 'vue';

const username = "admin"
const popupVisible = ref(false)
const timer = ref()

const popupDetach = () => {
    timer.value = setTimeout(() => { popupVisible.value = false }, 800)
}


const popUpToggle = () => {
    clearTimeout(timer.value)
    popupVisible.value = true;
}


</script>

<template>
    <div class='container'>
        <h1 class="title">Kanban-Board</h1>
        <div class="login-container">
            <h2 class="userInfo" @mouseenter="popUpToggle" @mouseleave="popupDetach">
                Logged in as: {{ username }}</h2>
            <div class="popup" v-if="popupVisible" @mouseenter="popUpToggle" @mouseleave="popupDetach">
                <button class="logOutBtn">log out</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    background-color: grey;
    color: white;
}

.title,
.userInfo {
    margin: 0px;
}

.userInfo {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup {
    box-sizing: inline;
    top: 40px;
    position: absolute;
    z-index: 9999;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}

.logOutBtn {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.3s ease-in-out;
}

.logOutBtn::before {
    position: absolute;
    color: white;
    content: ".";
    background-color: white;
    width: 10px;
    height: 10px;
    top: -4px;
    transform: rotate(45deg);

}

.logOutBtn:hover {
    background-color: grey;
    color: white;
    cursor: pointer;
}

.logOutBtn:active {
    background-color: white;
    outline: 1px solid white;
}
</style>