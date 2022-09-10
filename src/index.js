import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  body: document.querySelector('body'),
  inputField: document.querySelector('input'),
  coutryList: document.querySelector('.country-list'),
  coutryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(onEnterCountryName, DEBOUNCE_DELAY)
);

function onEnterCountryName(event) {
  let countryName = event.target.value;

  refs.coutryList.classList.remove('is-hidden')
  refs.coutryInfo.classList.remove('is-hidden')
  refs.coutryList.innerHTML = "";
  refs.coutryInfo.innerHTML = "";

  if (event.target.value === '') {
 return
  }

  fetchCountries(countryName.trim()).then(countryName => render(countryName))
  .catch(onError)

function onError(error) {
  Notify.failure('"Oops, there is no country with that name"');
}

function render(countryName) {
  if (countryName.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
 } else {
listOrInfo (countryName)
}}

function listOrInfo (countryName) {
  if (countryName.length === 1) {
    renderCountryInfo(countryName);
  } else {
  renderCountryList(countryName);
}}

function renderCountryList(countryName) {
  for (let i = 0; i < countryName.length; i += 1) {
    const marcupList = `<li>
        <img src = ${countryName[i].flags.svg} alt = "${countryName[i].name.common}" width="35"></img>
                <span class="nameCountryList">${countryName[i].name.common}</span>
      </li>`;
    refs.coutryList.insertAdjacentHTML('beforeend', marcupList);
  }
}

function renderCountryInfo(countryName) {
    const marcupInfo = `<div>
        <img src = ${countryName[0].flags.svg} alt = "${countryName[0].name.common}" width="35"></img>
        <span class="nameCountryInfo">${countryName[0].name.common}</span>
        <p>Capital: ${countryName[0].capital}</p>
        <p>Population: ${countryName[0].population}</p>
        <p>Language: ${Object.values(countryName[0].languages)}</p>
      </div>`;
    refs.coutryInfo.insertAdjacentHTML('beforeend', marcupInfo);
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
)