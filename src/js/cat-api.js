//Унікальний ключ доступу до Cat API
const KEY =
  'live_HEs7npt4enTv8IppoFAzotzjElNW9aw61wQB5T2Fw18DPSakhIju9elgFzOgYqmc';

//Функція, що фетчить список усіх порід котів
const fetchBreeds = () => {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};

//Функція, що фетчить опис конкретної породи кота по breedId
const fetchCatByBreed = breedId => {
  return fetch(
    `https://api.thecatapi.com/v1/images/${breedId}?api_key=${KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

//Іменований експорт функцій
export { fetchBreeds, fetchCatByBreed };
