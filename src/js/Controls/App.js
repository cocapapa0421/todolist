import elements from "../Views/base";
import Views from "../Views/Views";
import Tasks from "../Models/Tasks";

class App {
  constructor() {
    this.tasks = new Tasks();
    this.views = new Views();
    this.form = this.views.createForm();
    this.taskList = this.views.createTaskList();

    // Render app
    this.views.renderElement(elements.root, this.form);
    this.views.renderElement(elements.root, this.taskList);

    // Attach event
    this.form.addEventListener("submit", this.addTask.bind(this));
    this.taskList.addEventListener("click", this.editTask.bind(this));
    this.taskList.addEventListener("click", this.removeTask.bind(this));
  }

  addTask(e) {
    e.preventDefault();

    const inputEl = this.form.querySelector(".js-task-name");
    const taskName = inputEl.value;

    if (!taskName) {
      alert("Task name không được để trống");
      inputEl.classList.add("has-error");
      this.views.focusField(inputEl);
      return;
    }

    const taskHeadEl = this.taskList.querySelector(".js-task-head");
    const newTask = this.tasks.addTask(taskName);

    this.views.renderHtml(
      taskHeadEl,
      this.views.createTask(newTask),
      "afterEnd"
    );

    this.views.clearField(inputEl);
    this.views.focusField(inputEl);
    inputEl.classList.remove("has-error");
  }

  editTask(e) {
    const editButton = e.target.closest(".js-edit-task");

    if (!editButton) return;

    const id = editButton.dataset.id;
    const task = this.tasks.getTask("id", id);

    if (!task) return;

    const editForm = this.views.createEditForm(task);
    elements.overlay.classList.add("is-active");
    this.views.renderElement(elements.body, editForm);
    editForm.addEventListener("submit", this.handlerEditForm.bind(this));
  }

  removeTask(e) {
    const removeButton = e.target.closest(".js-remove-task");
    if (!removeButton) return;
    const id = removeButton.dataset.id;
    const result = this.tasks.removeTask(id);
    if (!result) return;
    this.views.removeTask(removeButton);
  }

  handlerEditForm(e) {
    e.preventDefault();
    const editForm = e.target.closest(".form--edit");
    const inputEl = editForm.querySelector(".js-edit-name");
    const newContent = inputEl.value;
    const idx = editForm.dataset.id;
    const task = this.tasks.getTask("id", idx);

    if (!newContent) {
      alert("Bạn cần nhập nội dung");
      inputEl.classList.add("has-error");
      this.views.focusField(inputEl);
      return;
    }

    task.name = newContent;

    this.tasks.editTask(idx, task);

    document
      .querySelector(`.task[data-id="${idx}"]`)
      .querySelector(".js-task-content").textContent = newContent;

    editForm.remove();
    elements.overlay.classList.remove("is-active");
  }
}

export default App;
