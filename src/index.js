import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let countryName = 'ukraine';

const input = document.querySelector('input#search-box');
const coutryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
  countryName = e.target.value.trim();
  fetchCountries(countryName).then(createMarkup);
}

function createMarkup(countrys) {
  if (countrys.length === 1) {
    const countryEl = createCoutryCard(countrys);
    countryCard.insertAdjacentHTML('afterbegin', countryEl);
    console.log('одна країна');
  } else if (countrys.length > 1 && countrys.length < 10) {
    const countryListEl = createCoutrysList(countrys);
    coutryList.insertAdjacentHTML('afterbegin', countryListEl);
    console.log('список країн');
  } else {
    alert('забагато країн');
  }
}

function createCoutryCard(countrys) {
  return countrys
    .map(country => {
      return `<img src='${country.flags.svg}' width="50" height="50">
        <h2>${country.name.official}</h2>
        <p>${country.capital}</p>
        <p>${country.population}</p>
        <p> ${country.languages}</p>`;
    })
    .join('');
}

function createCoutrysList(countrys) {
  return countrys
    .map(country => {
      console.log(country.name.official);
      return `<li><img src='${country.flags.svg}' width="50" height="50">
        <h2>${country.name.official}</h2>
      </li>`;
    })
    .join('');
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

// const coutryListEl = createCoutrysList(coutrys);
// coutryList.insertAdjacentHTML('afterbegin', coutryListEl);
