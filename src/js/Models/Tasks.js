import { v4 as uuid } from "uuid";

class Tasks {
  constructor() {
    this.tasks = [];
  }

  addTask(name) {
    const task = {
      id: uuid(),
      name,
      time: new Date().toUTCString(),
    };
    this.tasks.push(task);

    return task;
  }

  removeTask(id) {
    const idx = this.tasks.findIndex((task) => task.id === id);

    if (idx < 0) return;

    this.tasks.splice(idx, 1);
    return this.tasks;
  }

  editTask(id, newTask) {
    const idx = this.tasks.findIndex((task) => task.id === id);
    if (idx < 0) return;
    this.tasks.splice(idx, 1, newTask);

    return this.tasks;
  }

  getTask(field, value) {
    return this.tasks.find((task) => task[field] === value);
  }
}

export default Tasks;
