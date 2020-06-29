let todoData = [];

const list = document.querySelector(".list_wrapper");
const task = document.querySelector(".input_block");
const addBtn = document.querySelector(".btn_add");
const num = document.querySelector(".task_num");
const cleanBtn = document.querySelector(".btn_clean");


// 渲染畫面
function render() {
  let listItem = "";

  todoData.forEach(function (item) {
    listItem =
      listItem +
      ` <li class="list_item">
            <input type="checkbox" class="input_checkbox mr_2" data-id="${
              item.id
            }"  ${item.completed ? "checked" : ""}>
            <label>${item.taskTitle}</label>
            <button class="btn_delete">
                <span data-id="${item.id}" class="material-icons">remove_circle_outline</span>
            </button>
        </li>`;
  });

  list.innerHTML = listItem;
  num.textContent = todoData.length;
  setDefaultList();

  // 單筆完成按鈕
  const checkboxs = document.querySelectorAll(".input_checkbox");
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("click", completeTask);
  });

  // 單筆刪除按鈕
  const btns = document.querySelectorAll(".btn_delete");
  btns.forEach((btn) => {
    btn.addEventListener("click", removeTask);
  });
}

// 更新資料
function updateData() {
  let newTask = task.value.trim();
  todoData.push({
    id: Math.floor(Date.now()),
    taskTitle: newTask,
    completed: false,
  });
  task.value = "";
  render(todoData);
}

// 完成一筆任務
function completeTask(e) {
  todoData.forEach((item) => {
    if (parseInt(e.target.dataset.id) == item.id) {
      item.completed = item.completed ? false : true;
    }
  });
  render(todoData);
}

// 移除一筆資料
function removeTask(e) {
  let index = 0;
  todoData.forEach((item, key) => {
      if (parseInt(e.target.dataset.id) == item.id) {
          index = key;
          // console.log(e.target);
      }
  });

  todoData.splice(index, 1);
  render(todoData);
}

// 移除全部資料
function removeAllTask() {
  todoData = [];
  render();
  setDefaultList();
}

// 無任務時預設內容
function setDefaultList() {
  if (todoData.length < 1) {
    list.innerHTML = `<li>
        <p class="list_msg">- 目前尚無任務 -</p>
    </li>`;
  }
}


render(todoData);

addBtn.addEventListener("click", updateData);
cleanBtn.addEventListener("click", removeAllTask);
task.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
        updateData();
    }
});