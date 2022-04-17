import type { ResultData } from './showResults';
import Prism from 'prismjs'

function RenderResultsTable(results: ResultData[]) {
  const head = document.head;
  const resultsContainer = document.querySelector('[data-results-table]');

  function renderTable(result: ResultData) {
    const { count, hostless, snippet, url } = result;
    const codeSnippet: any = Prism.highlight(snippet, Prism.languages.html, 'html');
    const isSingleResult = results.length === 1;
    const colSpans = isSingleResult ? 'lg:col-span-full' : 'lg:col-span-1';

    return `
      <li class="relative overflow-x-auto rounded border border-gray-200 max-w-5xl mx-auto mb-2 last:mb-0 lg:mb-0 ${colSpans}">
        <table class="w-full text-sm text-left text-gray-500">
          <tbody>
            <tr class="bg-white border-b border-gray-200">
              <th class="p-4 text-base text-gray-700 bg-gray-100">Matches</th>
              <td class="p-4 text-base">${count}</td>
            </tr>

            <tr class="bg-white border-b border-gray-200">
              <th class="p-4 text-base text-gray-700 bg-gray-100">URL</th>
              <td class="p-4 text-base">
                <a href="${url}" target="_blank" class="text-blue-600 underline">${hostless}</a>
              </td>
            </tr>

            <tr class="bg-white border-b border-gray-200">
              <th class="p-4 text-base text-gray-700 bg-gray-100">Snippet</th>
              <td class="p-4 text-base">
                <code class="block max-w-xl whitespace-normal break-all language-html">
                  ${codeSnippet}
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    `
  }

  function init() {
    const prismStyleSheet = `<link data-prism rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-dark.min.css">`

    if (!head.querySelector('[data-prism]')) {
      head.insertAdjacentHTML('beforeend', prismStyleSheet);
    }

    if (resultsContainer) {
      resultsContainer.setAttribute('aria-label', 'Search the source code results');
      resultsContainer.innerHTML = `
        <ul class="lg:grid lg:grid-cols-2 lg:gap-8">${results.map(renderTable).join('')}</ul>
      `;
    }
  }

  return {
    init
  }
}

export default RenderResultsTable;
