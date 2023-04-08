const getWinner = (applicants, winnerObject) =>{

    const winnerArr = Object.keys(applicants);
    const winnerArrPosition =  getRandomNumberInRange(0, winnerArr.length );
    const winnerKey = String(winnerArr[winnerArrPosition]);

    return {
        ...winnerObject,
        ...applicants[winnerKey],
    }



}


const todaysWinner = {
    prize: '10 000$',
}

const winnerApplicants = {
    '001': {
        name: 'Максим',
        age: 25,
    },
    '201': {
        name: 'Светлана',
        age: 20,
    },
    '304': {
        name: 'Екатерина',
        age: 35,
    },
}

const resultWinner = getWinner(winnerApplicants, todaysWinner);
console.log('resultWinner', resultWinner);
// { prize: '10 000$', name: 'Максим', age: 25 }

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}