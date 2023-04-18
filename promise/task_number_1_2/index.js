class InfoGenerator {
    #url
    constructor(url) {
        this.#url = url;
    }

    //Запрос данных, возвращает промис с отформатированными данными
    #fetchData(url){
        return fetch(url)
            .then(res => {
                if (!res.ok){
                    throw new Error('Ошибка запроса')
                }
                return res.json();
            })
            .catch(err => console.log(`Ошибка - ${err}`))
    }

    //Меняет значение лоадера
    #checkHidden(){
        const loader = document.getElementById('loader');
        loader.hidden = !loader.hidden;
    }

    //Создает элемент с переданным в него текстом
    #createUserElement(text){
        const element = document.createElement('li');
        const elementAnchor = document.createElement('a');
        elementAnchor.href = '#';
        elementAnchor.innerText = text;
        element.append(elementAnchor);

        return element;
    };

    //Добавляет элементы на страницу
    #addElements(data, property){
        const dataContainer = document.getElementById('data-container');
        data.forEach(item => {
        dataContainer.append(this.#createUserElement(item[property]))
        });
    };

    renderAll(property = 'name'){
        this.#checkHidden();
        this.#fetchData(this.#url)
            .then(data =>{
                console.log(data)
            this.#addElements(data, property)
            })
            .catch(err => console.log(err))
            .finally(this.#checkHidden)
    };

    getUsersByIds(ids, property = 'name'){
        this.#checkHidden();
        const request = ids.map((id) => fetch(`${this.#url}/${id}`));
        Promise.all(request)
            .then(responses => {
                const dataResults = responses.map((res) => res.json());
                return Promise.all(dataResults)
            })
            .then(data => {
                this.#addElements(data, property);
                this.#checkHidden()
            })
            .catch(err => {
                console.log(`Ошибка - ${err}`);
            })

    }

}

const page = new InfoGenerator('https://jsonplaceholder.typicode.com/users');
page.getUsersByIds([5, 6, 2, 1]);
