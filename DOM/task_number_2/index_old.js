const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];


function createGeneralDiv(newClass, id){
    const generalDiv = document.createElement('div');
    generalDiv.classList.add(newClass);
    generalDiv.dataset.taskId = id;
    generalDiv.append(createContainerAndContent('task-item__main-container', 'task-item__main-content', id));


    return generalDiv;
}

function createContainerAndContent(containerClass, contentClass, deleteId){
    const containerDiv = document.createElement('div')
    containerDiv.classList.add(containerClass);

    const spam = document.createElement('spam');
    spam.classList.add('task-item__text');

    const content = createDiv(contentClass);
    content.append(createForm(deleteId));
    content.append(spam);
    containerDiv.prepend(content);
    containerDiv.append(createButton(deleteId));
    return containerDiv;
}

function createDiv(newClass){
    const div = document.createElement('div')
    div.classList.add(newClass);
    return div;
}

function createButton(deleteId){
    const button = document.createElement('button');
    button.classList.add('task-item__delete-button', 'default-button', 'delete-button');
    button.dataset.deleteTaskId = deleteId;
    button.textContent = 'Удалить';
    return button;
}

function createForm(id){
    const form = document.createElement('form');
    form.classList.add('checkbox-form');

    const input = document.createElement('input');
    input.classList.add('checkbox-form__checkbox');
    input.type = 'checkbox';
    input.id = `tasks-${id}`;

    const label = document.createElement('label');
    label.htmlFor = `tasks-${id}`;

    form.append(input, label);

    return form;

}

const tasksList = document.querySelector('.tasks-list');


tasks.forEach((item, index) =>{
    tasksList.append(createGeneralDiv('task-item', item.id));
    const span = document.querySelectorAll('.task-item__text'); // Странное телодвижение, но так требуется по условию
    span[index].textContent = item.text;
})

