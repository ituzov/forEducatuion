const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const getTodosByIds = async (ids) => {
    try{
        const requests = ids.map(async id => await fetch(`${TODOS_URL}/${id}`));
        const responses = await Promise.all(requests);
        return await Promise.all(responses.map(data => data.json()))
    }catch (e) {
        console.log(e)
    }
}

getTodosByIds([43, 21, 55, 100, 10]).then(data => console.log(data));