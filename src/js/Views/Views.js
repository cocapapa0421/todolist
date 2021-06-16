class Views {
  constructor() {}

  createForm() {
    const form = document.createElement("form");
    const childElements = `
      <input
        class="form__input js-task-name"
        type="text"
        name=""
        placeholder="Add a task..."
      />
      <button class="form__button">Add</button>`;

    form.classList.add("form", "js-add-task");
    this.renderHtml(form, childElements);

    return form;
  }

  createTaskList() {
    const taskList = document.createElement("div");
    const childElements = `
      <div class="task-head grid js-task-head">
        <div class="task-head__item">Status</div>
        <div class="task-head__item">Name of task</div>
        <div class="task-head__item">Actions</div>
      </>
    `;

    taskList.classList.add("task-list", "js-task-list");
    this.renderHtml(taskList, childElements);

    return taskList;
  }

  createEditForm({ id, name }) {
    const form = document.createElement("form");
    const childElements = `
      <input
        class="form__input js-edit-name"
        type="text"
        name=""
        value="${name}"
        placeholder="Add content to be modified"
        autofocus
      />
      <button class="form__button">Edit</button>
    `;

    form.classList.add("form", "form--edit");
    form.setAttribute("data-id", id);
    this.renderHtml(form, childElements);

    return form;
  }

  createTask({ id, name }) {
    const newTask = `
      <div class="task grid" data-id="${id}">
        <div class="task__status">
          <input
            class="task__checkbox"
            type="checkbox"
            name="status"
            id="${id}"
            data-id="${id}"
          />
          <label class="task__checkbox-label" for="${id}"></label>
        </div>
        <div class="task__name">
          <div class="task__name-content js-task-content">${name}</div>
        </div>
        <div class="task__actions">
          <div class="task__groups">
            <button class="button button--edit js-edit-task" data-id="${id}">Edit</button>
            <button class="button button--remove js-remove-task" data-id="${id}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;

    return newTask;
  }

  removeTask(target) {
    target.closest(".task").remove();
  }

  clearField(field) {
    field.value = "";
  }

  focusField(field) {
    field.focus();
  }

  renderElement(target, element, pos = "beforeEnd") {
    target.insertAdjacentElement(pos, element);
  }

  renderHtml(target, html, pos = "beforeEnd") {
    target.insertAdjacentHTML(pos, html);
  }
}

export default Views;
