import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from "./fetchCountries";
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const searchCountries = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchCountries.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    listCountries.innerHTML = '';
    countryInfo.innerHTML = '';

   const input = searchCountries.value.trim()
   
   if (input === ''){
    return
   }
   console.log(input)


   fetchCountries(input)
   .then(data => {
        if(data.length === 1){
            createOneCountry(data);   
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
  

function createListCountries(data) {
    const countriesList = data.map(({name, flags}) => {
        return `<li class="country">
         <img src="${flags.svg}" alt="Flag of ${name.official}" width=40px height=30px/>
         <h1 class="title-coutries">${name.official}</h1></li>`}).join('');

         
         listCountries.insertAdjacentHTML('beforeend', countriesList);
    } 


function createOneCountry(data) {
    const oneCountry = data.map(({name, flags, capital, population, languages}) => {
         return `<div class="country-discription"><li class="country"><img src="${flags.svg}" alt="Flag of ${name.official}" width="50px" height="40px"/>
         <h1 class="titel-one-country">${name.official}</h1></div>
         <p><span>Capital: </span>${capital}</p>
         <p><span>Population: </span>${population}</p>
         <p><span>Languages: </span>${Object.values(languages)}</p></li>`}).join('');

     
         countryInfo.insertAdjacentHTML('beforeend', oneCountry);
     
    };

   