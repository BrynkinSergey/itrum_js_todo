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

  const todoItemTextElement = document.createElement("input");
  todoItemTextElement.classList.add("todo-item_text");
  todoItemTextElement.value = item.text;
  todoItemTextElement.setAttribute("onchange", "editItem(this)");

  const todoItemBtnsElement = document.createElement("div");
  todoItemBtnsElement.classList.add("todo-item_btns");

  const todoItemCheckboxElement = document.createElement("input");
  todoItemCheckboxElement.setAttribute("type", "checkbox");
  todoItemCheckboxElement.setAttribute("id", `${item.id}_checkbox`);
  todoItemCheckboxElement.classList.add("todo-item_check-btn", "todo-item_btn");
  todoItemCheckboxElement.checked = item.checked;
  todoItemCheckboxElement.setAttribute("onclick", "checkboxHandler(this)");

  const checkboxLabelElement = document.createElement("label");
  checkboxLabelElement.setAttribute("for", `${item.id}_checkbox`);

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
  todoItemBtnsElement.appendChild(checkboxLabelElement);
  todoItemBtnsElement.appendChild(todoItemDeleteBtnElement);
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
  setWordDateToToggleButton();
};

// date

const getDayOfWeek = (date) => {
  let dayOfWeek;
  switch (date.getDay()) {
    case 0:
      dayOfWeek = "Sunday";
      break;
    case 1:
      dayOfWeek = "Monday";
      break;
    case 2:
      dayOfWeek = "Tuesday";
      break;
    case 3:
      dayOfWeek = "Wednesday";
      break;
    case 4:
      dayOfWeek = "Thursday";
      break;
    case 5:
      dayOfWeek = "Friday";
      break;
    case 6:
      dayOfWeek = "Saturday";
      break;
  }

  return dayOfWeek;
};

const parseDateToCustomString = (date) => {
  const day = date.getDate();
  let month;
  switch (date.getMonth()) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }

  return `${month} ${day}`;
};

const getSelectedDate = () => {
  return document.querySelector(".date-input").value;
};

const setWordDateToToggleButton = () => {
  const toggleButton = document.querySelector(".datepicker-toggle-button");
  const dateInputValue = document.querySelector(".date-input").value;
  const date = new Date(dateInputValue);

  toggleButton.innerHTML = [
    getDayOfWeek(date),
    parseDateToCustomString(date),
  ].join(", ");
};

// interface
const addItem = (e) => {
  const itemText = e.target.value.trim();
  e.target.value = "";

  const items = getItems();

  const date = getSelectedDate();

  if (!itemText || !date) return;

  const curId = getId();
  const item = { id: `item-${curId}`, text: itemText, checked: false, date };
  items.push(item);
  setItems(items);
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

const editItem = (e) => {
  const id = e.parentElement.id;
  const text = e.value.trim();

  if (text && id) {
    const items = getItems();
    const index = items.findIndex((el) => el.id === id);

    items[index].text = text;

    setItems(items);
  }
  renderItems();
};

const checkboxHandler = (elem) => {
  const id = elem.parentElement.parentElement.id;

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
  document
    .querySelector(".add-item-input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addItem(e);
      }
    });
};

const initialization = () => {
  addEnterEventListeners();
  initializeLocalStorage();
  renderItems();
};

initialization();
