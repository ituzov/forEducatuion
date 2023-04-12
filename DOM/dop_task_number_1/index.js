class CustomSelect {

    #id
    #options
    #currentSelectedOption

    constructor(id, options) {
        this.#id = id;
        this.#options = options;
    }

    #createDropdown() {
        const selectDropdown = document.createElement('div');
        selectDropdown.classList.add(`select-dropdown`,`select-dropdown--${this.#id}`);


        const buttonDropdown = document.createElement('button');
        buttonDropdown.classList.add(`select-dropdown__button`,`select-dropdown__button--${this.#id}`);

        const spanDropdown = document.createElement('span');
        spanDropdown.classList.add(`select-dropdown__text`,`select-dropdown__text--${this.#id}`);
        spanDropdown.innerText = `Выберите элемент`;

        const ulDropdown = document.createElement('ul');
        ulDropdown.classList.add(`select-dropdown__list`,`select-dropdown__list--${this.#id}`)

        this.#options.forEach(item => {
            const liDropdown = document.createElement('li')
            liDropdown.className = 'select-dropdown__list-item';
            liDropdown.dataset.value = item.value;
            liDropdown.innerText = item.text;

            ulDropdown.append(liDropdown);
        })

        buttonDropdown.append(spanDropdown);
        selectDropdown.append(buttonDropdown, ulDropdown);

        return selectDropdown;

    };


    #buttonEvent(){
        document.querySelector(`.select-dropdown__button--${this.#id}`).addEventListener('click', () => {
            if(!document.querySelector(`.select-dropdown__list--${this.#id}`).classList.contains('active')){
            document.querySelector(`.select-dropdown__list--${this.#id}`).classList.add('active');
            }else {document.querySelector(`.select-dropdown__list--${this.#id}`).classList.remove('active')}
        });
    };

    #listEvent(){
        document.querySelector('.select-dropdown__list').addEventListener('click', (event)=>{
            if (event.target.closest('li')){
                this.#currentSelectedOption = event.target.dataset.value;
                const selectedOption = this.#options.find(option => option.value.toString() === this.#currentSelectedOption);
                document.querySelector(`.select-dropdown__text--${this.#id}`).innerText = selectedOption.text;

                const listItems = document.querySelectorAll(`.select-dropdown__list--${this.#id} li`);
                listItems.forEach(item => {
                    item.classList.remove('selected');
                });

                event.target.classList.add('selected');
            }

        })
    };

    get selectedValue(){
        return this.#options.find(option => option.value.toString() === this.#currentSelectedOption);
    }

    render(container){
        container.append(this.#createDropdown());
        this.#buttonEvent();
        this.#listEvent();
    };

}


const options = [
    { value: 1, text: 'JavaScript' },
    { value: 2, text: 'NodeJS' },
    { value: 3, text: 'ReactJS' },
    { value: 4, text: 'HTML' },
    { value: 5, text: 'CSS' }
];


const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);

