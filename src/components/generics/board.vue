<script setup lang='ts'>
import { ref } from 'vue';
import { Task, TaskType } from '../../types';
import { idGenereator, useTasksStore } from '../../store'
import taskPill from './taskPill.vue';
import DropDownMenu from './dropDownMenu.vue';


const store = useTasksStore();

const { boardType } = defineProps<{
    boardType: TaskType,
}>()

const editMode = ref(false);
const taskNameref = ref<string>("")



function addTask() {
    const newTask: Task = {
        taskId: idGenereator(),
        name: taskNameref.value,
        description: '',
        taskType: boardType
    }
    store.addTask(newTask);
    store.count.new++;
    taskNameref.value = '';
    editMode.value = false;
}

function deleteTask(id: number) {
    store.deleteTask(id);
}

function moveTask(task: Task, type: TaskType) {
    console.log(" invoked to : ", type)
    const updated: Task = {
        taskId: task.taskId,
        name: task.name,
        description: task.description,
        taskType: type
    }
    if (type == TaskType.resolved) {
        store.count.done++;
    }
    console.log(updated)
    store.updateTask(updated)
    editMode.value = false
}

const handleChange = () => {
    taskNameref.value = (document.getElementById('taskName') as HTMLInputElement).value;
}

const changeEditMode = () => { editMode.value = false; }

</script>

<template>
    <div class='board-container'>
        <h2 class="boardTitle">{{ boardType.toUpperCase() }}</h2>
        <ul class='task-list'>
            <taskPill
                v-for="task in (store.tasks.filter((task: Task) => { if (task.taskType == boardType as TaskType) return task }))"
                :key="task.taskId" :task="task" @handle-delete="deleteTask" />
        </ul>
        <form v-if="editMode && boardType == TaskType.unresolved" @submit.prevent="addTask" class="input-form">
            <input autofocus @change="handleChange" type="text" name="taskName" id="taskName" class="task-input"
                placeholder="task name">
            <button type="submit" class="add-btn">+</button>
        </form>
        <DropDownMenu v-if="editMode && boardType != TaskType.unresolved" :boardType @move-task="moveTask"
            @abort="changeEditMode" />
        <button v-if="!editMode" class="add_task" @click="editMode = true">
            add task
        </button>
    </div>
</template>

<style scoped>
.board-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: grey;
    border-radius: 10px;
}

.boardTitle {
    margin: 0;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 5px;
    background-color: lightgray;
}

.task-list {
    margin: 0;
    padding: 0;
}

.input-form {
    width: 100%;
}

.task-input {
    width: 100%;
    border-radius: 5px;
    border: 0;
    height: 30px;
    padding: 5px;
    margin-bottom: 5px;
}

.add-btn {
    width: 50%;
    border-radius: 5px;
    height: 30px;
    background-color: white;
    line-height: 20px;
    font-size: 20px;
}

.add-btn:hover {
    background-color: lightgreen;
    cursor: pointer;
}

.add_task {
    background-color: transparent;
    border: none;
    text-align: start;
    line-height: 20px;
    font-size: 16px;
    font-weight: 500;
    font-style: bald;
    line-height: 20px;
    padding: 5px;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease-in-out;
}

.add_task:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
}
</style>