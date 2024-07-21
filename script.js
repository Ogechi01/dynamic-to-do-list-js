// Function to add a task to the list
function addTask(taskText, save = true) {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Check if taskText is not empty
    if (taskText !== "") {
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add click event listener to the remove button
        removeButton.onclick = function () {
            // Remove the task from the DOM
            taskList.removeChild(li);
            // Remove the task from localStorage
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Save the task to localStorage if needed
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    } else {
        // Alert user if input field is empty
        alert("Please enter a task.");
    }
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage and display them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent saving again
}

// Event listener for the "Add Task" button
document.getElementById('add-task-btn').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    addTask(taskInput.value.trim());
});

// Event listener for the "Enter" key press in the input field
document.getElementById('task-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const taskInput = document.getElementById('task-input');
        addTask(taskInput.value.trim());
    }
});

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

