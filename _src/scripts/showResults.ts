type ResultData = {
  url: string,
  hostless: string,
  matches: string,
  count: number,
  snippet: string
}

function ShowResults(results: ResultData[]) {
  const holder = document.querySelector("[data-results-table]");
  const button = document.querySelector('[type="submit"]');
  const resultsCount = document.querySelector('[data-results-count]');

  function renderMobileTable() {
    let output = "";

    results.forEach((result) => {
      if (result.count > 0) {
        output += `
          <tr>
            <th class="px-4 py-2 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">Matches</th>
            <td class="px-4 py-2">${result.count}</td>
          </tr>
          <tr class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <th class="px-4 py-2 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">URL</th>
            <td class="px-4 py-2">
              <a href="${result.url}" target="_blank" class="text-blue-600 dark:text-blue-500">${result.hostless}</a>
            </td>
          </tr>
        `;
      }
    });


    if (holder) {
      holder.innerHTML = `
        <div class="relative overflow-x-auto rounded border border-gray-200 max-w-5xl mx-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">            
            <tbody>
              ${output}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  function renderDesktopTable() {
    let output = "";

    results.forEach((result: ResultData) => {
      if (result.count > 0) {
        output += `
          <tr class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">${result.count}</td>
            <td class="px-6 py-4">
              <a href="${result.url}" target="_blank" class="text-blue-600 dark:text-blue-500">${result.hostless}</a>
            </td>
            <td class="px-6 py-4">
              <code>
                ${result.snippet.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}}
              </code>
            </td>
          </tr>
        `;
      }
    });

    if (holder) {
      holder.innerHTML = `
        <div class="relative overflow-x-auto rounded border border-gray-200 max-w-5xl mx-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th class="px-6 py-3">Matches</th>
                <th class="px-6 py-3">URL</th>
                <th class="px-6 py-3">Snippet</th>
              </tr>
            </thead>
            
            <tbody>
              ${output}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  function renderZeroResults() {
    if (holder) {
      holder.innerHTML = `<h2>No results found</h2>`
    }
  }

  function init() {
    const hasNoResults = results.every(result => result.count === 0);

    if (button && resultsCount) {
      button.classList.remove("pointer-events-none", "opacity-50");
      resultsCount.textContent = `${results.length} results found`;
    }

    if (hasNoResults) return renderZeroResults();

    if (window.innerWidth >= 500) return renderDesktopTable();

    return renderMobileTable();
  }

  return {
    init
  }
}

export default ShowResults;