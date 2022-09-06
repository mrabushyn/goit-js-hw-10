import './css/styles.css';
// import './src/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

// console.log(32132123)

fetchCountries('ukraine')
  .then(console.log(result))
  .catch(error)
  .finally(console.log(result)); 


function fetchCountries (name) {
    const url = `https://restcountries.com/v3.1/name/{name}`;
    
    return fetch(url).then(r => r.json());
}
