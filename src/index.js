import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import './src/fetchCountries.js';
const DEBOUNCE_DELAY = 300;

const refs = {
  body: document.querySelector('body'),
  // body2: document.querySelector('div'),
  inputField: document.querySelector('input'),
  coutryList: document.querySelector('.country-list'),
  coutryInfo: document.querySelector('.country-info'),
};

// console.log(refs.body);
// console.log(refs.body2);

refs.inputField.addEventListener(
  'input',
  debounce(onEnterCountryName, DEBOUNCE_DELAY)
);

function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => response.json());
}

function onEnterCountryName(event) {
  const countryName = event.target.value.trim();

  fetchCountries(countryName).then(render).catch(onError)

  refs.coutryList.classList.remove('is-hidden')
  refs.coutryInfo.classList.remove('is-hidden')
  

  // (countryName => countryName.reset());
  // countryName.reset();
}

function render(countryName) {
  if (countryName.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.coutryList.classList.add('is-hidden');
    refs.coutryInfo.classList.add('is-hidden');
  } else if (countryName.length === 1) {
    refs.coutryList.classList.add('is-hidden');
    renderCountryInfo(countryName);
  } else if (countryName.length < 10) {
    renderCountryList(countryName);
    refs.coutryInfo.classList.add('is-hidden');
  } else if (countryName.length = 0) {
    refs.coutryList.classList.add('is-hidden');
    refs.coutryInfo.classList.add('is-hidden');
  }
}

function renderCountryList(countryName) {
  for (let i = 0; i < countryName.length; i += 1) {
    const flag1 = countryName[i].flags.svg;
    const name1 = countryName[i].name.common;
    const marcupList = `<li>
        <img src = ${flag1} alt = "" width="35"></img>
                <span class="nameCountryList">${name1}</span>
      </li>`;
    refs.coutryInfo.insertAdjacentHTML('beforeend', '');
    refs.coutryList.insertAdjacentHTML('beforeend', marcupList);
  }
}

function renderCountryInfo(countryName) {
  for (let i = 0; i < countryName.length; i += 1) {
    const flag2 = countryName[0].flags.svg;
    const name = countryName[0].name.common;
    const capital = countryName[0].capital;
    const population = countryName[0].population;
    const language = Object.values(countryName[0].languages);
    const marcupInfo = `<div>
        <img  src = ${flag2} alt = "" width="35"></img>
        <span class="nameCountryInfo">${name}</span>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Language: ${language}</p>
      </div>`;
    refs.coutryList.insertAdjacentHTML('beforeend', '');
    refs.coutryInfo.insertAdjacentHTML('beforeend', marcupInfo);
  }
}

function onError(error) {
  console.log('ERRRRRRRRRRRRRRR', error);
  Notify.failure('"Oops, there is no country with that name"');
}

refs.body.insertAdjacentHTML(
  'beforebegin',
  `<style>
    .is-hidden {
    position: absolute;
    visibility: hidden;
    width: 1px;
    height: 1px;
    margin-bottom: -1px;
    padding-bottom: 0;
    } 
    .country-list {
      list-style: none;
    }
    .nameCountryList {
margin-left: 10px;
font-size: 24px;
    }
    .nameCountryInfo {
      font-size: 48px;
      font-weight: bold;
      margin-left: 10px;
    }
    </style>`
);
