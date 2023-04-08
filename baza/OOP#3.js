class Dictionary {
    constructor(name) {
        this.name = name;
        this.words = {};
    }

    add(word, description) {
        word in this.words ? console.error("Такое слово уже есть") :
            this.words[word] = {
            word,
            description
        }
    }

    remove(key){
        delete this.words[key];
    }

    get(key) {
        return this.words[key];
    }

    showAllWords(){
      Object.values(this.words).forEach(item => console.log(`${item.word} - ${item.description}`));
    }

}

const dictionary = new Dictionary('Толковый словарь');
dictionary.add('JavaScript', 'популярный язык программирования');
dictionary.add('Веб-разработчик', 'Человек, который создает новые сервисы и сайты или поддерживает и дополняет существующие');

dictionary.remove('JavaScript');
dictionary.showAllWords();

