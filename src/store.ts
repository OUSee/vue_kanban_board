import { Task, TaskType } from "./types";
import { defineStore } from "pinia";

export const updateStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const idGenereator = () => {
  return Math.floor(Math.random() * Date.now());
};

export const checkStorage = () => {
  const tasksjson = localStorage.getItem("tasks");
  if (tasksjson != null) {
    const tasks = JSON.parse(tasksjson);
    return tasks;
  } else {
    updateStorage([]);
    alert("empty");
    return [];
  }
};

const countTasks = (tasks: Task[]) => {
  let count = { new: 0, done: 0 };
  tasks.forEach((task) => {
    if (task.taskType == TaskType.unresolved) {
      count.new += 1;
    }
    if (task.taskType == TaskType.resolved) {
      count.done += 1;
    }
  });
  return count;
};
const initialState = checkStorage();

const checkCount = countTasks(initialState);

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return { tasks: initialState, count: checkCount };
  },

  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      updateStorage(this.tasks);
    },
    updateTask(updated: Task) {
      this.tasks = this.tasks.map((task: Task) => {
        if (task.taskId == updated.taskId) {
          return updated;
        } else return task;
      });
      console.log(this.tasks);
      updateStorage(this.tasks);
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task: Task) => {
        if (task.taskId != id) {
          return task;
        } else if (task.taskId == id && task.taskType == TaskType.unresolved) {
          this.count.new--;
        } else if (task.taskId == id && task.taskType == TaskType.resolved) {
          this.count.done--;
        }
      });
      updateStorage(this.tasks);
    },
  },
});
