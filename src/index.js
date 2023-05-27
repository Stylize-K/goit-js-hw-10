import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const divPictEl = document.querySelector('.cat-info-pict');
const divDescEl = document.querySelector('.cat-info-desc');
const loaderEl = document.querySelector('.loader');

breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

//Функція, що фетчить дані та на їх основі створює розмітку випадаючого списку (працює відразу після завантаження сторінки)
function fetchAndRenderBreeds() {
  loaderEl.classList.remove('unvisible');
  fetchBreeds()
    // .then(breeds => console.log(breeds))
    .then(breeds => renderBreedsSelect(breeds))
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

//Функція, яка виконується при виборі породи кота у списку (подія change на селекті)
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

//Функція, що генерує розмітку випадаючого списку
function renderBreedsSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
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
