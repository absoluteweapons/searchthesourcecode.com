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
  const holder = document.querySelector("[data-results]");
  let output = "";
  results.forEach(result => {
    if (url.count > 0) output += `<span>${result.count}</span><span>${result.matches}</span><span>${result.url}}</span>`;
  });
  holder.innerHTML = output;
}
