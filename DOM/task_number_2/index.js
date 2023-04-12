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


/**
 * Удаляет все ошибки
 */
const removeErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message-block');
    errorMessages.forEach(errorMessage => errorMessage.remove());
};

/**
 * Добавляет ошибку
 */
const addErrorMessage = (text) =>{
    removeErrorMessages();
    const createTaskBloc = document.querySelector('.create-task-block');
    const errorMessage = document.createElement("span");
    errorMessage.className = 'error-message-block';
    errorMessage.innerText = text;
    createTaskBloc.append(errorMessage)
}

const tasksListContainer = document.querySelector(".tasks-list");
tasks.forEach((task) => {
    const taskItem = createTaskItem(task.id, task.text);
    tasksListContainer.append(taskItem);
});

const form = document.querySelector('.create-task-block');
form.addEventListener('submit', (event) => {

    event.preventDefault(); // сбрасывает дефолтные значения форм

    const textToAdd = form.querySelector('.create-task-block__input').value;
    if (textToAdd){
        if (tasks.find(obj => obj.text === textToAdd )){

            addErrorMessage('Такое значение уже есть');

        }else{

            //Создаем id
            const id = Date.now().toString();

            //Добавляем в массив новый объект
            tasks.push({
                id,
                completed: false,
                text: textToAdd,
            });

            removeErrorMessages();//Удаляем все ошибки

            // Добавляем в DOM используя уже написанную функцию
            tasksListContainer.append(createTaskItem(id, textToAdd));

        }
    } else {
        addErrorMessage('Название задачи не должно быть пустым');
    }
});

document.querySelector('body').append(createModal());  // добавляем модальное окно
const modalWindow = document.querySelector('.modal-overlay');
const cancelButton = modalWindow.querySelector('.delete-modal__cancel-button');
const confirmButton = modalWindow.querySelector('.delete-modal__confirm-button')

let taskId;

tasksListContainer.addEventListener('click', (event) =>{
if (event.target.closest('button')){
    modalWindow.classList.remove('modal-overlay_hidden');
    taskId = event.target.closest('.task-item').dataset.taskId.toString();
    console.log(taskId);
}
});

cancelButton.addEventListener('click', () =>{
    modalWindow.classList.add('modal-overlay_hidden');
});

confirmButton.addEventListener('click', () =>{

    const elementForDelete = tasks.findIndex(item => item.id === taskId.toString());
    tasks.splice(elementForDelete, 1);
    console.log(tasks)

    tasksListContainer.querySelector(`[data-task-id="${taskId.toString()}"]`).remove();

    modalWindow.classList.add('modal-overlay_hidden');

});
