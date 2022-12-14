export function fetchCountries(name) {
    const urlAPI = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(urlAPI)
        .then(response =>  {
            if(!response.ok){
                throw new Error(response.status);
            }
            return response.json();
            })
    }