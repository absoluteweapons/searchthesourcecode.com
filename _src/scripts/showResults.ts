import updateResultsCount from "./updateResultsCount";

export type ResultData = {
  url: string,
  hostless: string,
  matches: string,
  count: number,
  snippet: string
}

function ShowResults(results: ResultData[]) {
  function init() {
    const resultsActual = results.filter(result => result.count > 0);
    const resultsCount = resultsActual.length;

    if (resultsCount === 0) return updateResultsCount(0);

    import("./renderResultsTable").then((module) => module.default(resultsActual).init());

    return updateResultsCount(resultsCount);
  }

  return {
    init
  }
}

export default ShowResults;
