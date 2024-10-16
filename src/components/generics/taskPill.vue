<script setup lang='ts'>
import { Task } from '../../types';
import CrossIcon from '../icons/crossIcon.vue';
const { task } = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    (e: 'handleDelete', id: number): void
}>()

const path = "/task/" + task.taskId


const handleDelete = () => {
    emit('handleDelete', task.taskId)
}
</script>

<template>
    <div class='task-container'>
        <RouterLink class="link" :to=path draggable="false">
            {{ task.name }} {{ $route.params.taskId }}
        </RouterLink>
        <button @click="handleDelete" class="del-btn">
            <CrossIcon class="cross_icon" />
        </button>
    </div>
</template>

<style scoped>
.link {
    width: 100%;
    text-overflow: ellipsis;
}

.link:hover {
    color: black;
    cursor: pointer;
}

.task-container:has(.link:hover) {
    outline: 1px solid white;
    background-color: lightgray;
}

.cross_icon {
    width: 20px;
    height: 20px;
    padding: 4px;
}

.task-container {
    transition: all 0.3s ease-in-out;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: rgb(101, 101, 101);
}

.task-name {
    margin: 0;
    height: 20px;
    margin-left: 5px;
}

.del-btn {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
}

.del-btn:hover {
    background-color: rgb(203, 114, 114);
    cursor: pointer;
}
</style>