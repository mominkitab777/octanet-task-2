document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;

    if (taskName && category && priority) {
        const task = {
            name: taskName,
            category: category,
            priority: priority,
        };

        saveTask(task);
        clearForm();
        loadTasks();
    } else {
        alert("Please fill in all fields");
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.classList.add("task");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function () {
            deleteTask(index);
        };

        li.innerHTML = `<span>${task.name} (${task.category}) - Priority: ${task.priority}</span>`;
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function clearForm() {
    document.getElementById("taskName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("priority").value = "high";
}
