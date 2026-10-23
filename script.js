const addTaskButton = document.getElementById('addTaskButton'); // gets add task button
const taskInput = document.getElementById('taskInput'); // gets task input field
const taskPriority = document.getElementById('taskPriority'); // gets task priority dropdown
const taskCount = document.getElementById('taskCount'); // gets the element to display task count
const taskList = document.querySelector('.task-list'); // gets the element to display the list of tasks


// Add task functionality

const tasks = []; // array to store tasks
let editingTask = null; // stores the task currently being edited

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

        const taskInfo = document.createElement("div"); // creates a div for task information
        taskInfo.className = 'task-info'; // assigns task-info CSS class

        const title = document.createElement("span"); // creates a span for the task title
        title.className = 'task-title'; // assigns task-title CSS class
        title.textContent = task.title; // gets title from current task object
        
        const priority = document.createElement("span"); // creates a span for the task priority
        priority.className = 'priority-label'; // assigns priority-label CSS class
        priority.textContent = task.priority; // gets priority from current task object
        priority.classList.add("priority-" + task.priority.toLowerCase()) // adds CSS class based on priority

        const taskTop = document.createElement('div');
        taskTop.className = 'task-top'; 
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.className = 'edit-button'; // assigns edit-button CSS class
        editButton.setAttribute('aria-label', 'Edit task'); // accessibility label for screen readers

        editButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
        `;

        editButton.addEventListener('click', function() { // edit task on click
            editingTask = task; // stores the task the user clicked
            displayTasks(); // refresh the task list to reflect the editing state
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.setAttribute('aria-label', 'Delete task'); 

        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        `;

        deleteButton.addEventListener('click', function() { // delete task on click
            const index = tasks.indexOf(task); // finds task's position in array
            tasks.splice(index, 1); // removes one task from the array
            taskCount.textContent = tasks.length + " tasks remaining."; // update the task count
            displayTasks(); // refresh the task list to reflect the deletion
        })

        const taskBottom = document.createElement('div'); // creates the bottom section of task card
        taskBottom.className = 'task-bottom'; // applies task-bottom CSS class

        const doingNowButton = document.createElement('button'); // creates the "Doing Now" button
        doingNowButton.className = 'doing-now-button'; // applies doing-now-button CSS class
        doingNowButton.textContent = 'Doing Now'; // sets the button text
        
        if (editingTask === task) { // check if the current task is being edited
            const editInput = document.createElement('input'); // create an input field for editing
            editInput.type = 'text'; // set input type to text
            editInput.value = task.title; // set input value to current task title
            taskInfo.appendChild(editInput); // add the input field to the task info div
        } else {
            taskInfo.appendChild(title); // add the title to the task info div if not editing
        }

        taskInfo.appendChild(priority); // add the priority to the task info div
        
        taskTop.appendChild(checkbox); // add the checkbox to the task top div
        taskTop.appendChild(taskInfo); // add the task info div to the task card
        
        taskActions.appendChild(editButton); // add the edit button to the task actions div    
        taskActions.appendChild(deleteButton); // add the delete button to the task actions div
        taskTop.appendChild(taskActions); // add the task actions div to the task top div
        
        taskBottom.appendChild(doingNowButton); // add the "Doing Now" button to the task bottom div

        card.appendChild(taskTop); // add the task top div to the task card
        card.appendChild(taskBottom); // add the task bottom div to the task card
        taskList.appendChild(card); // add the new task card to the task list
    });
}