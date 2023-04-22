const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';


const createElement = (text) => {
    const elementLi = document.createElement('li');
    elementLi.innerText = text;
    return elementLi;
}

const checkHidden = () => {
    const loader = document.getElementById('loader');
    loader.hidden = !loader.hidden;
}

const renderAlbums = async () => {
    checkHidden();
    try {

        const requests = await fetch(ALBUMS_URL);
        const dataList = await requests.json();
        const elementOl = document.querySelector('ol');
        dataList.forEach(data => {
                   elementOl.append(createElement(data.title));
        });
        checkHidden();

    }catch (e) {
        document.querySelector('.data-container').textContent = e;
    }
}

renderAlbums()