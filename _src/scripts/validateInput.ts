import updateResultsCount from "./updateResultsCount";

function ValidateInput(domain: HTMLInputElement, query: HTMLTextAreaElement) {
  const resultsTable = document.querySelector("[data-results-table]");
  const resultsCount = document.querySelector("[data-results-count]");
  const button = document.querySelector('[type="submit"]');
  const endpoint = "https://search-the-source-code.herokuapp.com/";
  const urlRegex =
    /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  let inputValidationErrorFound = false;
  const errorClasses = ["text-red-800"];
  const validClasses = ["text-green-900"];
  const check = `<svg class="fill-green-900 inline" width="18" height="18" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M672.4 113.4a48.5 48.5 0 0 0-69 0L242 475.4 90 323a49.6 49.6 0 0 0-68.9 71.3l186.4 186.3a48.5 48.5 0 0 0 68.9 0l396-396a48.5 48.5 0 0 0 0-71.2Z"/></svg>`;
  const cross = `<svg class="fill-red-800 inline" width="16" height="16" viewBox="0 0 693 693" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M185 114.4a50 50 0 1 0-70.6 70.7l162.2 162.2-162.2 162.3a50 50 0 0 0 70.7 70.7l162.2-162.2 162.3 162.2a50 50 0 0 0 70.7-70.7L418.1 347.3l162.2-162.2a50 50 0 0 0-70.7-70.7L347.3 276.6 185.1 114.4Z"/></svg>`;

  function setInvalidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    const inputId = input.id;
    const vIcon = input.nextElementSibling?.querySelector("[data-validation-icon") || false;
    const vMessage = input.nextElementSibling?.querySelector("[data-validation-message") || false;

    // error state
    input.nextElementSibling?.classList.remove(...validClasses);
    input.nextElementSibling?.classList.add(...errorClasses);

    // error message
    if (vIcon) vIcon.innerHTML = cross;
    if (vMessage) vMessage.innerHTML = `${inputId === "domain" ? "Domain" : "Code"} doesn't quite look right.`
    
    input.nextElementSibling?.classList.remove("invisible");
    input.nextElementSibling?.classList.add("inline-block");

    input.setAttribute("aria-describedby", `${inputId}Describe`);
  }

  function setValidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    const inputId = input.id;
    const vIcon = input.nextElementSibling?.querySelector("[data-validation-icon");
    const vMessage = input.nextElementSibling?.querySelector("[data-validation-message");
    
    // valid state
    input.nextElementSibling?.classList.remove(...errorClasses);
    input.nextElementSibling?.classList.add(...validClasses);

    // validation message
    if (vIcon) vIcon.innerHTML = check;
    if (vMessage) vMessage.innerHTML = `${inputId === "domain" ? "Domain" : "Code"} looks good.`
    input.nextElementSibling?.classList.remove("invisible");

    input.removeAttribute("aria-describedby");
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
