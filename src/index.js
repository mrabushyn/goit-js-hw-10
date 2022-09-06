import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import './src/fetchCountries.js';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('input'),
  coutryList: document.querySelector('.country-list'),
  coutryInfo: document.querySelector('.country-info'),
};
refs.inputField.addEventListener('input', debounce(onEnterCountryName, DEBOUNCE_DELAY));

function onEnterCountryName(event) {
  const countryName = event.target.value;

fetchCountries(countryName)
  .then(renderCountryList)
  .catch(onError)
//   .finally(console.log(countryName));
}

function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(url).then(r => r.json());
}

function onError(error) {
  console.log('EERRRROORR');
}

function renderCountryList(countryName) {
    console.log(countryName);

  const marcupList =

    `${countryName.name.official}` +
    '     ' +
    `${countryName.capital}` +
    '     ' +
    `${countryName.population}` +
    '     ' +
    `${countryName.flags.svg}` +
    '     ' +
    `${countryName.languages}`;


//   const marcupInfo =

//     `${countryName[0].name.official}` +
//     '     ' +
//     `${countryName[0].capital}` +
//     '     ' +
//     `${countryName[0].population}` +
//     '     ' +
//     `${countryName[0].flags.svg}` +
//     '     ' +
//     `${countryName[0].languages}`;


  refs.coutryList.innerHTML = marcupList;
//   refs.coutryInfo.innerHTML = marcupInfo;

}
