import updateResultsCount from "./updateResultsCount";

function ValidateInput(domain: HTMLInputElement, query: HTMLTextAreaElement) {
  let inputValidationErrorFound = false;
  let endpoint = "https://search-the-source-code-dev.herokuapp.com/";

  const env = process.env.NODE_ENV;
  const resultsTable = document.querySelector("[data-results-table]");
  const resultsCount = document.querySelector("[data-results-count]");
  const button = document.querySelector('[type="submit"]');
  const urlRegex = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const errorClasses = ["text-red-800"];
  const validClasses = ["text-green-900"];

  const check = `
    <svg class="fill-green-900 inline" width="18" height="18" aria-hidden="true" pointer-events="none">
      <use xlink:href="/icons/sprite.svg#check"></use>
    </svg>
  `;

  const cross = `
    <svg class="fill-red-800 inline" width="18" height="18" aria-hidden="true" pointer-events="none">
      <use xlink:href="/icons/sprite.svg#cross"></use>
    </svg>
  `;

  if (env === "production") endpoint = "https://search-the-source-code.herokuapp.com/";
  if (env === "local") endpoint = "http://localhost:8888/";

  function setInvalidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    const inputId = input.id;
    const vIcon = input.nextElementSibling?.querySelector("[data-validation-icon]") || false;
    const vMessage = input.nextElementSibling?.querySelector("[data-validation-message]") || false;

    // error state
    input.nextElementSibling?.classList.remove(...validClasses);
    input.nextElementSibling?.classList.add(...errorClasses);

    // error message
    if (vIcon) vIcon.innerHTML = cross;
    if (vMessage) vMessage.innerHTML = `${inputId === "domain" ? "Domain" : "Code"} doesn't quite look right.`

    input.nextElementSibling?.classList.remove("invisible");

    input.setAttribute("aria-describedby", `${inputId}Describe`);
  }

  function setValidInputState(input: HTMLInputElement | HTMLTextAreaElement) {
    const inputId = input.id;
    const vIcon = input.nextElementSibling?.querySelector("[data-validation-icon]") || false;
    const vMessage = input.nextElementSibling?.querySelector("[data-validation-message]") || false;

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

  function enableSubmitButton() {
    button?.classList.remove("pointer-events-none", "opacity-50");
  }

  function init() {
    const url = `${endpoint}?domain=${encodeURIComponent(domain.value)}&search=${encodeURIComponent(query.value)}`;

    validateInput(domain);
    validateInput(query);

    if (inputValidationErrorFound) return;

    if (resultsCount) {
      button?.classList.add("pointer-events-none", "opacity-50");

      updateResultsCount(-1);

      if (resultsTable) resultsTable.textContent = "";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        import("./showResults").then(module => module.default(data).init());
        enableSubmitButton();
      })
      .catch((error) => {
        updateResultsCount(-2);
        enableSubmitButton();

        console.error(error);
      });
  }

  return {
    init,
  };
}

export default ValidateInput;
