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



const h3TagModalWindow = document.createElement('h3')
h3TagModalWindow.className = 'delete-modal__question'
h3TagModalWindow.textContent = 'Вы действительно хотите удалить эту задачу?'

const buttonCancelModalWindow = document.createElement('button')
buttonCancelModalWindow.classList = 'delete-modal__button delete-modal__cancel-button'
buttonCancelModalWindow.textContent = 'Отмена'

buttonCancelModalWindow.addEventListener('click', () => {
    containerModalWindow.classList = 'modal-overlay modal-overlay_hidden'
})

const buttonDeletelModalWindow = document.createElement('button')
buttonDeletelModalWindow.classList = 'delete-modal__button delete-modal__confirm-button'
buttonDeletelModalWindow.textContent = 'Удалить'


const divTagModalWindow = document.createElement('div')
divTagModalWindow.className = 'delete-modal__buttons'
divTagModalWindow.append(buttonCancelModalWindow)
divTagModalWindow.append(buttonDeletelModalWindow)

const modalWindow = document.createElement('div')
modalWindow.className = 'delete-modal'
modalWindow.append(h3TagModalWindow)
modalWindow.append(divTagModalWindow)

const containerModalWindow = document.createElement('div')
containerModalWindow.classList = 'modal-overlay modal-overlay_hidden'
containerModalWindow.append(modalWindow)

const body = document.querySelector('body')
body.append(containerModalWindow)


const createTaskItem = (id, text) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.id = id;

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
    const inputId = `task-${id}`;
    inputCheckbox.id = inputId;

    const labelCheckbox = document.createElement("label");
    labelCheckbox.htmlFor = inputId;

    const taskItemText = document.createElement("span");
    taskItemText.className = "task-item__text";
    taskItemText.innerText = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "task-item__delete-button default-button delete-button";
    deleteButton.innerText = "Удалить";


    tasks.push({ id, completed: false, text });

    taskItemMainContent.append(checkboxForm, taskItemText);
    checkboxForm.append(inputCheckbox, labelCheckbox);
    taskItemMainContainer.append(deleteButton);
    return taskItem;
};

const form = document.querySelector('.create-task-block');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const textToAdd = event.target.elements.taskName.value.trim();
    let id = Date.now();

    const isValidate = tasks.some((task) => task.text === textToAdd)
    const tasksListContainer = document.querySelector(".tasks-list");


    if (textToAdd == '') {
        if (document.querySelector('.error-message-block')) {
            const errorBlock = document.querySelector('.error-message-block')
            errorBlock.remove()
        }
        const errorSpan = document.createElement('span')
        errorSpan.textContent = `Название задачи не должно быть пустым`
        errorSpan.className = 'error-message-block'
        const createTaskBlock = document.querySelector('.create-task-block')
        createTaskBlock.append(errorSpan)
    }
    else if (isValidate) {
        if (document.querySelector('.error-message-block')) {
            const errorBlock = document.querySelector('.error-message-block')
            errorBlock.remove()
        }
        const errorSpan = document.createElement('span')
        errorSpan.textContent = `Задача с таким названием уже существует.`
        errorSpan.className = 'error-message-block'
        const createTaskBlock = document.querySelector('.create-task-block')
        createTaskBlock.append(errorSpan)
    }
    else if (textToAdd != '' && !isValidate) {
        const taskItem = createTaskItem(id, textToAdd);
        tasksListContainer.append(taskItem)
        if (document.querySelector('.error-message-block')) {
            const errorBlock = document.querySelector('.error-message-block')
            errorBlock.remove()
        }
    }
});

let deleteID = null

const tasksList = document.querySelector('.tasks-list')

tasksList.addEventListener('click', (event) => {

    if (event.target.classList.contains('task-item__delete-button')) {

        containerModalWindow.classList.remove('modal-overlay_hidden')
        const parent = event.target.closest('[data-id]')
        deleteID = parent.dataset.id

    }

})

buttonDeletelModalWindow.addEventListener('click', del)

function del() {
    const deleteElement = tasks.findIndex((obj) => obj.id.toString() === deleteID.toString())
    console.log(deleteElement);
    tasks.splice(deleteElement, 1)
    const taskItemHTML = document.querySelector(`[data-id = "${deleteID}" ]`)
    taskItemHTML?.remove()
    containerModalWindow.classList = 'modal-overlay modal-overlay_hidden'

}