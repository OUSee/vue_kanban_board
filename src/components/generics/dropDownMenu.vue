<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { Task, TaskType } from '../../types';
import { useTasksStore } from '../../store';
const { boardType } = defineProps<{ boardType: TaskType }>()
const store = useTasksStore()
const nextBoardType = ref<TaskType>()
const TaskList = ref<Task[]>()

const getTasksList = () => {
    switch (boardType) {
        case TaskType.accepted: {
            TaskList.value = store.tasks.filter((task: Task) => { if (task.taskType == TaskType.unresolved) return task })
            nextBoardType.value = TaskType.accepted
            break
        }
        case TaskType.inProgress: {
            TaskList.value = store.tasks.filter((task: Task) => { if (task.taskType == TaskType.accepted) return task })
            nextBoardType.value = TaskType.inProgress
            break
        }
        case TaskType.resolved: {
            TaskList.value = store.tasks.filter((task: Task) => { if (task.taskType == TaskType.inProgress) return task })
            nextBoardType.value = TaskType.resolved
            break
        }
        default: {
            break
        }
    }
}

const abortChoice = () => {
    TaskList.value = []
}

onMounted(() => {
    getTasksList()
})

</script>

<template>
    <div class='container' v-if="TaskList?.length != 0">
        <ul class="list-group">
            <li v-for="task in TaskList" :key="task.taskId" @click="$emit('moveTask', task, nextBoardType)"
                class="list-option">
                {{ task.name }}</li>
            <li class="list-option abort-button" @click="$emit('abort')">cancel</li>
        </ul>
    </div>
    <div class="container" v-else>
        <ul class="list-group">
            <li class="list-option abort-button" @click="$emit('abort')">nothing to add</li>
        </ul>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    width: 100%;
}

.list-group {
    position: relative;
    left: 10px;
    list-style: none;
    border-radius: 5px;
    background-color: white;
    padding: 10px;
}

.list-group::before {
    display: block;
    color: white;
    content: "-";
    position: absolute;
    background-color: white;
    width: 10;
    height: 10px;
    left: -4px;
    top: 10px;
    transform: rotate(45deg);
}

.list-option {
    background-color: grey;
    color: white;
    padding: 5px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
}

.list-option:hover {
    cursor: pointer;
    color: black;
    background-color: lightgrey;
}

.list-option:not(:last-child) {
    margin-bottom: 5px;
}

.abort-button {
    text-align: center;
    color: black;
    background-color: rgba(255, 0, 0, 0.262);
}

.abort-button:hover {
    background-color: rgba(255, 0, 0, 0.5);
    color: white;
}
</style>