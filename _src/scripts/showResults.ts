import updateResultsCount from "./updateResultsCount";

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

  function renderMobileTable() {
    let output = "";

    results.forEach((result) => {
      if (result.count > 0) {
        output += `
        <div class="relative overflow-x-auto rounded border border-gray-200 max-w-5xl mx-auto mb-4">
          <table class="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr class="bg-white border-b border-gray-200">
                <th class="p-2 text-xs text-gray-700 uppercase bg-gray-100">Matches</th>
                <td class="p-2">${result.count}</td>
              </tr>
              <tr class="bg-white border-b border-gray-200">
                <th class="p-2 text-xs text-gray-700 uppercase bg-gray-100">URL</th>
                <td class="p-2">
                  <a href="${result.url}" target="_blank" class="text-blue-600">${result.hostless}</a>
                </td>
              </tr>
              <tr class="bg-white border-b border-gray-200">
                <th class="p-2 text-xs text-gray-700 uppercase bg-gray-100">Snippet</th>
                <td class="p-2">
                  <code class="block whitespace-normal break-all">
                    ${result.snippet.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}}
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        `;
      }
    });


    if (holder) {
      holder.innerHTML = output;
    }
  }

  function renderDesktopTable() {
    let output = "";

    results.forEach((result: ResultData) => {
      if (result.count > 0) {
        output += `
          <tr class="bg-white border-b border-gray-200">
            <td class="p-4">${result.count}</td>
            <td class="p-4">
              <a href="${result.url}" target="_blank" class="text-blue-600">${result.hostless}</a>
            </td>
            <td class="p-4">
              <code class="block whitespace-normal break-all">
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
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th class="p-4">Matches</th>
                <th class="p-4">URL</th>
                <th class="p-4">Snippet</th>
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

  function init() {
    const hasNoResults = results.every(result => result.count === 0);

    if (button) {
      const resultsLength = results.filter(result => result.count > 0).length;
      button.classList.remove("pointer-events-none", "opacity-50");
      updateResultsCount(resultsLength);
    }

    if (hasNoResults) return updateResultsCount(0);

    if (window.innerWidth >= 500) return renderDesktopTable();

    return renderMobileTable();
  }

  return {
    init
  }
}

export default ShowResults;
