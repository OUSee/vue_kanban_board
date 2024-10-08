<script setup lang='ts'>

import { TaskType } from '../../types';
import Board from '../generics/board.vue';

</script>

<template>
    <div class='page'>
        <div class='boards'>
            <Board v-for="Type in TaskType" :boardType="Type" />
        </div>
    </div>
</template>

<style scoped>
.page {
    width: 100%;
    display: flex;
    padding: 20px 50px;
    justify-content: space-between;
}

.boards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    margin-bottom: auto;
}
</style>
