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

class HardWordsDictionary extends Dictionary{
    add(word, description) {
        word in this.words ? console.error("Такое слово уже есть") :
            this.words[word] = {
                word,
                description,
                isDifficult: true,
            }
    }

}


const hardWordsDictionary = new HardWordsDictionary('Сложные слова');

hardWordsDictionary.add('дилетант', 'Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями.');

hardWordsDictionary.add('неологизм', 'Новое слово или выражение, а также новое значение старого слова.');

hardWordsDictionary.add('квант', 'Неделимая часть какой-либо величины в физике.');

hardWordsDictionary.remove('неологизм');

hardWordsDictionary.showAllWords();

