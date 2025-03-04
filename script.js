const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAll');
const showPendingBtn = document.getElementById('showPending');
const showDoneBtn = document.getElementById('showDone');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks
        .filter(task => filter === 'all' || (filter === 'pending' && !task.done) || (filter === 'done' && task.done))
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="text-decoration: ${task.done ? 'line-through' : 'none'}">${task.text}</span>
                <div>
                    <button aria-label="${task.done ? 'Desfazer tarefa' : 'Marcar tarefa como concluída'}" data-action="toggle" data-index="${index}">${task.done ? 'Desfazer' : 'Concluído'}</button>
                    <button aria-label="Excluir tarefa" data-action="delete" data-index="${index}">Excluir</button>
                </div>
            `;
            taskList.appendChild(li);
        });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, done: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
        alert('Task added successfully!'); // Feedback for task addition
    }
}

taskList.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const index = e.target.dataset.index;
    if (action === 'toggle') {
        toggleTask(index);
    } else if (action === 'delete') {
        deleteTask(index);
        alert('Task deleted successfully!'); // Feedback for task deletion
    }
});

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });
showAllBtn.addEventListener('click', () => { filter = 'all'; renderTasks(); });
showPendingBtn.addEventListener('click', () => { filter = 'pending'; renderTasks(); });
showDoneBtn.addEventListener('click', () => { filter = 'done'; renderTasks(); });

renderTasks();