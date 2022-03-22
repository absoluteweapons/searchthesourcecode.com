'use strict';

// global variabiles
const form = document.querySelector('[name="search"]');
const domain = form.querySelector('[name="domain"]');
const query = form.querySelector('[name="query"]');
const endpoint = 'https://search-the-source-code.herokuapp.com/';

form.onsubmit = function () {
  // fetch results
  const url = `${endpoint}?domain=${domain.value}&search=${query.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showResults(data));

  return false;
};

const showResults = results => {
  
}
