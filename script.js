// Add task functionality
const addTaskButton = document.getElementById('addTaskButton'); // gets add task button
const taskInput = document.getElementById('taskInput'); // gets task input field
const taskPriority = document.getElementById('taskPriority'); // gets task priority dropdown
const taskCount = document.getElementById('taskCount'); // gets the element to display task count
const taskList = document.getElementById('taskList'); // gets the element to display the list of tasks

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
});

