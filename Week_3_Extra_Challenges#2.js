const hero = {
    name: 'Batman',
    health: 100,
    heatEnemy(enemy){
    enemy.health -= 10;
    }
};
const enemy = {
    name: 'Joker',
    health: 100,
    heatHero(hero){
        hero.health -= 10;
    }
};


const startGame = (heroPlayer, enemyPlayer ) =>{
while (heroPlayer.health > 0 && enemyPlayer.health > 0){

    getRandomNumberInRange(0,1) === 0 ? heroPlayer.heatEnemy(enemyPlayer) : enemyPlayer.heatHero(heroPlayer);
}
    return heroPlayer.health === 0 ? enemyPlayer : heroPlayer;
}

let winner= startGame(hero, enemy);
console.log(`${winner.name} победил! У него осталось ${winner.health} здоровья`)

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}