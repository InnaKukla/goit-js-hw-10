import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from "./fetchCountries";
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


// Notiflix.Notify.info('Cogito ergo sum');

    const searchCountries = document.querySelector('#search-box');
    const listCountries = document.querySelector('.country-list');
    const countryInfo = document.querySelector('.country-info');

console.log(searchCountries)
console.log(listCountries)
console.log(countryInfo)

searchCountries.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
   const input = searchCountries.value.trim()
   
   if (input === ''){
    return
   }
   console.log(input)


   fetchCountries(input)
   .then(data => {
       if(data.length === 1){
        createOneCountrie(data)         
        }
        if (data.length >= 2 && data.length <= 10){
            createListCountries(data)
        }
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
    })
    .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    })
}
//    

function createListCountries(data) {
    const countriesList = data.map(({name, flags}) => {
         `<li class="country">
         <img src="${flags.svg}" alt="Flag of ${name.official}" />
         <h1>${name.official}</h1></li>`}).join('');

         listCountries.insertAdjacentHTML('beforeend', countriesList)
        //  listCountries.innerHTML(countriesList)
    } 
    
//     function createListCountries(data) {
//         const countriesList = createListCountriesHTML(data)
//         listCountries.insertAdjacentHTML('beforeend', countriesList)
//         }
    

function createOneCountrie(data) {
    const oneCountrie = data.map(({name, flags, capital, population, languages}) => {
         `<li class="country"><img src="${flags.svg}" alt="Flag of ${name.official}" />
         <h1>${name.official}</h1>
         <p>Capital: ${capital}</p>
         <p>Population: ${population}</p>
         <p>Languages: ${Object.values(languages)}</p></li>`}).join('');

         countryInfo.insertAdjacentHTML('beforeend', oneCountrie)
    };

    // function createOneCountrie(data) {
    //     const oneCountrie = createOneCountrieHTML(data)
    //     countryInfo.insertAdjacentHTML('beforeend', oneCountrie)
    // };