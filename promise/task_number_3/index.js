
const checkHidden = () => {
    const loader = document.getElementById('loader');
    loader.hidden = !loader.hidden;
}

const createElement = (src, title) =>{
    const photoItem = document.createElement('li');
    photoItem.className = 'photo-item';

    const photoItemImage = document.createElement('img');
    photoItemImage.className = 'photo-item__image';
    photoItemImage.src = src;

    const photoItemTitle = document.createElement('h3');
    photoItemImage.className = 'photo-item__title';
    photoItemTitle.innerText = title;

    photoItem.append(photoItemImage, photoItemTitle);

    return photoItem;
}




const getFastestLoadedPhoto = (ids) =>{
  checkHidden();
  const request = ids.map(id => fetch(`https://jsonplaceholder.typicode.com/photos/${id}`));
  Promise.race(request)
      .then(req => req.json())
      .then(data =>{
          const body = document.querySelector('body');
          body.append(createElement(data.url, data.title));
          checkHidden();
          })
      .catch(err => console.log(`Ошибка ${err}`))
}

getFastestLoadedPhoto([60, 12, 55])