function updateResultsCount(results: number, status?: number) {
  const check = `
    <svg class="fill-green-900 inline" width="18" height="18" aria-hidden="true" pointer-events="none">
      <use xlink:href="/icons/sprite.svg#check"></use>
    </svg>
  `;

  const stop = `
    <svg class="fill-red-800 inline" width="18" height="18" aria-hidden="true" pointer-events="none">
      <use xlink:href="/icons/sprite.svg#stop"></use>
    </svg>
  `;

  const spinner = `
    <svg class="mr-1 text-blue-200 animate-spin fill-blue-900" width="18" height="18" aria-hidden="true" pointer-events="none">
      <use xlink:href="/icons/sprite.svg#spinner"></use>
    </svg>
  `

  const resultsCount = document.querySelector('[data-results-count]') as HTMLElement;
  resultsCount?.setAttribute("role", "alert");

  if (results === -3) {
    /* NO RESULTS: RED */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 mb-4 text-base rounded mt-2 box-border  border bg-red-300/[0.8] border-red-700/[0.8] text-red-900");

    resultsCount.innerHTML = `
      <p>Oops, we received the following error from that domain: <strong class="font-bold">${status}</strong></p>

      <span>${stop}</span>
    `;

    return;
  }

  if (results === -2) {
    /* NO RESULTS: RED */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 text-base rounded mt-2 box-border  border bg-red-300/[0.8] border-red-700/[0.8] text-red-900");

    resultsCount.innerHTML = `
      <p>Oops, there was an unknown error</p>

      <span>${stop}</span>
    `;

    return;
  }

  if (results === -1) {
    /* SEARCHING: BLUE */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 text-base rounded mt-2 box-border  border bg-sky-300/[0.8] border-sky-700/[0.8] text-blue-900");
    resultsCount.innerHTML = `
      <p>Searching...</p>

      ${spinner}
    `;

    return;
  }

  if (results === 0) {
    /* NO RESULTS: RED */
    resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 text-base rounded mt-2 box-border  border bg-red-300/[0.8] border-red-700/[0.8] text-red-900");
    resultsCount.innerHTML = `
      <p>No results found</p>

      ${stop}
    `;

    return;
  }

  /* RESULTS: GREEN */
  resultsCount.setAttribute("class", "flex justify-between items-center max-w-2xl mx-auto p-4 text-base rounded mt-2 box-border  border bg-green-300/[0.8] border-green-700/[0.8] text-green-900");
  resultsCount.innerHTML = `
      <p>${results} results found</p>

      ${check}
    `;
}

export default updateResultsCount;
