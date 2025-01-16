// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const activeTasksList = document.getElementById('activeTasks');
    const completedTasksList = document.getElementById('completedTasks');

    let tasks = [
        { id: 1, text: "Aller à la Salle", completed: false },
        { id: 2, text: "Payer Facture", completed: true },
        { id: 3, text: "Hit the Road", completed: false },
        { id: 4, text: "Acheter un Sandwich", completed: false },
        { id: 5, text: "Lire", completed: false },
        { id: 6, text: "Payer employés", completed: false },
    ];

    function renderTasks() {
        activeTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const li = createTaskElement(task);
            if (task.completed) {
                completedTasksList.appendChild(li);
            } else {
                activeTasksList.appendChild(li);
            }
        });
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i data-lucide="edit-2"></i></button>
                <button class="toggle-btn"><i data-lucide="check"></i></button>
                <button class="delete-btn"><i data-lucide="x"></i></button>
            </div>
        `;

        li.querySelector('.edit-btn').addEventListener('click', () => editTask(task, li));
        li.querySelector('.toggle-btn').addEventListener('click', () => toggleTask(task));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task));

        return li;
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = { id: Date.now(), text, completed: false };
            tasks.push(newTask);
            renderTasks();
            taskInput.value = '';
        }
    }

    function editTask(task, li) {
        const span = li.querySelector('.task-text');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = task.text;
        li.insertBefore(input, span);
        li.removeChild(span);

        function saveEdit() {
            task.text = input.value;
            renderTasks();
        }

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });
        input.focus();
    }

    function toggleTask(task) {
        task.completed = !task.completed;
        renderTasks();
    }

    function deleteTask(task) {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});

