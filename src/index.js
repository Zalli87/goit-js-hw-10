import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
let countryName = '';

const inputEl = document.querySelector('input#search-box');
const coutryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  countryName = e.target.value.trim();
  if (e.target.value === '') {
    resetPage();
    Notiflix.Notify.failure('Add some coyntry name');
    return;
  }
  fetchCountries(countryName).then(createMarkup).catch(onError);
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createCountryCard(countrys) {
  return countrys
    .map(({ flags, name, capital, population, languages }) => {
      return `<img src='${flags.svg}' width="50" height="50">
        <h2>${name.official}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
}

function createMarkup(countrys) {
  if (countrys.length === 1) {
    resetPage();
    const countryEl = createCountryCard(countrys);
    countryCard.insertAdjacentHTML('afterbegin', countryEl);
  } else if (countrys.length > 1 && countrys.length <= 10) {
    resetPage();
    const countryListEl = createCountrysList(countrys);
    coutryList.insertAdjacentHTML('afterbegin', countryListEl);
  } else if (countrys.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function createCountrysList(countrys) {
  return countrys
    .map(({ flags, name }) => {
      return `<li><img src='${flags.svg}' width="50" height="50">
        <h2>${name.official}</h2>
      </li>`;
    })
    .join('');
}

function resetPage() {
  coutryList.innerHTML = '';
  countryCard.innerHTML = '';
}
