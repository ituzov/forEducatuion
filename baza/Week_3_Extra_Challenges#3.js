
const getKiller = (suspectInfo, deadPeople ) => {

    for (const key in suspectInfo){
    if (deadPeople.every(name => suspectInfo[key].includes(name))){
        return `Убийца ${key}`
    }
    }

    //return Object.keys(suspectInfo).find((key) =>
    //    deadPeople.every((name) => suspectInfo[key].includes(name))
    //);

}




console.log(
    getKiller(
        {
            James: ["Jacob", "Bill", "Lucas"],
            Johnny: ["David", "Kyle", "Lucas"],
            Peter: ["Lucy", "Kyle"]
        },
        ["Lucas", "Bill"]
    )
); // Убийца James

console.log(
    getKiller(
        {
            Brad: [],
            Megan: ["Ben", "Kevin"],
            Finn: []
        },
        ["Ben"]
    )
); // Уб