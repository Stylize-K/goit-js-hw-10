import { breedSelect } from './index';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

//Функція, що генерує розмітку випадаючого списку
const renderBreedsSelect = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  //Ініціалізація бібліотеки 'slim-select' на сгенерований select
  new SlimSelect({
    select: '#single',
  });
};

export { renderBreedsSelect };
