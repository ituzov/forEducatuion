// Глобальные переменные
const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Посмотреть новый урок по JavaScript"
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Выполнить тест после урока"
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Выполнить ДЗ после урока"
    }
];


const tasksListContainer = document.querySelector(".tasks-list");

// Функция для создания элементов задачи
const createTaskItem = (taskId, taskText, spanSelector = 'task-item__text') => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = taskId;

    const taskItemMainContainer = document.createElement("div");
    taskItemMainContainer.className = "task-item__main-container";

    const taskItemMainContent = document.createElement("div");
    taskItemMainContent.className = "task-item__main-content";

    taskItem.append(taskItemMainContainer);
    taskItemMainContainer.append(taskItemMainContent);

    const checkboxForm = document.createElement("form");
    checkboxForm.className = "checkbox-form";

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.className = "checkbox-form__checkbox";
    const inputId = `task-${taskId}`;
    inputCheckbox.id = inputId;

    const labelCheckbox = document.createElement("label");
    labelCheckbox.htmlFor = inputId;

    const taskItemText = document.createElement("span");
    taskItemText.className = spanSelector;
    taskItemText.innerText = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className =
        'task-item__delete-button default-button delete-button';
    deleteButton.innerText = `Удалить`;

    taskItemMainContent.append(checkboxForm, taskItemText);
    checkboxForm.append(inputCheckbox, labelCheckbox);
    taskItemMainContainer.append(deleteButton);

    return taskItem;
};

// Функция для создания модального окна
const createModal = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay modal-overlay_hidden';

    const deleteModal = document.createElement('div');
    deleteModal.className = 'delete-modal';

    const deleteModalQuestion = document.createElement('h3');
    deleteModalQuestion.className = 'delete-modal__question';
    deleteModalQuestion.innerText = 'Вы действительно хотите удалить эту задачу?';

    const deleteModalButtons = document.createElement('div');
    deleteModalButtons.className = 'delete-modal__buttons';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'delete-modal__button delete-modal__cancel-button';
    cancelButton.innerText = 'Отмена';

    const confirmButton = document.createElement('button');
    confirmButton.className = 'delete-modal__button delete-modal__confirm-button';
    confirmButton.innerText = 'Удалить';

    deleteModalButtons.append(cancelButton, confirmButton);
    deleteModal.append(deleteModalQuestion, deleteModalButtons);
    modalOverlay.append(deleteModal);

    return modalOverlay;
};



// Функция для удаления всех сообщений об ошибках
const removeErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message-block');
    errorMessages.forEach(errorMessage => errorMessage.remove());
};

// Функция для добавления сообщения об ошибке
const addErrorMessage = (text) => {
    removeErrorMessages();
    const createTaskBloc = document.querySelector('.create-task-block');
    const errorMessage = document.createElement("span");
    errorMessage.className = 'error-message-block';
    errorMessage.innerText = text;
    createTaskBloc.append(errorMessage)
};

// Функция для добавления новой задачи
const addNewTask = (textToAdd) => {
    const id = Date.now().toString();
    tasks.push({
        id,
        completed: false,
        text: textToAdd,
    });

    removeErrorMessages();
    tasksListContainer.append(createTaskItem(id, textToAdd));
};

// Обработчик для отправки формы создания новой задачи
const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const textToAdd = form.querySelector('.create-task-block__input').value;

    if (textToAdd) {
        if (tasks.find(obj => obj.text === textToAdd)) {
            addErrorMessage('Такое значение уже есть');
        } else {
            addNewTask(textToAdd);
        }
    } else {
        addErrorMessage('Название задачи не должно быть пустым');
    }
};

// Обработчики для кнопок модального окна
const handleCancelButtonClick = () => {
    const modalWindow = document.querySelector('.modal-overlay');
    modalWindow.classList.add('modal-overlay_hidden');
};

const handleConfirmButtonClick = () => {
    const modalWindow = document.querySelector('.modal-overlay');
    const taskId = modalWindow.dataset.taskId;

    const elementForDelete = tasks.findIndex(item => item.id === taskId);
    tasks.splice(elementForDelete, 1);

    tasksListContainer.querySelector(`[data-task-id="${taskId}"]`).remove();
    modalWindow.classList.add('modal-overlay_hidden');
};

// Обработчик для нажатия на кнопку удаления задачи
const handleTaskListClick = (event) => {
    if (event.target.closest('button')) {
        const modalWindow = document.querySelector('.modal-overlay');
        modalWindow.dataset.taskId = event.target.closest('.task-item').dataset.taskId;
        modalWindow.classList.remove('modal-overlay_hidden');
    }
};

//функция Инициализация
const initializeApp = () => {
    tasks.forEach((task) => {
        const taskItem = createTaskItem(task.id, task.text);
        tasksListContainer.append(taskItem);
    });

    const form = document.querySelector('.create-task-block');
    form.addEventListener('submit', handleFormSubmit);

    document.querySelector('body').append(createModal());
    const modalWindow = document.querySelector('.modal-overlay');
    const cancelButton = modalWindow.querySelector('.delete-modal__cancel-button');
    const confirmButton = modalWindow.querySelector('.delete-modal__confirm-button');

    tasksListContainer.addEventListener('click', handleTaskListClick);
    cancelButton.addEventListener('click', handleCancelButtonClick);
    confirmButton.addEventListener('click', handleConfirmButtonClick);
};

let isDarkTheme = false;

const toggleTheme = () => {
    const body = document.querySelector('body');
    const taskItems = document.querySelectorAll('.task-item');
    const buttons = document.querySelectorAll('button');

    if (isDarkTheme) {
        body.style.background = 'initial';

        taskItems.forEach(item => {
            item.style.color = 'initial';
        });

        buttons.forEach(button => {
            button.style.border = 'none';
        });
    } else {
        body.style.background = '#24292E';

        taskItems.forEach(item => {
            item.style.color = '#ffffff';
        });

        buttons.forEach(button => {
            button.style.border = '1px solid #ffffff';
        });
    }

    isDarkTheme = !isDarkTheme;
};

const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();
        toggleTheme();
    }
};

document.addEventListener('keydown', handleKeyDown);

initializeApp();
