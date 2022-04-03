import updateResultsCount from "./updateResultsCount";

function ValidateInput(domain: HTMLInputElement, query: HTMLTextAreaElement) {
  const resultsTable = document.querySelector("[data-results-table]");
  const resultsCount = document.querySelector("[data-results-count]");
  const button = document.querySelector('[type="submit"]');
  const endpoint = "https://search-the-source-code.herokuapp.com/";
  const urlRegex =
    /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const errorClasses = ["bg-pink-700/[0.15]", "border-pink-700/[0.2]"];
  const successClasses = ["bg-lime-700/[0.15]", "border-lime-700/[0.2]"];
  const defaultClasses = ["bg-zinc-900/[0.15]", "border-zinc-900/[0.075]"];
  let inputValidationErrorFound = false;

  function setInvalidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    const inputId = input.id;

    input.setAttribute("aria-describedby", `${inputId}Describe`);
    input.classList.add(...errorClasses);
    input.classList.remove(...defaultClasses);
    input.classList.remove(...successClasses);
    input.nextElementSibling?.classList.remove("invisible");
  }

  function setValidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    input.removeAttribute("aria-describedby");
    input.classList.remove(...errorClasses);
    input.classList.remove(...defaultClasses);
    input.classList.add(...successClasses);
    input.nextElementSibling?.classList.add("invisible");
  }

  function validateInput(input: HTMLInputElement | HTMLTextAreaElement) {
    const isUrl = input.getAttribute("type") === "url";
    const isValidUrl = urlRegex.test(input.value);
    const isValidInput = isUrl ? isValidUrl : input.value.length > 0;

    if (!isValidInput && !inputValidationErrorFound) {
      inputValidationErrorFound = true;
      input.focus();
    }

    if (!isValidInput) setInvalidInputState(input);

    if (isValidInput) {
      inputValidationErrorFound = false;
      setValidInputState(input);
    }

    return inputValidationErrorFound;
  }

  function init() {
    const url = `${endpoint}?domain=${domain.value}&search=${encodeURIComponent(query.value)}`;

    validateInput(domain);
    validateInput(query);

    if (!inputValidationErrorFound) {
      if (button && resultsCount) {
        button.classList.add("pointer-events-none", "opacity-50");
        updateResultsCount(-1);
        if (resultsTable) resultsTable.textContent = "";
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          import("./showResults").then((module) => module.default(data).init());
        });
    }
  }

  return {
    init,
  };
}

export default ValidateInput;
