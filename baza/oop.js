// function Animal(name){
//     this.name = name;
//
//     this.getName = function() {
//         return this.name;
//     }
// }


class Animal{
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }
}

const cat = new Animal('Кот');
console.log('кот', cat.getName());

