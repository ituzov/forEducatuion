const peopleWithVisa = [
    {
        firstName: 'Stasia',
        lastName: 'Ward',
        criminalRecord: true,
        passportExpiration: '19.06.2040',
    },
    {
        firstName: 'Elliot',
        lastName: 'Baker',
        criminalRecord: false,
        passportExpiration: '04.06.2041',
    },
    {
        firstName: 'Leighann',
        lastName: 'Scott',
        criminalRecord: true,
        passportExpiration: '31.07.2039',
    },
    {
        firstName: 'Nick',
        lastName: 'Pop',
        criminalRecord: false,
        passportExpiration: '31.12.2010',
    },
];

function allowVisa(arr) {
    const nowDate = new Date();
    const newArr = arr.filter(value => {
        const dateParts = value.passportExpiration.split('.');
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        if (value.criminalRecord === false && nowDate < formattedDate){
            return true
        }else{
            return false
        }
    } )
    return newArr
}

const result = allowVisa(peopleWithVisa);
console.log('result', result);