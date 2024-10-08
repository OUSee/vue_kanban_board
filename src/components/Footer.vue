<script setup lang='ts'>
import { useTasksStore } from '../store';

const store = useTasksStore();

</script>

<template>
    <div class='container'>
        <div class="info">
            <span>New: {{ store.count.new }}</span>
            <span>/</span>
            <span>Done: {{ store.count.done }}</span>
        </div>
        <div class="signature">
            Hackerman 2024
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    margin-top: auto;
    background-color: grey;
    color: white;
}

.info {
    display: flex;
    gap: 20px;
}
</style>