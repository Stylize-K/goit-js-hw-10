import { fetchCatByBreed } from './cat-api';
import { renderBreedDesc } from './renderBreedDesc';
import { fetchAndRenderBreeds } from './fetchAndRenderBreeds';

import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const divPictEl = document.querySelector('.cat-info-pict');
const divDescEl = document.querySelector('.cat-info-desc');
const loaderEl = document.querySelector('.loader');

breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

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

export { breedSelect, divPictEl, divDescEl, loaderEl };
