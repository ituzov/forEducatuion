const body = document.querySelector('body');
// body.innerHTML = `<form class="create-user-form">
//     <label>
//         Имя
//         <input type="text" name="userName" placeholder="Введите ваше имя">
//     </label>
//     <label>
//         Пароль
//         <input type="password" name="password" placeholder="Придумайте Пароль">
//     </label>
//     <button type="submit">
//         Подтвердить
//     </button>
// </form>`;



function createLabel (textContent, typeInput, nameInput, placeholderInput) {
    const newLabel = document.createElement("label");
    newLabel.textContent = textContent;
    newLabel.append(createInput(typeInput, nameInput, placeholderInput));
    return newLabel;
}

function createInput(type, name, placeholder)  {
    const newInput = document.createElement("input");
    newInput.type = type;
    newInput.name = name;
    newInput.placeholder = placeholder;
    return newInput;
}

function createButton(type, text) {
    const newButton = document.createElement("button");
    newButton.type = type;
    newButton.textContent = text;
    return newButton;
}

const form = document.createElement("form");
form.classList.add("create-user-form");

form.append(createLabel('Имя', 'text', 'userName', 'Введите ваше имя'));
form.append(createLabel('Пароль', 'password', 'password', 'Придумайте пароль'));
form.append(createButton('submit', 'Подтвердить'));

body.append(form);