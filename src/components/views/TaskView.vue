<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Task } from '../../types';
import { useTasksStore } from '../../store';
const route = useRoute()
const editMode = ref(false)
const taskId = route.params.taskId;
const store = useTasksStore();
const currentTask = ref<Task>(store.tasks.find((task: Task) => task?.taskId?.toString() == taskId))


const handleSaveClick = () => {
    editMode.value = false;
    currentTask.value ? store.updateTask(currentTask.value) : console.log('empty')
}

const handleChange = () => {
    currentTask.value.name = (document.getElementById("nameInput") as HTMLInputElement).value
    currentTask.value.description = (document.getElementById("descriptionInput") as HTMLInputElement).value
}

onMounted(() => {
    console.log(taskId)
})

</script>

<template>
    <div class="page">
        <div v-if="!editMode" class='container'>
            <h1 class="task-title">{{ currentTask?.name }}</h1>
            <p class="task-description">
                {{ currentTask?.description ? currentTask?.description : 'No description provided' }}</p>
            <div class="options_container">
                <button @click="editMode = true" class="option_button">edit</button>
                <RouterLink to="/" class="option_button">home</RouterLink>
            </div>
        </div>
        <form @submit.prevent="handleSaveClick" v-else class="container form">
            <input @change='handleChange' :value="currentTask!.name" id="nameInput" type="text" autofocus
                class="task-title input title-input" />
            <textarea @change='handleChange' :value="currentTask!.description" id="descriptionInput"
                class="task-description input des-input" />
            <button type="submit" class="option_button save-btn">save changes</button>
        </form>
    </div>

</template>

<style scoped>
.page {
    width: 100%;
    padding: 5% 20%;
}

.container {
    padding: 20px 10px;
    background-color: grey;
    border-radius: 10px;
}

.form {
    display: flex;
    flex-direction: column;
}

.task-title {
    font-size: 24px;
    margin: 0;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
}

.task-description {
    font-size: 18px;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
}

.input {
    background-color: white;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.5) inset;
    outline: black 2px dotted;
    color: black;
}

.title-input {}

.des-input {
    height: 20vh;
    resize: none;
}

.options_container {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.option_button {
    font-weight: 400;
    width: 100%;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    color: black;
    text-align: center;
    transition: all 0.3s ease-in-out;
}

.option_button:hover {
    font-weight: 600;
    background-color: lightgrey;
    outline: 1px solid lightgrey;
}

.save-btn:hover {
    background-color: rgb(86, 255, 86);
}
</style>