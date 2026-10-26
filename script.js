const addTaskButton = document.getElementById('addTaskButton'); // gets add task button
const taskInput = document.getElementById('taskInput'); // gets task input field
const taskPriority = document.getElementById('taskPriority'); // gets task priority dropdown
const taskCount = document.getElementById('taskCount'); // gets the element to display task count
const taskList = document.querySelector('.task-list'); // gets the element to display the list of tasks
const currentTask = document.getElementById('currentTask'); // gets the element to display the current task

// Add task functionality

const tasks = []; // array to store tasks
let editingTask = null; // stores the task currently being edited
let completedCount = 0; // keeps track of the order of completed tasks
let doingNowTask = null; // stores the task currently being done

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
    
    updateTaskCount(); // update the task count

    displayTasks(); // call displayTasks function to update the task list
});

// display tasks functionality

function displayTasks() {
    taskList.innerHTML = ""; // clears existing task cards before displaying updated list
    

    const priorityOrder = { // asigns a number to each priority level for sorting purposes
        High: 1,
        Medium: 2,
        Low: 3
    }

    const sortedTasks = [...tasks].sort(function(a, b) { // creates a copy of the tasks array and sorts it, [...tasks] ... is a spread operator
        
        if (a.completed !== b.completed) { // checking if one task is completed and the other is not
            return a.completed ? 1 : -1; // completed tasks go to the end
        }

        if (a.completed && b.completed) {
            return a.completionOrder - b.completionOrder; // sort completed tasks by their completion order
        }
        
        return priorityOrder[a.priority] - priorityOrder[b.priority]; //compares the priority of two tasks for sorting
    });


    sortedTasks.forEach(function(task) { // loops through each task in the sorted array
        const card = document.createElement('div'); // create a div element for the task card
        card.className = 'task-card'; // assign a class name to the task card


        // highlight doing now task
        if (doingNowTask === task) {
            card.classList.add('doing-now');
        }

        if (task.completed) {
            card.classList.add('completed'); // adds completed class if task is completed, task will be crossed out
        }

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

        checkbox.checked = task.completed; // sets checkbox based on whether task is completed

        checkbox.addEventListener('change', function() { // runs when checkbox is checked or unchecked
            task.completed = checkbox.checked; // updates the task's completed status   
            
            if (task.completed == true) {
                completedCount++; // increment the completed task count
                task.completionOrder = completedCount; // saves the completion order for the task
            }
            else {
                task.completionOrder = null; // reset the completion order when task is unchecked
            }

            updateTaskCount(); // update the task count
            displayTasks(); // refresh the task list to reflect the change
        });

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
        
        // disable doing now button if the task is already completed
        if (task.completed === true) {
            doingNowButton.disabled = true; 
        }

        doingNowButton.addEventListener('click', function() { // runs when Doing Now is clicked
            if (doingNowTask === task) { // checks if task is already selected
                doingNowTask = null; // clears selected task
                currentTask.textContent = "No task selected"; // clear the current task display area
            } else {
                doingNowTask = task; // sets the selected task
                currentTask.textContent = task.title; // displays its title in focus session area
            }
            
            displayTasks(); // refresh the task list to highlight the current task
        })

        if (editingTask === task) { // check if the current task is being edited
            const editInput = document.createElement('input'); // create an input field for editing
            editInput.type = 'text'; // set input type to text
            editInput.value = task.title; // set input value to current task title
            taskInfo.appendChild(editInput); // add the input field to the task info div
        } else {
            taskInfo.appendChild(title); // add the title to the task info div if not editing
        }

        
        if (editingTask === task) { // checks if this task is being edited
            const editPriority = document.createElement("select"); // creates priority dropdown

            ["Low", "Medium", "High"].forEach(function(level) { // loops through priority levels
                const option = document.createElement("option"); // creates an option
                option.value = level; // sets option value
                option.textContent = level; // displays priority name
                editPriority.appendChild(option); // adds option to dropdown
            });

            editPriority.value = task.priority; // selects current task priority
            taskInfo.appendChild(editPriority); // adds dropdown below title input

            // Edit Form Buttons

            const editButtons = document.createElement("div"); // creates container for both buttons
            editButtons.className = "edit-buttons"; // assigns CSS class

            const cancelButton = document.createElement("button"); // creates Cancel button
            cancelButton.textContent = "Cancel"; // adds button text
            cancelButton.className = "cancel-button"; // assigns CSS class

            cancelButton.addEventListener("click", function() { // runs when Cancel is clicked
                editingTask = null; // exits editing mode
                displayTasks(); // redraws original task card
            });

            const saveButton = document.createElement("button"); // creates Save button
            saveButton.textContent = "Save Changes"; // adds button text
            saveButton.className = "save-button"; // assigns CSS class

            saveButton.addEventListener("click", function() { // runs when Save Changes is clicked
                const newTitle = taskInfo.querySelector("input").value.trim(); // gets edited title

                if (newTitle === "") { // checks for an empty title
                    alert("Task title cannot be empty."); // displays error
                    return; // stops saving
                }

                task.title = newTitle; // saves the new title
                task.priority = editPriority.value; // saves the selected priority
                
                // update task priority
                if (task.priority !== editPriority.value) { // checks if priority has changed
                    task.priority = editPriority.value; // saves new priority

                    const index = tasks.indexOf(task); // finds the task in original array
                    tasks.splice(index, 1); // removes it from old position
                    tasks.push(task); // moves it to end of the array 
                }

                editingTask = null; // exits editing mode
                displayTasks(); // redraws task card with changes
            });

            editButtons.appendChild(cancelButton); // adds Cancel to button container
            editButtons.appendChild(saveButton); // adds Save Changes next to Cancel
            taskInfo.appendChild(editButtons); // places both buttons under the dropdown

        } else {
            taskInfo.appendChild(priority); // shows normal priority label when not editing
        }

        // positioning task elements within the card

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

// update task count functionality

function updateTaskCount() { // updates the task count display
    const activeTasks = tasks.filter(function(task) {
        return task.completed === false;
    });
    taskCount.textContent = activeTasks.length + " tasks remaining";
}