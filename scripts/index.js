// localstorage

const setInitialId = () => {
  localStorage.setItem("id", JSON.stringify(0));
};

const getId = () => {
  return JSON.parse(localStorage.getItem("id"));
};

const incrementId = () => {
  localStorage.setItem(
    "id",
    JSON.stringify(JSON.parse(localStorage.getItem("id")) + 1)
  );
};

const getItems = (items) => {
  return JSON.parse(localStorage.getItem("items"));
};

const setItems = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const initializeLocalStorage = () => {
  if (!getId()) {
    setInitialId();
  }

  if (!localStorage.getItem("items")) {
    const items = [];
    const jsonItems = JSON.stringify(items);
    localStorage.setItem("items", jsonItems);
  }
};

const clearLocalStorage = () => {
  const items = [];
  const jsonItems = JSON.stringify(items);
  localStorage.setItem("items", jsonItems);
};

// itemName input

const clearItemNameInputValue = () => {
  document.querySelector(".item-name-input").value = "";
};

const getItemNameInputValue = () => {
  return document.querySelector(".item-name-input").value;
};

//render

const clearRenderedItems = () => {
  const todoItemsElement = document.querySelector(".todo-items");
  todoItemsElement.innerHTML = "";
};

const renderItem = (item) => {
  const todoItemsElement = document.querySelector(".todo-items");

  const todoItemElement = document.createElement("div");
  todoItemElement.classList.add("todo-item");
  todoItemElement.setAttribute("id", item.id);

  // base elements

  const todoItemTextElement = document.createElement("p");
  todoItemTextElement.classList.add("todo-item_text");
  todoItemTextElement.innerHTML = item.text;

  const todoItemBtnsElement = document.createElement("div");
  todoItemBtnsElement.classList.add("todo-item_btns");

  const todoItemCheckboxElement = document.createElement("input");
  todoItemCheckboxElement.setAttribute("type", "checkbox");
  todoItemCheckboxElement.classList.add("todo-item_check-btn", "todo-item_btn");
  todoItemCheckboxElement.checked = item.checked;
  todoItemCheckboxElement.setAttribute("onclick", "checkboxHandler(this)");

  const todoItemEditBtnElement = document.createElement("button");
  todoItemEditBtnElement.classList.add("todo-item_edit-btn", "todo-item_btn");
  todoItemEditBtnElement.setAttribute("onclick", "showEditMenu(this)");

  const todoItemDeleteBtnElement = document.createElement("button");
  todoItemDeleteBtnElement.classList.add(
    "todo-item_delete-btn",
    "todo-item_btn"
  );
  todoItemDeleteBtnElement.setAttribute("onclick", "deleteItem(this)");

  todoItemsElement.appendChild(todoItemElement);

  todoItemElement.appendChild(todoItemTextElement);
  todoItemElement.appendChild(todoItemBtnsElement);

  todoItemBtnsElement.appendChild(todoItemCheckboxElement);
  todoItemBtnsElement.appendChild(todoItemEditBtnElement);
  todoItemBtnsElement.appendChild(todoItemDeleteBtnElement);

  //edit menu elements

  const todoItemEditMenuElement = document.createElement("div");
  todoItemEditMenuElement.classList.add("todo-item_edit-menu");

  const todoItemEditInputElement = document.createElement("input");
  todoItemEditInputElement.classList.add("todo-item_edit-input");
  todoItemEditInputElement.setAttribute("type", "text");
  todoItemEditInputElement.value = item.text;

  const todoItemEditApplyElement = document.createElement("button");
  todoItemEditApplyElement.classList.add(
    "todo-item_edit-apply-btn",
    "todo-item_btn"
  );
  todoItemEditApplyElement.setAttribute("onclick", "editItem(this)");

  const todoItemEditCancelElement = document.createElement("button");
  todoItemEditCancelElement.classList.add(
    "todo-item_edit-cancel-btn",
    "todo-item_btn"
  );
  todoItemEditCancelElement.setAttribute("onclick", "closeEditMenu(this)");

  todoItemElement.appendChild(todoItemEditMenuElement);

  todoItemEditMenuElement.appendChild(todoItemEditInputElement);
  todoItemEditMenuElement.appendChild(todoItemEditApplyElement);
  todoItemEditMenuElement.appendChild(todoItemEditCancelElement);
};

const renderItems = () => {
  clearRenderedItems();

  let items = getItems();

  const date = getSelectedDate();

  items = items.filter((el) => el.date === date);

  const selectValue = document.querySelector(".done_select").value;

  if (selectValue === "done") {
    items = items.filter((el) => el.checked);
  }

  if (selectValue === "undone") {
    items = items.filter((el) => !el.checked);
  }

  items.forEach((item) => renderItem(item));
};

// date

const getSelectedDate = () => {
  return document.querySelector(".date-input").value;
};

// interface
const addItem = () => {
  const items = getItems();
  const itemText = getItemNameInputValue().trim();

  const date = getSelectedDate();

  if (!itemText || !date) return;

  const curId = getId();
  const item = { id: `item-${curId}`, text: itemText, checked: false, date };
  items.push(item);
  setItems(items);
  clearItemNameInputValue();
  incrementId();

  renderItems();
};

const deleteItem = (elem) => {
  const id = elem.parentElement.parentElement.id;

  const items = getItems();
  const newItems = items.filter((el) => el.id !== id);

  setItems(newItems);
  renderItems();
};

const showEditMenu = (elem) => {
  renderItems();
  const id = elem.parentElement.parentElement.id;

  const textEl = document.querySelector(`#${id} > .todo-item_text`);
  const btnsEl = document.querySelector(`#${id} > .todo-item_btns`);

  const editMenuEl = document.querySelector(`#${id} > .todo-item_edit-menu`);

  textEl.style.display = "none";
  btnsEl.style.display = "none";

  editMenuEl.style.display = "flex";
};

const closeEditMenu = (elem) => {
  const id = elem.parentElement.parentElement.id;

  const textEl = document.querySelector(`#${id} > .todo-item_text`);
  const btnsEl = document.querySelector(`#${id} > .todo-item_btns`);

  const editMenuEl = document.querySelector(`#${id} > .todo-item_edit-menu`);

  textEl.style.display = "block";
  btnsEl.style.display = "flex";

  editMenuEl.style.display = "none";
};

const editItem = (elem) => {
  const id = elem.parentElement.parentElement.id;

  const text = document.querySelector(`#${id} .todo-item_edit-input`).value;

  const items = getItems();
  const index = items.findIndex((el) => el.id === id);

  items[index].text = text;

  setItems(items);
  renderItems();
};

const checkboxHandler = (elem) => {
  const id = elem.parentElement.parentElement.id;

  const text = document.querySelector(`#${id} .todo-item_edit-input`).value;

  const items = getItems();
  const index = items.findIndex((el) => el.id === id);

  items[index].checked = !items[index].checked;

  setItems(items);
  renderItems();
};

const clearItems = () => {
  clearLocalStorage();
  setInitialId();
  clearRenderedItems();
};

const addEnterEventListeners = () => {
  document.querySelector(".item-name-input").onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == "Enter") {
      addItem();
      return false;
    }
  };
};

const initialization = () => {
  addEnterEventListeners();
  initializeLocalStorage();
  renderItems();
};

initialization();
