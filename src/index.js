import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const divPictEl = document.querySelector('.cat-info-pict');
const divDescEl = document.querySelector('.cat-info-desc');
const loaderEl = document.querySelector('.loader');

const KEY =
  'live_HEs7npt4enTv8IppoFAzotzjElNW9aw61wQB5T2Fw18DPSakhIju9elgFzOgYqmc';

breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

//Функція, фетчить дані та на їх основі створює розмітку випадаючого списку
function fetchAndRenderBreeds() {
  loaderEl.classList.remove('unvisible');
  fetchBreeds()
    // .then(cats => console.log(cats))
    .then(cats => renderBreedsSelect(cats))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderEl.classList.add('unvisible');
      breedSelect.classList.remove('unvisible');
    });
}

//Функція, яка виконується при виборі породи кота у списку.
function onChangeSelect(event) {
  loaderEl.classList.remove('unvisible');
  divPictEl.innerHTML = '';
  divDescEl.innerHTML = '';
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    // .then(breed => console.log(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderEl.classList.add('unvisible'));
}

//Функція, що фетчить список усіх порід котів
function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

//Функція, що фетчить опис конкретної породи кота
function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/${breedId}?api_key=${KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

//Функція, що генерує розмітку випадаючого списку
function renderBreedsSelect(cats) {
  const markup = cats
    .map(cat => {
      return `<option value="${cat.reference_image_id}">${cat.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
}

//Функція, що генерує розмітку опису обраної породи кота (картинка та текст)
function renderBreedDesc(breed) {
  const markupPicture = `<img class="cat-picture" width=400 src="${breed.url}" alt="${breed.id}">`;
  const markupDescript = `<h1 class="cat-info-desc-title">${breed.breeds[0].name}</h2><p class="cat-info-desc-desc
  ">${breed.breeds[0].description}</p><p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  divPictEl.insertAdjacentHTML('beforeend', markupPicture);
  divDescEl.insertAdjacentHTML('beforeend', markupDescript);
}
