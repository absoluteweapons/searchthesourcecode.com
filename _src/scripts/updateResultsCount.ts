function updateResultsCount(results: number) {
  const resultsCount = document.querySelector('[data-results-count]') as HTMLElement;
  resultsCount?.setAttribute("role", "alert");
  
  if (results === -1) {
    /* SEARCHING: BLUE */
    resultsCount.setAttribute("class", "block max-w-2xl mx-auto p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800");
    resultsCount.textContent = `Searching...`;
    
    return;
  }

  if (results === 0) {
    /* NO RESULTS: YELLOW */
    resultsCount.setAttribute("class", "block max-w-2xl mx-auto p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800");
    resultsCount.textContent = `No results found`;
    
    return;
  }

  /* RESULTS: GREEN */
  resultsCount.setAttribute("class", "block max-w-2xl mx-auto p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800");
  resultsCount.textContent = `${results} results found`;
}

export default updateResultsCount;