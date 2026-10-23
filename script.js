const addTaskButton = document.getElementById('addTaskButton'); // gets add task button
const taskInput = document.getElementById('taskInput'); // gets task input field
const taskPriority = document.getElementById('taskPriority'); // gets task priority dropdown
const taskCount = document.getElementById('taskCount'); // gets the element to display task count
const taskList = document.querySelector('.task-list'); // gets the element to display the list of tasks


// Add task functionality

const tasks = []; // array to store tasks

addTaskButton.addEventListener('click', function() { // click event for add task button
    const taskValue = taskInput.value.trim(); // gets the text entered by user, trim removes spaces from beginning and end of string
    const priorityValue = taskPriority.value; // gets the selected priority
    
    if (taskValue === "") { // checks if the task input is empty
        alert("Please enter a task.");
        return; // stops the function if task input is empty
    }  

    const task = { // create a task object
        title: taskValue,
        priority: priorityValue,
        completed: false // default value indicating task is not completed
    };

    tasks.push(task); // add the task to the tasks array, push() adds an element to the end of the array
    
    taskCount.textContent = tasks.length + " tasks remaining."; // update the task count

    displayTasks(); // call displayTasks function to update the task list
});

// display tasks functionality

function displayTasks() {
    taskList.innerHTML = ""; // clears existing task cards before displaying updated list
    
    tasks.forEach(function(task) { // loops through each task in array
        const card = document.createElement('div'); // create a div element for the task card
        card.className = 'task-card'; // assign a class name to the task card
        
        const title = document.createElement("span"); // creates a span for the task title
        title.className = 'task-title'; // assigns task-title CSS class
        title.textContent = task.title; // gets title from current task object
        
        card.appendChild(title); // add the title to the task card
        taskList.appendChild(card); // add the new task card to the task list
    });
}