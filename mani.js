document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput")
    const addTaskButton = document.getElementById("addTaskButton")
    const taskList = document.getElementById("taskList")
    const message = document.getElementById("message")

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = ""
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li")
            taskItem.className = "list-group-item d-flex justify-content-between align-items-center"
            taskItem.textContent = task

            const deleteButton = document.createElement("button")
            deleteButton.className = "btn btn-sm btn-danger"
            deleteButton.innerHTML = "&#128465;"
            deleteButton.onclick = () => {
                tasks.splice(index, 1)
            };

            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem)
        });
    }

    function addTask(task) {
        tasks.push(task)
        saveTasks()
        renderTasks()
        taskInput.value = ""
        message.textContent = "Todo item Created Successfully."
        setTimeout(() => message.textContent = "", 2000)
    }

    renderTasks();

    addTaskButton.onclick = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
        }
    };

    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const task = taskInput.value.trim();
            if (task) {
                addTask(task);
            }
        }
    });
});
