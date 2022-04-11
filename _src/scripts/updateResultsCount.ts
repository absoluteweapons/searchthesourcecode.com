function updateResultsCount(results: number) {
  const check = `<svg class="fill-green-900 inline" width="18" height="18" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M672.4 113.4a48.5 48.5 0 0 0-69 0L242 475.4 90 323a49.6 49.6 0 0 0-68.9 71.3l186.4 186.3a48.5 48.5 0 0 0 68.9 0l396-396a48.5 48.5 0 0 0 0-71.2Z"/></svg>`;
  const cross = `<svg class="fill-red-800 inline" width="16" height="16" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M185 114.4a50 50 0 1 0-70.6 70.7l162.2 162.2-162.2 162.3a50 50 0 0 0 70.7 70.7l162.2-162.2 162.3 162.2a50 50 0 0 0 70.7-70.7L418.1 347.3l162.2-162.2a50 50 0 0 0-70.7-70.7L347.3 276.6 185.1 114.4Z"/></svg>`;
  const resultsCount = document.querySelector('[data-results-count]') as HTMLElement;
  resultsCount?.setAttribute("role", "alert");

  if (results === -2) {
    /* NO RESULTS: RED */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 mb-4 text-base rounded mt-2 box-border  border bg-red-300/[0.8] border-red-700/[0.8] text-red-900");
    
    // TODO replace cross with something that doesn't look like close button
    resultsCount.innerHTML = `
      Oops, there was an error. Please check you entered a valid domain.

      <span>${cross}</span>
    `;

    return;
  }
  
  if (results === -1) {
    /* SEARCHING: BLUE */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 mb-4 text-base rounded mt-2 box-border  border bg-sky-300/[0.8] border-sky-700/[0.8] text-blue-900");
    resultsCount.innerHTML = `
      Searching...

      <svg class="text-blue-200 animate-spin fill-blue-900" viewBox="0 0 100 101" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" pointer-events="none" aria-hidden="true">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    `;
    
    return;
  }

  if (results === 0) {
    /* NO RESULTS: RED */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 mb-4 text-base rounded mt-2 box-border  border bg-red-300/[0.8] border-red-700/[0.8] text-red-900");
    resultsCount.innerHTML = `
      No results found

      <span>${cross}</span>
    `;
    
    return;
  }

  /* RESULTS: GREEN */
  resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 mb-4 text-base rounded mt-2 box-border  border bg-green-300/[0.8] border-green-700/[0.8] text-green-900");
  resultsCount.innerHTML = `
      ${results} results found

      <span>${check}</span>
    `;
}

export default updateResultsCount;